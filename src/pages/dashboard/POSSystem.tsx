
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  Minus, 
  Trash, 
  CreditCard, 
  DollarSign,
  Printer,
  Smartphone,
  Loader2
} from "lucide-react";
import { usePOS } from "@/hooks/usePOS";
import ReceiptModal from "@/components/dashboard/pos/ReceiptModal";

const POSSystem: React.FC = () => {
  const {
    products,
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
  } = usePOS();
  
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<{
    id: string;
    date: string;
    method: string;
  } | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePayment = async (method: 'cash' | 'card' | 'wallet') => {
    if (cart.length === 0) return;
    
    const order = await processPayment(method);
    
    if (order) {
      setLastOrder({
        id: order.id,
        date: order.created_at,
        method: method
      });
      setIsReceiptOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <ShoppingBag className="w-6 h-6 text-[#F97415] mr-2" />
        <h1 className="text-2xl font-bold">نقطة البيع</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Catalog */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border shadow-sm">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="بحث عن منتج..." 
                  className="pl-3 pr-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#F97415]" />
              <span className="mr-2 text-lg">جاري تحميل المنتجات...</span>
            </div>
          )}

          {/* Error state */}
          {error && !isLoading && (
            <div className="bg-red-50 p-4 rounded-md text-red-800 text-center">
              <p>{error}</p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium">لا يوجد منتجات</h3>
              <p className="text-gray-500">أضف منتجات من صفحة المنتجات</p>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && !error && products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map(product => (
                <Card 
                  key={product.id} 
                  className="border cursor-pointer hover:shadow-md transition-shadow" 
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="w-16 h-16 overflow-hidden mb-2 bg-gray-100 rounded flex items-center justify-center">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <ShoppingBag className="w-8 h-8 text-gray-300" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-center">{product.name}</p>
                    <p className="text-[#F97415] font-bold mt-1">{product.price} ريال</p>
                    <p className="text-xs text-gray-500">المخزون: {product.stock}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Shopping Cart */}
        <div className="lg:col-span-1">
          <Card className="border shadow-sm h-full flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle>سلة المشتريات</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto">
              {cart.length > 0 ? (
                <ul className="space-y-3">
                  {cart.map(item => (
                    <li key={item.id} className="flex items-center p-2 border rounded-lg">
                      <div className="w-10 h-10 overflow-hidden rounded bg-gray-100 flex items-center justify-center mr-3">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <ShoppingBag className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.price} ريال × {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            decreaseQuantity(item.id);
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            increaseQuantity(item.id);
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-red-500 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item.id);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p>السلة فارغة</p>
                  <p className="text-sm mt-1">اضغط على منتج لإضافته إلى السلة</p>
                </div>
              )}
            </CardContent>
            
            <div className="border-t p-4">
              <div className="flex justify-between py-2">
                <span>المجموع:</span>
                <span className="font-bold">{subtotal.toFixed(2)} ريال</span>
              </div>
              <div className="flex justify-between py-2">
                <span>الضريبة (15%):</span>
                <span>{tax.toFixed(2)} ريال</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold">
                <span>الإجمالي:</span>
                <span>{total.toFixed(2)} ريال</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isProcessing || cart.length === 0}
                  onClick={() => handlePayment('card')}
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <CreditCard className="h-4 w-4 mr-1" />
                  )}
                  بطاقة
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isProcessing || cart.length === 0}
                  onClick={() => handlePayment('cash')}
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <DollarSign className="h-4 w-4 mr-1" />
                  )}
                  نقداً
                </Button>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={isProcessing || cart.length === 0}
                  onClick={() => handlePayment('wallet')}
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <Smartphone className="h-4 w-4 mr-1" />
                  )}
                  محفظة
                </Button>
              </div>
              
              <Button 
                className="w-full mt-2" 
                variant="outline"
                onClick={() => clearCart()}
                disabled={cart.length === 0}
              >
                إفراغ السلة
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Receipt Modal */}
      {lastOrder && (
        <ReceiptModal
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          cart={cart}
          subtotal={subtotal}
          tax={tax}
          total={total}
          orderId={lastOrder.id}
          orderDate={lastOrder.date}
          paymentMethod={lastOrder.method}
        />
      )}
    </div>
  );
};

export default POSSystem;
