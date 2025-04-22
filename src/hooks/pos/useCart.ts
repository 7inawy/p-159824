
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  stock: number;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.15; // 15% VAT
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const addToCart = (product: { id: string; name: string; price: number; stock: number; image_url: string | null }) => {
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

  return {
    cart,
    subtotal,
    tax,
    total,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart
  };
}
