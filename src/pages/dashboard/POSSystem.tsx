
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
  Smartphone
} from "lucide-react";

const POSSystem: React.FC = () => {
  // Sample product catalog
  const productCatalog = [
    { id: "1", name: "قميص قطني", price: 120, image: "https://placehold.co/60?text=👕" },
    { id: "2", name: "بنطلون جينز", price: 150, image: "https://placehold.co/60?text=👖" },
    { id: "3", name: "حذاء رياضي", price: 250, image: "https://placehold.co/60?text=👟" },
    { id: "4", name: "ساعة يد", price: 350, image: "https://placehold.co/60?text=⌚" },
    { id: "5", name: "حقيبة جلدية", price: 200, image: "https://placehold.co/60?text=👜" },
    { id: "6", name: "نظارة شمسية", price: 180, image: "https://placehold.co/60?text=🕶️" },
    { id: "7", name: "قبعة", price: 80, image: "https://placehold.co/60?text=🧢" },
    { id: "8", name: "وشاح", price: 120, image: "https://placehold.co/60?text=🧣" }
  ];
  
  // Current cart items
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number; image: string }[]>([]);
  
  // Add item to cart
  const addToCart = (product: typeof productCatalog[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  // Increase quantity
  const increaseQuantity = (id: string) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };
  
  // Decrease quantity
  const decreaseQuantity = (id: string) => {
    setCart(cart.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0));
  };
  
  // Remove item
  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {productCatalog.map(product => (
              <Card key={product.id} className="border cursor-pointer hover:shadow-md transition-shadow" onClick={() => addToCart(product)}>
                <CardContent className="p-4 flex flex-col items-center">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mb-2" />
                  <p className="text-sm font-medium text-center">{product.name}</p>
                  <p className="text-[#F97415] font-bold mt-1">{product.price} ريال</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover mr-3" />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.price} ريال × {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 rounded-full"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 rounded-full"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item.id)}
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
                <span className="font-bold">{cartTotal} ريال</span>
              </div>
              <div className="flex justify-between py-2">
                <span>الضريبة (15%):</span>
                <span>{(cartTotal * 0.15).toFixed(2)} ريال</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold">
                <span>الإجمالي:</span>
                <span>{(cartTotal * 1.15).toFixed(2)} ريال</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <CreditCard className="h-4 w-4 mr-1" /> بطاقة
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <DollarSign className="h-4 w-4 mr-1" /> نقداً
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Smartphone className="h-4 w-4 mr-1" /> محفظة
                </Button>
              </div>
              
              <Button className="w-full mt-2" variant="outline">
                <Printer className="h-4 w-4 mr-2" /> طباعة إيصال
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default POSSystem;
