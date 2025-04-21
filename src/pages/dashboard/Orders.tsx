
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Orders: React.FC = () => {
  // Sample orders data
  const orders = [
    { id: "ORD10021", customer: "أحمد علي", date: "٢٠٢٥/٠٤/٢١", status: "completed", amount: "٣٥٠ ريال", items: 3 },
    { id: "ORD10020", customer: "محمد خالد", date: "٢٠٢٥/٠٤/٢١", status: "processing", amount: "٤٨٠ ريال", items: 2 },
    { id: "ORD10019", customer: "سارة محمد", date: "٢٠٢٥/٠٤/٢٠", status: "completed", amount: "٥٩٠ ريال", items: 4 },
    { id: "ORD10018", customer: "فاطمة أحمد", date: "٢٠٢٥/٠٤/٢٠", status: "shipped", amount: "٧٧٠ ريال", items: 5 },
    { id: "ORD10017", customer: "خالد عمر", date: "٢٠٢٥/٠٤/١٩", status: "completed", amount: "٢٢٠ ريال", items: 1 },
    { id: "ORD10016", customer: "نورا سعيد", date: "٢٠٢٥/٠٤/١٩", status: "cancelled", amount: "٤٣٠ ريال", items: 2 },
    { id: "ORD10015", customer: "علي محمود", date: "٢٠٢٥/٠٤/١٨", status: "completed", amount: "٥٥٠ ريال", items: 3 },
    { id: "ORD10014", customer: "مريم أحمد", date: "٢٠٢٥/٠٤/١٨", status: "shipped", amount: "٣٢٠ ريال", items: 2 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <ShoppingCart className="w-6 h-6 text-[#F97415] mr-2" />
        <h1 className="text-2xl font-bold">الطلبات</h1>
      </div>

      {/* Search and Filter Bar */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="بحث عن طلب..." 
                className="pl-3 pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                <span>تصفية</span>
              </Button>
              <Button className="bg-[#F97415] hover:bg-[#F97415]/90">
                إنشاء طلب
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-right text-sm font-semibold">رقم الطلب</th>
              <th className="py-2 text-right text-sm font-semibold">العميل</th>
              <th className="py-2 text-right text-sm font-semibold">التاريخ</th>
              <th className="py-2 text-right text-sm font-semibold">المنتجات</th>
              <th className="py-2 text-right text-sm font-semibold">المبلغ</th>
              <th className="py-2 text-right text-sm font-semibold">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors cursor-pointer border-b">
                <td className="py-3 text-sm">{order.id}</td>
                <td className="py-3 text-sm">{order.customer}</td>
                <td className="py-3 text-sm">{order.date}</td>
                <td className="py-3 text-sm">{order.items} منتجات</td>
                <td className="py-3 text-sm font-semibold">{order.amount}</td>
                <td className="py-3 text-sm">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'shipped' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status === 'completed' ? 'مكتمل' :
                     order.status === 'processing' ? 'قيد المعالجة' : 
                     order.status === 'shipped' ? 'تم الشحن' : 'ملغي'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
