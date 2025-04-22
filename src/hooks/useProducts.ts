
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  image_url: string | null;
  status: string;
  created_at: string;
  retailer_id: string;
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("يجب تسجيل الدخول لعرض المنتجات");
      }
      
      // Get the retailer ID for the current user
      const { data: retailerData, error: retailerError } = await supabase
        .from("retailers")
        .select("id")
        .eq("user_id", user.id)
        .single();
      
      if (retailerError) {
        throw new Error("لم يتم العثور على معلومات المتجر");
      }
      
      // Fetch products for this retailer
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("retailer_id", retailerData.id)
        .order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setProducts(data || []);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(err.message);
      toast({ 
        title: "خطأ في تحميل المنتجات", 
        description: err.message, 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setProducts(prevProducts => [data[0], ...prevProducts]);
        return data[0];
      }
    } catch (err: any) {
      console.error("Error adding product:", err);
      toast({ 
        title: "خطأ في إضافة المنتج", 
        description: err.message, 
        variant: "destructive" 
      });
      throw err;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product.id === id ? { ...product, ...data[0] } : product
          )
        );
        return data[0];
      }
    } catch (err: any) {
      console.error("Error updating product:", err);
      toast({ 
        title: "خطأ في تحديث المنتج", 
        description: err.message, 
        variant: "destructive" 
      });
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setProducts(prevProducts => 
        prevProducts.filter(product => product.id !== id)
      );
    } catch (err: any) {
      console.error("Error deleting product:", err);
      toast({ 
        title: "خطأ في حذف المنتج", 
        description: err.message, 
        variant: "destructive" 
      });
      throw err;
    }
  };

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  };
}
