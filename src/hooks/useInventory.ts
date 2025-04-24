
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Product } from "@/types/product";

export type InventoryAction = "restock" | "remove" | "correction";

export interface InventoryHistoryEntry {
  id?: string;
  product_id: string;
  action: InventoryAction;
  quantity: number;
  previous_stock: number;
  new_stock: number;
  reason?: string;
}

export const useInventory = () => {
  const queryClient = useQueryClient();

  const updateInventory = useMutation({
    mutationFn: async (entry: InventoryHistoryEntry) => {
      // First, fetch the current product stock
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("stock")
        .eq("id", entry.product_id)
        .single();

      if (productError) {
        throw new Error("Failed to fetch product stock");
      }

      // Validate stock change
      let newStock: number;
      switch (entry.action) {
        case "restock":
          newStock = product.stock + entry.quantity;
          break;
        case "remove":
          newStock = product.stock - entry.quantity;
          break;
        case "correction":
          newStock = entry.quantity;
          break;
        default:
          throw new Error("Invalid inventory action");
      }

      // Prevent negative stock
      if (newStock < 0) {
        throw new Error("Stock cannot be negative");
      }

      // Update product stock
      const { error: updateError } = await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", entry.product_id);

      if (updateError) {
        throw new Error("Failed to update product stock");
      }

      // Log inventory history
      const { error: historyError } = await supabase
        .from("inventory_history")
        .insert({
          product_id: entry.product_id,
          action: entry.action,
          quantity: entry.quantity,
          previous_stock: product.stock,
          new_stock: newStock,
          reason: entry.reason
        });

      if (historyError) {
        throw new Error("Failed to log inventory history");
      }

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["products"] });
      
      return { product_id: entry.product_id, newStock };
    },
    onSuccess: (result) => {
      toast.success(`تم تحديث مخزون المنتج بنجاح إلى ${result.newStock} وحدة`);
    },
    onError: (error) => {
      toast.error(`فشل تحديث المخزون: ${error.message}`);
    }
  });

  return {
    updateInventory
  };
};
