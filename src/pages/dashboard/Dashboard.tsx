
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  PackageCheck,
  TrendingUp,
  Bell
} from "lucide-react";

const Dashboard: React.FC = () => {
  // Sample data - in a real app, this would come from API/database
  const stats = [
    {
      title: "مبيعات اليوم",
      value: "٢,٥٠٠ ريال",
      icon: <DollarSign className="h-8 w-8 text-[#F97415]" />,
      change: "+15%",
      trend: "up"
    },
    {
      title: "طلبات جديدة",
      value: "١٢",
      icon: <ShoppingCart className="h-8 w-8 text-[#F97415]" />,
      change: "+20%",
      trend: "up"
    },
    {
      title: "عملاء جدد",
      value: "٥",
      icon: <Users className="h-8 w-8 text-[#F97415]" />,
      change: "+5%",
      trend: "up"
    },
    {
      title: "منتجات قليلة المخزون",
      value: "٣",
      icon: <PackageCheck className="h-8 w-8 text-red-500" />,
      change: "-1",
      trend: "down"
    }
  ];

  const recentOrders = [
    { id: "ORD10021", customer: "أحمد علي", date: "٢٠٢٥/٠٤/٢١", status: "completed", amount: "٣٥٠ ريال" },
    { id: "ORD10020", customer: "محمد خالد", date: "٢٠٢٥/٠٤/٢١", status: "processing", amount: "٤٨٠ ريال" },
    { id: "ORD10019", customer: "سارة محمد", date: "٢٠٢٥/٠٤/٢٠", status: "completed", amount: "٥٩٠ ريال" },
    { id: "ORD10018", customer: "فاطمة أحمد", date: "٢٠٢٥/٠٤/٢٠", status: "shipped", amount: "٧٧٠ ريال" },
    { id: "ORD10017", customer: "خالد عمر", date: "٢٠٢٥/٠٤/١٩", status: "completed", amount: "٢٢٠ ريال" }
  ];

  const lowInventory = [
    { id: "PRD1005", name: "قميص أزرق", stock: 2, reorder: 5 },
    { id: "PRD1012", name: "حذاء رياضي", stock: 3, reorder: 10 },
    { id: "PRD1008", name: "سماعات لاسلكية", stock: 1, reorder: 5 }
  ];

  const quickActions = [
    { title: "إضافة منتج جديد", icon: <PackageCheck className="h-6 w-6" />, path: "/dashboard/products/new" },
    { title: "إنشاء طلب", icon: <ShoppingCart className="h-6 w-6" />, path: "/dashboard/orders/new" },
    { title: "إضافة خصم", icon: <TrendingUp className="h-6 w-6" />, path: "/dashboard/marketing/discounts/new" },
    { title: "إضافة عميل", icon: <Users className="h-6 w-6" />, path: "/dashboard/customers/new" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">مرحباً بك في لوحة التحكم</h1>
        <p className="text-gray-500">٢١ أبريل ٢٠٢٥</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden border transition-all duration-200 hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className={`text-xs mt-2 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} {stat.trend === 'up' ? <TrendingUp className="h-3 w-3 inline" /> : '▼'}
                  </p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">الطلبات الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-right text-sm font-semibold">رقم الطلب</th>
                    <th className="py-2 text-right text-sm font-semibold">العميل</th>
                    <th className="py-2 text-right text-sm font-semibold">التاريخ</th>
                    <th className="py-2 text-right text-sm font-semibold">الحالة</th>
                    <th className="py-2 text-right text-sm font-semibold">المبلغ</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 text-sm">{order.id}</td>
                      <td className="py-3 text-sm">{order.customer}</td>
                      <td className="py-3 text-sm">{order.date}</td>
                      <td className="py-3 text-sm">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status === 'completed' ? 'مكتمل' :
                           order.status === 'processing' ? 'قيد المعالجة' : 'تم الشحن'}
                        </span>
                      </td>
                      <td className="py-3 text-sm">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Low Inventory Alert */}
          <Card className="border-red-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">تنبيهات المخزون</CardTitle>
                <Bell className="h-5 w-5 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {lowInventory.map((item) => (
                  <li key={item.id} className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-red-500">
                        المتبقي: {item.stock} (الحد الأدنى: {item.reorder})
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                      منخفض
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Card 
                    key={index} 
                    className="p-3 cursor-pointer hover:bg-gray-50 transition-colors border"
                    onClick={() => window.location.href = action.path}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="p-2 mb-2 bg-gray-100 rounded-full">
                        {action.icon}
                      </div>
                      <p className="text-sm font-medium">{action.title}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
