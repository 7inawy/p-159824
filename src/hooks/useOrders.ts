
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type Order = {
  id: string;
  customer_id: string;
  retailer_id: string;
  status: string;
  total: number;
  created_at: string;
  updated_at: string;
  customer_name?: string;
  customer_email?: string;
  items_count?: number;
};

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("يجب تسجيل الدخول لعرض الطلبات");
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
      
      // Fetch orders for this retailer
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("retailer_id", retailerData.id)
        .order("created_at", { ascending: false });
      
      if (ordersError) {
        throw ordersError;
      }
      
      // For each order, get customer details and order items count
      const ordersWithDetails = await Promise.all(
        (ordersData || []).map(async (order) => {
          // Get customer details
          let customerName = "";
          let customerEmail = "";
          
          if (order.customer_id) {
            const { data: userData } = await supabase.auth.admin.getUserById(
              order.customer_id
            );
            
            if (userData?.user) {
              customerName = userData.user.user_metadata?.full_name || "";
              customerEmail = userData.user.email || "";
            }
          }
          
          // Get order items count
          const { count, error: countError } = await supabase
            .from("order_items")
            .select("*", { count: "exact" })
            .eq("order_id", order.id);
          
          if (countError) {
            console.error("Error getting items count:", countError);
          }
          
          return {
            ...order,
            customer_name: customerName,
            customer_email: customerEmail,
            items_count: count || 0
          };
        })
      );
      
      setOrders(ordersWithDetails);
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      setError(err.message);
      toast({ 
        title: "خطأ في تحميل الطلبات", 
        description: err.message, 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
      
      if (error) throw error;
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      );
      
      toast({ 
        title: "تم بنجاح", 
        description: "تم تحديث حالة الطلب بنجاح" 
      });
      
      return true;
    } catch (err: any) {
      console.error("Error updating order status:", err);
      toast({ 
        title: "خطأ في تحديث الطلب", 
        description: err.message, 
        variant: "destructive" 
      });
      return false;
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      // First, update product stock by adding back the quantities from order items
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('product_id, quantity')
        .eq('order_id', orderId);
      
      if (itemsError) throw itemsError;
      
      // Update product stock for each order item
      for (const item of orderItems || []) {
        // Get current product stock
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.product_id)
          .single();
        
        if (productError) continue; // Skip if error
        
        // Update stock
        const newStock = (productData?.stock || 0) + item.quantity;
        await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', item.product_id);
      }
      
      // Now delete the order (cascade will delete order items)
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);
      
      if (error) throw error;
      
      setOrders(prevOrders => 
        prevOrders.filter(order => order.id !== orderId)
      );
      
      toast({ 
        title: "تم بنجاح", 
        description: "تم حذف الطلب بنجاح" 
      });
      
      return true;
    } catch (err: any) {
      console.error("Error deleting order:", err);
      toast({ 
        title: "خطأ في حذف الطلب", 
        description: err.message, 
        variant: "destructive" 
      });
      return false;
    }
  };

  return {
    orders,
    isLoading,
    error,
    fetchOrders,
    updateOrderStatus,
    deleteOrder
  };
}
