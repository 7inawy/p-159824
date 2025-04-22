
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Customers: React.FC = () => {
  // Sample customers data
  const customers = [
    { id: "CUST1001", name: "أحمد علي", email: "ahmed@example.com", phone: "+966 50 123 4567", orders: 8, totalSpent: "٣,٢٠٠ ريال", lastOrder: "٢٠٢٥/٠٤/١٨" },
    { id: "CUST1002", name: "محمد خالد", email: "mohamed@example.com", phone: "+966 55 234 5678", orders: 5, totalSpent: "١,٨٥٠ ريال", lastOrder: "٢٠٢٥/٠٤/١٥" },
    { id: "CUST1003", name: "سارة محمد", email: "sara@example.com", phone: "+966 54 345 6789", orders: 12, totalSpent: "٥,٤٠٠ ريال", lastOrder: "٢٠٢٥/٠٤/٢٠" },
    { id: "CUST1004", name: "فاطمة أحمد", email: "fatima@example.com", phone: "+966 56 456 7890", orders: 3, totalSpent: "١,١٠٠ ريال", lastOrder: "٢٠٢٥/٠٤/١٢" },
    { id: "CUST1005", name: "خالد عمر", email: "khaled@example.com", phone: "+966 59 567 8901", orders: 7, totalSpent: "٢,٨٥٠ ريال", lastOrder: "٢٠٢٥/٠٤/١٩" },
    { id: "CUST1006", name: "نورا سعيد", email: "noura@example.com", phone: "+966 58 678 9012", orders: 2, totalSpent: "٨٨٠ ريال", lastOrder: "٢٠٢٥/٠٤/٠٨" },
    { id: "CUST1007", name: "علي محمود", email: "ali@example.com", phone: "+966 53 789 0123", orders: 4, totalSpent: "١,٦٥٠ ريال", lastOrder: "٢٠٢٥/٠٤/١٤" },
    { id: "CUST1008", name: "مريم أحمد", email: "mariam@example.com", phone: "+966 51 890 1234", orders: 6, totalSpent: "٢,٣٠٠ ريال", lastOrder: "٢٠٢٥/٠٤/١٧" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Users className="w-6 h-6 text-[#F97415] mr-2" />
          <h1 className="text-2xl font-bold">العملاء</h1>
        </div>
        <Button className="bg-[#F97415] hover:bg-[#F97415]/90">
          <Plus className="w-4 h-4 mr-2" />
          إضافة عميل
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="بحث عن عميل..." 
                className="pl-3 pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                <span>تصفية</span>
              </Button>
              <Button variant="outline">
                تصدير العملاء
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-right text-sm font-semibold">العميل</th>
              <th className="py-2 text-right text-sm font-semibold">البريد الإلكتروني</th>
              <th className="py-2 text-right text-sm font-semibold">رقم الهاتف</th>
              <th className="py-2 text-right text-sm font-semibold">عدد الطلبات</th>
              <th className="py-2 text-right text-sm font-semibold">إجمالي المشتريات</th>
              <th className="py-2 text-right text-sm font-semibold">آخر طلب</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors cursor-pointer border-b">
                <td className="py-3 text-sm font-medium">{customer.name}</td>
                <td className="py-3 text-sm">{customer.email}</td>
                <td className="py-3 text-sm">{customer.phone}</td>
                <td className="py-3 text-sm">{customer.orders}</td>
                <td className="py-3 text-sm font-semibold">{customer.totalSpent}</td>
                <td className="py-3 text-sm">{customer.lastOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
