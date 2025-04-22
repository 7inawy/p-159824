
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Product } from "../useProducts";

export function usePOSProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("يجب تسجيل الدخول لعرض المنتجات");
      }
      
      const { data: retailerData, error: retailerError } = await supabase
        .from("retailers")
        .select("id")
        .eq("user_id", user.id)
        .single();
      
      if (retailerError) {
        throw new Error("لم يتم العثور على معلومات المتجر");
      }
      
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("retailer_id", retailerData.id)
        .gt("stock", 0)
        .order("name");
      
      if (error) {
        throw error;
      }
      
      const productsWithStatus = data?.map(product => ({
        ...product,
        status: product.status || 'published'
      })) || [];
      
      setProducts(productsWithStatus);
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

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return {
    products: filteredProducts,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    fetchProducts
  };
}
