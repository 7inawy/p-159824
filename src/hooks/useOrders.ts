
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type OrderStatus = "pending" | "processing" | "shipped" | "completed" | "cancelled";

export type Order = {
  id: string;
  customer_id: string | null;
  customer_name?: string;
  status: OrderStatus;
  created_at: string;
  total: number;
  items_count: number;
};

export type OrderWithItems = Omit<Order, 'items_count'> & {
  items: {
    id: string;
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }[];
};

export const useOrders = () => {
  const queryClient = useQueryClient();

  // Fetch all orders
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      // Fetch orders with customer information
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(`
          *,
          order_items(count)
        `)
        .order("created_at", { ascending: false });

      if (ordersError) {
        throw new Error(ordersError.message);
      }

      // Format the data to match the expected Order type
      const formattedOrders: Order[] = ordersData.map(order => ({
        id: order.id,
        customer_id: order.customer_id,
        status: order.status as OrderStatus,
        created_at: order.created_at,
        total: order.total,
        items_count: order.order_items?.[0]?.count || 0,
      }));

      return formattedOrders;
    },
  });

  // Fetch a single order with items
  const useOrderDetails = (orderId: string | null) => {
    return useQuery({
      queryKey: ["order", orderId],
      queryFn: async () => {
        if (!orderId) return null;

        // Fetch order details
        const { data: order, error: orderError } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

        if (orderError) {
          throw new Error(orderError.message);
        }

        // Fetch order items with product details
        const { data: items, error: itemsError } = await supabase
          .from("order_items")
          .select(`
            *,
            products:product_id (name)
          `)
          .eq("order_id", orderId);

        if (itemsError) {
          throw new Error(itemsError.message);
        }

        // Format the order with items
        const orderWithItems: OrderWithItems = {
          id: order.id,
          customer_id: order.customer_id,
          status: order.status as OrderStatus,
          created_at: order.created_at,
          total: order.total,
          items: items.map(item => ({
            id: item.id,
            product_id: item.product_id || "",
            product_name: item.products?.name || "Unknown Product",
            quantity: item.quantity,
            price: item.price,
          })),
        };

        return orderWithItems;
      },
      enabled: !!orderId,
    });
  };

  // Create a new order
  const createOrder = useMutation({
    mutationFn: async (data: { 
      customer_id: string; 
      items: { product_id: string; quantity: number; price: number }[]; 
      status?: OrderStatus;
      total?: number;
    }) => {
      // Calculate total if not provided
      const total = data.total || data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // Insert the order first
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([{
          customer_id: data.customer_id,
          status: data.status || "pending",
          total
        }])
        .select()
        .single();

      if (orderError) {
        throw new Error(orderError.message);
      }

      // Then insert all order items
      const orderItems = data.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        throw new Error(itemsError.message);
      }

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("تم إنشاء الطلب بنجاح");
    },
    onError: (error) => {
      toast.error(`فشل في إنشاء الطلب: ${error.message}`);
    },
  });

  // Update order status
  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const { data, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      toast.success("تم تحديث حالة الطلب بنجاح");
    },
    onError: (error) => {
      toast.error(`فشل في تحديث حالة الطلب: ${error.message}`);
    },
  });

  return {
    orders,
    isLoading,
    error,
    useOrderDetails,
    createOrder,
    updateOrderStatus,
  };
};
