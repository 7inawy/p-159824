
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Minus, X } from "lucide-react";

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderAdded: () => void;
}

interface Customer {
  id: string;
  email: string;
  display_name?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url?: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ 
  isOpen, 
  onClose,
  onOrderAdded
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCustomers();
      fetchProducts();
    }
  }, [isOpen]);

  const fetchCustomers = async () => {
    setIsLoadingCustomers(true);
    try {
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('role', 'customer');
      
      if (userError) throw userError;
      
      if (userData && userData.length > 0) {
        // For each profile, get the corresponding auth user
        const customers = await Promise.all(
          userData.map(async (profile) => {
            const { data: authUser } = await supabase.auth.admin.getUserById(profile.id);
            return {
              id: profile.id,
              email: authUser?.user?.email || 'Unknown email',
              display_name: authUser?.user?.user_metadata?.full_name
            };
          })
        );
        
        setCustomers(customers.filter(c => c.email !== 'Unknown email'));
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast({ title: "خطأ", description: "فشل في تحميل العملاء", variant: "destructive" });
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
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
      
      // Fetch products for this retailer
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, stock, image_url")
        .eq("retailer_id", retailerData.id)
        .gt("stock", 0);
      
      if (error) throw error;
      
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({ title: "خطأ", description: "فشل في تحميل المنتجات", variant: "destructive" });
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const addProductToOrder = () => {
    if (!selectedProduct) return;
    
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;
    
    // Check if product is already in order
    const existingItem = orderItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setOrderItems(orderItems.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setOrderItems([...orderItems, { product, quantity: 1 }]);
    }
    
    setSelectedProduct("");
  };

  const increaseQuantity = (productId: string) => {
    setOrderItems(orderItems.map(item => {
      if (item.product.id === productId) {
        // Check if we have enough stock
        if (item.quantity < item.product.stock) {
          return { ...item, quantity: item.quantity + 1 };
        }
        toast({ 
          title: "تحذير", 
          description: `لا يمكن زيادة الكمية. المخزون المتاح: ${item.product.stock}`,
          variant: "destructive" 
        });
      }
      return item;
    }));
  };

  const decreaseQuantity = (productId: string) => {
    setOrderItems(orderItems.map(item => {
      if (item.product.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  };

  const removeProduct = (productId: string) => {
    setOrderItems(orderItems.filter(item => item.product.id !== productId));
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
  };

  const validateForm = () => {
    if (!selectedCustomerId) {
      toast({ title: "خطأ", description: "يرجى اختيار عميل", variant: "destructive" });
      return false;
    }
    
    if (orderItems.length === 0) {
      toast({ title: "خطأ", description: "يرجى إضافة منتج واحد على الأقل", variant: "destructive" });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Get the retailer_id for the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({ title: "خطأ", description: "يجب تسجيل الدخول لإضافة طلب", variant: "destructive" });
        return;
      }
      
      const { data: retailerData, error: retailerError } = await supabase
        .from("retailers")
        .select("id")
        .eq("user_id", user.id)
        .single();
      
      if (retailerError || !retailerData) {
        toast({ title: "خطأ", description: "لم يتم العثور على معلومات المتجر", variant: "destructive" });
        return;
      }
      
      // Calculate total
      const total = calculateTotal();
      
      // Create the order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_id: selectedCustomerId,
          retailer_id: retailerData.id,
          status: status,
          total: total
        })
        .select();
      
      if (orderError || !orderData) {
        throw new Error("فشل في إنشاء الطلب");
      }
      
      const orderId = orderData[0].id;
      
      // Create order items and update product stock
      for (const item of orderItems) {
        // Add order item
        const { error: itemError } = await supabase
          .from("order_items")
          .insert({
            order_id: orderId,
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          });
        
        if (itemError) {
          throw new Error("فشل في إضافة منتجات الطلب");
        }
        
        // Update product stock
        const newStock = item.product.stock - item.quantity;
        const { error: stockError } = await supabase
          .from("products")
          .update({ stock: newStock })
          .eq("id", item.product.id);
        
        if (stockError) {
          throw new Error("فشل في تحديث المخزون");
        }
      }
      
      toast({ title: "تم بنجاح", description: "تم إنشاء الطلب بنجاح" });
      
      // Reset form
      setSelectedCustomerId("");
      setStatus("pending");
      setOrderItems([]);
      
      onOrderAdded();
      onClose();
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast({ title: "خطأ", description: error.message || "حدث خطأ غير متوقع", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">إضافة طلب جديد</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="customer">العميل*</Label>
            <Select 
              value={selectedCustomerId} 
              onValueChange={setSelectedCustomerId}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر العميل" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingCustomers ? (
                  <div className="flex items-center justify-center p-2">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    جاري التحميل...
                  </div>
                ) : customers.length > 0 ? (
                  customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.display_name || customer.email}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-sm text-gray-500">لا يوجد عملاء</div>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">حالة الطلب</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="اختر حالة الطلب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="processing">قيد المعالجة</SelectItem>
                <SelectItem value="shipped">تم الشحن</SelectItem>
                <SelectItem value="delivered">تم التسليم</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>إضافة منتجات</Label>
            <div className="flex gap-2">
              <Select 
                value={selectedProduct} 
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="اختر منتج" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingProducts ? (
                    <div className="flex items-center justify-center p-2">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      جاري التحميل...
                    </div>
                  ) : products.length > 0 ? (
                    products.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - {product.price} ريال (المخزون: {product.stock})
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">لا يوجد منتجات</div>
                  )}
                </SelectContent>
              </Select>
              <Button 
                type="button" 
                onClick={addProductToOrder}
                disabled={!selectedProduct}
              >
                <Plus className="h-4 w-4 mr-2" />
                إضافة
              </Button>
            </div>
          </div>
          
          {orderItems.length > 0 && (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">المنتج</TableHead>
                    <TableHead className="text-right">السعر</TableHead>
                    <TableHead className="text-right">الكمية</TableHead>
                    <TableHead className="text-right">المجموع</TableHead>
                    <TableHead className="text-right w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.product.id}>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>{item.product.price} ريال</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7 rounded-full"
                            onClick={() => decreaseQuantity(item.product.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7 rounded-full"
                            onClick={() => increaseQuantity(item.product.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{item.product.price * item.quantity} ريال</TableCell>
                      <TableCell>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-red-500 hover:text-red-700"
                          onClick={() => removeProduct(item.product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="p-4 border-t">
                <div className="flex justify-between font-bold">
                  <span>الإجمالي:</span>
                  <span>{calculateTotal()} ريال</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الإنشاء...
                </>
              ) : (
                'إنشاء الطلب'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderModal;
