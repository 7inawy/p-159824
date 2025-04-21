
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag, Search, Plus, BarChart2, Calendar, RefreshCw, Percent } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Marketing: React.FC = () => {
  // Sample discount codes
  const discountCodes = [
    { id: "DC001", code: "SUMMER25", discount: "25%", type: "percentage", usage: "32/100", status: "active", expires: "٢٠٢٥/٠٨/٣١" },
    { id: "DC002", code: "WELCOME10", discount: "10%", type: "percentage", usage: "85/100", status: "active", expires: "٢٠٢٥/١٢/٣١" },
    { id: "DC003", code: "FREESHIP", discount: "شحن مجاني", type: "shipping", usage: "28/50", status: "active", expires: "٢٠٢٥/٠٧/١٥" },
    { id: "DC004", code: "SALE50", discount: "50 ريال", type: "fixed", usage: "12/30", status: "inactive", expires: "٢٠٢٥/٠٦/٣٠" },
    { id: "DC005", code: "EID2025", discount: "15%", type: "percentage", usage: "0/200", status: "scheduled", expires: "٢٠٢٥/٠٥/٠١" }
  ];

  // Sample promotions
  const promotions = [
    { id: "PRM001", name: "تخفيضات الصيف", type: "banner", status: "active", expires: "٢٠٢٥/٠٨/٣١" },
    { id: "PRM002", name: "عروض رمضان", type: "popup", status: "scheduled", expires: "٢٠٢٥/٠٤/٣٠" },
    { id: "PRM003", name: "مجموعة منتجات مميزة", type: "collection", status: "active", expires: "٢٠٢٥/٠٥/٣١" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Tag className="w-6 h-6 text-[#F97415] mr-2" />
          <h1 className="text-2xl font-bold">التسويق والخصومات</h1>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center justify-center h-36">
            <div className="p-3 bg-[#F97415]/10 rounded-full mb-3">
              <Percent className="w-6 h-6 text-[#F97415]" />
            </div>
            <p className="font-medium">إنشاء كود خصم</p>
          </CardContent>
        </Card>
        
        <Card className="border cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center justify-center h-36">
            <div className="p-3 bg-[#F97415]/10 rounded-full mb-3">
              <RefreshCw className="w-6 h-6 text-[#F97415]" />
            </div>
            <p className="font-medium">حملة استرجاع العملاء</p>
          </CardContent>
        </Card>
        
        <Card className="border cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center justify-center h-36">
            <div className="p-3 bg-[#F97415]/10 rounded-full mb-3">
              <Calendar className="w-6 h-6 text-[#F97415]" />
            </div>
            <p className="font-medium">جدولة العروض</p>
          </CardContent>
        </Card>
        
        <Card className="border cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center justify-center h-36">
            <div className="p-3 bg-[#F97415]/10 rounded-full mb-3">
              <BarChart2 className="w-6 h-6 text-[#F97415]" />
            </div>
            <p className="font-medium">تحليل الحملات</p>
          </CardContent>
        </Card>
      </div>

      {/* Discount Codes */}
      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>أكواد الخصم</CardTitle>
          <Button className="bg-[#F97415] hover:bg-[#F97415]/90">
            <Plus className="w-4 h-4 mr-2" />
            إنشاء كود خصم
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="بحث عن كود خصم..." 
              className="pl-3 pr-10"
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-right text-sm font-semibold">الكود</th>
                  <th className="py-2 text-right text-sm font-semibold">الخصم</th>
                  <th className="py-2 text-right text-sm font-semibold">النوع</th>
                  <th className="py-2 text-right text-sm font-semibold">الاستخدام</th>
                  <th className="py-2 text-right text-sm font-semibold">الحالة</th>
                  <th className="py-2 text-right text-sm font-semibold">تاريخ الانتهاء</th>
                </tr>
              </thead>
              <tbody>
                {discountCodes.map((code) => (
                  <tr key={code.id} className="hover:bg-gray-50 transition-colors cursor-pointer border-b">
                    <td className="py-3 text-sm font-mono font-bold">{code.code}</td>
                    <td className="py-3 text-sm">{code.discount}</td>
                    <td className="py-3 text-sm">
                      {code.type === 'percentage' ? 'نسبة مئوية' :
                       code.type === 'fixed' ? 'قيمة ثابتة' : 'شحن مجاني'}
                    </td>
                    <td className="py-3 text-sm">{code.usage}</td>
                    <td className="py-3 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        code.status === 'active' ? 'bg-green-100 text-green-800' :
                        code.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {code.status === 'active' ? 'نشط' :
                         code.status === 'inactive' ? 'غير نشط' : 'مجدول'}
                      </span>
                    </td>
                    <td className="py-3 text-sm">{code.expires}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Promotions */}
      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>الحملات الترويجية</CardTitle>
          <Button className="bg-[#F97415] hover:bg-[#F97415]/90">
            <Plus className="w-4 h-4 mr-2" />
            إنشاء حملة
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-right text-sm font-semibold">اسم الحملة</th>
                  <th className="py-2 text-right text-sm font-semibold">النوع</th>
                  <th className="py-2 text-right text-sm font-semibold">الحالة</th>
                  <th className="py-2 text-right text-sm font-semibold">تاريخ الانتهاء</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((promo) => (
                  <tr key={promo.id} className="hover:bg-gray-50 transition-colors cursor-pointer border-b">
                    <td className="py-3 text-sm font-medium">{promo.name}</td>
                    <td className="py-3 text-sm">
                      {promo.type === 'banner' ? 'بانر' :
                       promo.type === 'popup' ? 'نافذة منبثقة' : 'مجموعة منتجات'}
                    </td>
                    <td className="py-3 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        promo.status === 'active' ? 'bg-green-100 text-green-800' :
                        promo.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {promo.status === 'active' ? 'نشط' :
                         promo.status === 'inactive' ? 'غير نشط' : 'مجدول'}
                      </span>
                    </td>
                    <td className="py-3 text-sm">{promo.expires}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Marketing;
