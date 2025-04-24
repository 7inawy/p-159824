
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Product } from "@/types/product";

export const useProducts = () => {
  const queryClient = useQueryClient();

  // Fetch all products
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      // Add status field and a default SKU if not present
      return data.map(product => {
        // Cast the product to include the sku field even though it may not exist in DB
        const typedProduct = product as any;
        return { 
          ...typedProduct, 
          status: "published" as "published" | "draft",
          sku: typedProduct.sku || `PRD-${typedProduct.id.substring(0, 8).toUpperCase()}`
        };
      });
    },
  });

  // Create a new product
  const createProduct = useMutation({
    mutationFn: async (newProduct: Omit<Product, "id" | "created_at" | "updated_at">) => {
      // Remove sku from the payload since it doesn't exist in the database yet
      const { sku, ...productToInsert } = newProduct;
      
      const { data, error } = await supabase
        .from("products")
        .insert([productToInsert])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Add status and SKU to the returned product
      const typedData = data as any;
      return { 
        ...typedData, 
        status: "published" as "published" | "draft",
        sku: sku || `PRD-${typedData.id.substring(0, 8).toUpperCase()}`
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("تم إضافة المنتج بنجاح");
    },
    onError: (error) => {
      toast.error(`فشل في إضافة المنتج: ${error.message}`);
    },
  });

  // Update an existing product
  const updateProduct = useMutation({
    mutationFn: async (updatedProduct: Partial<Product> & { id: string }) => {
      const { id, ...rest } = updatedProduct;
      
      // Remove status and sku fields before sending to Supabase since they don't exist in the DB
      const { status, sku, ...dataToUpdate } = rest;

      const { data, error } = await supabase
        .from("products")
        .update(dataToUpdate)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Add status and SKU to the returned product
      const typedData = data as any;
      return { 
        ...typedData, 
        status: status || "published" as "published" | "draft",
        sku: sku || `PRD-${typedData.id.substring(0, 8).toUpperCase()}`
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("تم تحديث المنتج بنجاح");
    },
    onError: (error) => {
      toast.error(`فشل في تحديث المنتج: ${error.message}`);
    },
  });

  // Delete a product
  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      
      // Add status to the returned product
      const typedData = data as any;
      return { 
        ...typedData, 
        status: "published" as "published" | "draft",
        sku: typedData.sku || `PRD-${id.substring(0, 8).toUpperCase()}`
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("تم حذف المنتج بنجاح");
    },
    onError: (error) => {
      toast.error(`فشل في حذف المنتج: ${error.message}`);
    },
  });

  return {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
