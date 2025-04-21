
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <BarChart className="w-6 h-6 text-[#F97415] mr-2" />
        <h1 className="text-2xl font-bold">التحليلات</h1>
      </div>

      {/* Period Selector */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex space-x-2 justify-end">
            <Button variant="outline" size="sm" className="text-sm">اليوم</Button>
            <Button variant="outline" size="sm" className="text-sm">هذا الأسبوع</Button>
            <Button className="text-sm bg-[#F97415] hover:bg-[#F97415]/90">هذا الشهر</Button>
            <Button variant="outline" size="sm" className="text-sm">هذا العام</Button>
            <Button variant="outline" size="sm" className="text-sm">تخصيص</Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border">
          <CardContent className="p-4 flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">الإيرادات</p>
              <h3 className="text-2xl font-bold mt-1">٨,٥٤٠ ريال</h3>
              <p className="text-xs mt-2 text-green-500">
                +١٥% <TrendingUp className="h-3 w-3 inline" />
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border">
          <CardContent className="p-4 flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">الطلبات</p>
              <h3 className="text-2xl font-bold mt-1">٤٥</h3>
              <p className="text-xs mt-2 text-green-500">
                +٢٠% <TrendingUp className="h-3 w-3 inline" />
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border">
          <CardContent className="p-4 flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">عملاء جدد</p>
              <h3 className="text-2xl font-bold mt-1">١٢</h3>
              <p className="text-xs mt-2 text-green-500">
                +٨% <TrendingUp className="h-3 w-3 inline" />
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border">
          <CardContent className="p-4 flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">متوسط قيمة الطلب</p>
              <h3 className="text-2xl font-bold mt-1">١٨٩ ريال</h3>
              <p className="text-xs mt-2 text-red-500">
                -٥% <TrendingDown className="h-3 w-3 inline" />
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border">
          <CardHeader>
            <CardTitle>المبيعات الشهرية</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center p-6">
            <div className="aspect-[16/9] w-full bg-gray-100 rounded-lg flex items-center justify-center">
              <LineChart className="w-12 h-12 text-gray-400" />
              <p className="text-gray-400 mr-2">رسم بياني للمبيعات الشهرية</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border">
          <CardHeader>
            <CardTitle>توزيع المنتجات</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center p-6">
            <div className="aspect-[16/9] w-full bg-gray-100 rounded-lg flex items-center justify-center">
              <PieChart className="w-12 h-12 text-gray-400" />
              <p className="text-gray-400 mr-2">رسم بياني لتوزيع المنتجات</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="border">
        <CardHeader>
          <CardTitle>أفضل المنتجات مبيعاً</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-right text-sm font-semibold">المنتج</th>
                  <th className="py-2 text-right text-sm font-semibold">المبيعات</th>
                  <th className="py-2 text-right text-sm font-semibold">الإيرادات</th>
                  <th className="py-2 text-right text-sm font-semibold">النمو</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 transition-colors border-b">
                  <td className="py-3 text-sm font-medium">قميص قطني</td>
                  <td className="py-3 text-sm">١٨</td>
                  <td className="py-3 text-sm">٢,١٦٠ ريال</td>
                  <td className="py-3 text-sm text-green-500">+٢٥%</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors border-b">
                  <td className="py-3 text-sm font-medium">حذاء رياضي</td>
                  <td className="py-3 text-sm">١٢</td>
                  <td className="py-3 text-sm">٣,٠٠٠ ريال</td>
                  <td className="py-3 text-sm text-green-500">+١٨%</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors border-b">
                  <td className="py-3 text-sm font-medium">ساعة يد</td>
                  <td className="py-3 text-sm">٨</td>
                  <td className="py-3 text-sm">٢,٨٠٠ ريال</td>
                  <td className="py-3 text-sm text-red-500">-٥%</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors border-b">
                  <td className="py-3 text-sm font-medium">بنطلون جينز</td>
                  <td className="py-3 text-sm">٧</td>
                  <td className="py-3 text-sm">١,٠٥٠ ريال</td>
                  <td className="py-3 text-sm text-green-500">+١٠%</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-sm font-medium">حقيبة جلدية</td>
                  <td className="py-3 text-sm">٦</td>
                  <td className="py-3 text-sm">١,٢٠٠ ريال</td>
                  <td className="py-3 text-sm text-green-500">+١٥%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
