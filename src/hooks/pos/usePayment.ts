
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { CartItem } from "./useCart";

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = async (
    cart: CartItem[], 
    total: number, 
    paymentMethod: string,
    onSuccess: () => void
  ) => {
    if (cart.length === 0) {
      toast({ 
        title: "خطأ", 
        description: "السلة فارغة", 
        variant: "destructive" 
      });
      return null;
    }

    setIsProcessing(true);
    
    try {
      // Get current user's retailer ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("لم يتم العثور على معلومات المستخدم");

      const { data: retailerData, error: retailerError } = await supabase
        .from("retailers")
        .select("id")
        .eq("user_id", user.id)
        .single();
      
      if (retailerError || !retailerData) {
        throw new Error("لم يتم العثور على معلومات المتجر");
      }

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          retailer_id: retailerData.id,
          status: "completed",
          total: total
        })
        .select();
      
      if (orderError || !orderData) {
        throw new Error("فشل في إنشاء الطلب");
      }
      
      const orderId = orderData[0].id;
      
      // Add order items and update stock
      for (const item of cart) {
        // Add order item
        const { error: itemError } = await supabase
          .from("order_items")
          .insert({
            order_id: orderId,
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
          });
        
        if (itemError) {
          throw new Error("فشل في إضافة منتجات الطلب");
        }
        
        // Update product stock
        const { error: stockError } = await supabase
          .from("products")
          .update({ 
            stock: item.stock - item.quantity 
          })
          .eq("id", item.id);
        
        if (stockError) {
          throw new Error("فشل في تحديث المخزون");
        }
      }
      
      // Create payment record
      const { error: paymentError } = await supabase
        .from("payments")
        .insert({
          order_id: orderId,
          method: paymentMethod,
          status: "completed",
          amount: total
        });
      
      if (paymentError) {
        throw new Error("فشل في تسجيل معلومات الدفع");
      }
      
      // Success
      toast({ 
        title: "تم بنجاح", 
        description: "تمت عملية الدفع بنجاح" 
      });
      
      onSuccess();
      return orderData[0];
    } catch (err: any) {
      console.error("Error processing payment:", err);
      toast({ 
        title: "خطأ في عملية الدفع", 
        description: err.message, 
        variant: "destructive" 
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    processPayment
  };
}
