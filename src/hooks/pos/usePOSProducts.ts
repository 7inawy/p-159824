
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

export interface POSProduct extends Product {
  quantity?: number;
}

export const usePOSProducts = () => {
  // Fetch all products
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["pos-products"],
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

  return {
    products,
    isLoading,
    error,
  };
};
