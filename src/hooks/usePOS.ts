
import { useCart } from "./pos/useCart";
import { usePOSProducts } from "./pos/usePOSProducts";
import { usePayment } from "./pos/usePayment";

export function usePOS() {
  const {
    cart,
    subtotal,
    tax,
    total,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart
  } = useCart();

  const {
    products,
    isLoading,
    error,
    searchTerm,
    setSearchTerm
  } = usePOSProducts();

  const { isProcessing, processPayment } = usePayment();

  const handlePayment = async (paymentMethod: string) => {
    const order = await processPayment(cart, total, paymentMethod, clearCart);
    return order;
  };

  return {
    // Cart state and operations
    cart,
    subtotal,
    tax,
    total,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,

    // Products state and operations
    products,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,

    // Payment processing
    isProcessing,
    processPayment: handlePayment
  };
}

export type { CartItem } from "./pos/useCart";
