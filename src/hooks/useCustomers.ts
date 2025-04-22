
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type Customer = {
  id: string;
  email: string;
  name: string;
  phone: string;
  order_count: number;
  total_spent: number;
  last_order: string | null;
};

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("يجب تسجيل الدخول لعرض العملاء");
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
      
      // Get all profiles with role 'customer'
      const { data: customerProfiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('role', 'customer');
      
      if (profilesError) {
        throw profilesError;
      }
      
      if (!customerProfiles || customerProfiles.length === 0) {
        setCustomers([]);
        setIsLoading(false);
        return;
      }
      
      // For each customer, get their orders from this retailer
      const customersWithDetails = await Promise.all(
        customerProfiles.map(async (profile) => {
          // Get auth user details
          const { data: authUser } = await supabase.auth.admin.getUserById(profile.id);
          
          if (!authUser?.user) {
            return null;
          }
          
          // Get customer orders for this retailer
          const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select('id, total, created_at')
            .eq('customer_id', profile.id)
            .eq('retailer_id', retailerData.id)
            .order('created_at', { ascending: false });
          
          if (ordersError) {
            console.error("Error fetching orders for customer:", ordersError);
            return null;
          }
          
          // Calculate metrics
          const orderCount = orders ? orders.length : 0;
          const totalSpent = orders ? orders.reduce((sum, order) => sum + (order.total || 0), 0) : 0;
          const lastOrder = orders && orders.length > 0 ? orders[0].created_at : null;
          
          return {
            id: profile.id,
            email: authUser.user.email || "",
            name: authUser.user.user_metadata?.full_name || "",
            phone: authUser.user.phone || "",
            order_count: orderCount,
            total_spent: totalSpent,
            last_order: lastOrder
          };
        })
      );
      
      // Filter out nulls and sort by order count (most orders first)
      const validCustomers = customersWithDetails
        .filter((c): c is Customer => c !== null)
        .sort((a, b) => b.order_count - a.order_count);
      
      setCustomers(validCustomers);
    } catch (err: any) {
      console.error("Error fetching customers:", err);
      setError(err.message);
      toast({ 
        title: "خطأ في تحميل العملاء", 
        description: err.message, 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    isLoading,
    error,
    fetchCustomers
  };
}
