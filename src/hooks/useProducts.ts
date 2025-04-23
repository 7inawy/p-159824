
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

      // Add status field to each product (defaults to "published")
      return data.map(product => ({ 
        ...product, 
        status: "published" as "published" | "draft" 
      }));
    },
  });

  // Create a new product
  const createProduct = useMutation({
    mutationFn: async (newProduct: Omit<Product, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("products")
        .insert([newProduct])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Add status to the returned product
      return { ...data, status: "published" as "published" | "draft" };
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
      
      // Remove status field before sending to Supabase since it doesn't exist in the DB
      const { status, ...dataToUpdate } = rest;

      const { data, error } = await supabase
        .from("products")
        .update(dataToUpdate)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Add status to the returned product
      return { ...data, status: status || "published" as "published" | "draft" };
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
      return { ...data, status: "published" as "published" | "draft" };
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
