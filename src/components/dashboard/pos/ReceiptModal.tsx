
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { CartItem } from "@/hooks/usePOS";
import { formatDate } from "@/lib/utils";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  orderId: string;
  orderDate: string;
  paymentMethod: string;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ 
  isOpen, 
  onClose,
  cart,
  subtotal,
  tax,
  total,
  orderId,
  orderDate,
  paymentMethod
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">إيصال الدفع</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 border rounded-md" id="receipt">
          <div className="text-center mb-4">
            <h3 className="font-bold text-lg">متجر رابح</h3>
            <p className="text-sm text-gray-500">المملكة العربية السعودية</p>
            <p className="text-sm text-gray-500">هاتف: +966 123456789</p>
          </div>
          
          <div className="flex justify-between text-sm mb-2">
            <span>رقم الطلب:</span>
            <span>#{orderId.slice(0, 8)}</span>
          </div>
          
          <div className="flex justify-between text-sm mb-2">
            <span>التاريخ:</span>
            <span>{formatDate(orderDate)}</span>
          </div>
          
          <div className="flex justify-between text-sm mb-4">
            <span>طريقة الدفع:</span>
            <span>{
              paymentMethod === 'cash' ? 'نقداً' : 
              paymentMethod === 'card' ? 'بطاقة' : 
              paymentMethod === 'wallet' ? 'محفظة إلكترونية' : 
              paymentMethod
            }</span>
          </div>
          
          <div className="border-t border-b py-2 mb-4">
            <div className="flex justify-between text-sm font-bold mb-1">
              <span>المنتج</span>
              <span>السعر</span>
            </div>
            
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <div>
                  <span>{item.name}</span>
                  <span className="text-gray-500"> (×{item.quantity})</span>
                </div>
                <span>{item.price * item.quantity} ريال</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-1 mb-4">
            <div className="flex justify-between text-sm">
              <span>المجموع:</span>
              <span>{subtotal.toFixed(2)} ريال</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>الضريبة (15%):</span>
              <span>{tax.toFixed(2)} ريال</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>الإجمالي:</span>
              <span>{total.toFixed(2)} ريال</span>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-6">
            <p>شكراً لتسوقك معنا</p>
            <p>نتمنى لك يوماً سعيداً!</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={handlePrint} className="w-full">
            <Printer className="mr-2 h-4 w-4" />
            طباعة الإيصال
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
