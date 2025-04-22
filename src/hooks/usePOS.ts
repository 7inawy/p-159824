
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Product } from "./useProducts";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  stock: number;
}

export function usePOS() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retailerId, setRetailerId] = useState<string | null>(null);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.15; // 15% VAT
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  useEffect(() => {
    fetchProducts();
  }, []);

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
      
      setRetailerId(retailerData.id);
      
      // Fetch products for this retailer
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("retailer_id", retailerData.id)
        .gt("stock", 0)
        .order("name");
      
      if (error) {
        throw error;
      }
      
      // Add default status if it doesn't exist in the data
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

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(cart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        toast({ 
          title: "تحذير", 
          description: `لا يمكن زيادة الكمية. المخزون المتاح: ${product.stock}`,
          variant: "destructive" 
        });
      }
    } else {
      setCart([...cart, { 
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image_url,
        stock: product.stock
      }]);
    }
  };

  const increaseQuantity = (id: string) => {
    const item = cart.find(item => item.id === id);
    
    if (item && item.quantity < item.stock) {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else if (item) {
      toast({ 
        title: "تحذير", 
        description: `لا يمكن زيادة الكمية. المخزون المتاح: ${item.stock}`,
        variant: "destructive" 
      });
    }
  };

  const decreaseQuantity = (id: string) => {
    setCart(cart.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const processPayment = async (paymentMethod: string) => {
    if (cart.length === 0) {
      toast({ 
        title: "خطأ", 
        description: "السلة فارغة", 
        variant: "destructive" 
      });
      return;
    }
    
    if (!retailerId) {
      toast({ 
        title: "خطأ", 
        description: "لم يتم العثور على معلومات المتجر", 
        variant: "destructive" 
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create order in the database
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          retailer_id: retailerId,
          status: "completed",
          total: total
        })
        .select();
      
      if (orderError || !orderData) {
        throw new Error("فشل في إنشاء الطلب");
      }
      
      const orderId = orderData[0].id;
      
      // Add order items
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
      
      // Clear cart and refresh products
      clearCart();
      fetchProducts();
      
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
    products: filteredProducts,
    cart,
    searchTerm,
    setSearchTerm,
    isLoading,
    isProcessing,
    error,
    subtotal,
    tax,
    total,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    processPayment
  };
}
