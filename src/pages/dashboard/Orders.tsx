
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Filter, Search, Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useOrders } from "@/hooks/useOrders";
import AddOrderModal from "@/components/dashboard/orders/AddOrderModal";
import { formatDate } from "@/lib/utils";

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { 
    orders, 
    isLoading, 
    error, 
    fetchOrders, 
    updateOrderStatus,
    deleteOrder
  } = useOrders();

  const filteredOrders = orders.filter(order => 
    (order.customer_name && order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.customer_email && order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'processing': return 'قيد المعالجة';
      case 'shipped': return 'تم الشحن';
      case 'pending': return 'قيد الانتظار';
      case 'cancelled': return 'ملغي';
      case 'delivered': return 'تم التسليم';
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    await updateOrderStatus(orderId, status);
  };

  const handleDeleteOrder = async (orderId: string) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذا الطلب؟");
    if (confirmed) {
      await deleteOrder(orderId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <ShoppingCart className="w-6 h-6 text-[#F97415] mr-2" />
          <h1 className="text-2xl font-bold">الطلبات</h1>
        </div>
        <Button 
          className="bg-[#F97415] hover:bg-[#F97415]/90"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          إنشاء طلب
        </Button>
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
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                <span>تصفية</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#F97415]" />
          <span className="mr-2 text-lg">جاري تحميل الطلبات...</span>
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div className="bg-red-50 p-4 rounded-md text-red-800 text-center">
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-2" 
            onClick={fetchOrders}
          >
            إعادة المحاولة
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && orders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium">لا يوجد طلبات</h3>
          <p className="text-gray-500 mb-4">قم بإنشاء طلب جديد لعرضه هنا</p>
          <Button 
            className="bg-[#F97415] hover:bg-[#F97415]/90"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            إنشاء طلب جديد
          </Button>
        </div>
      )}

      {/* Orders Table */}
      {!isLoading && !error && filteredOrders.length > 0 && (
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
                <th className="py-2 text-right text-sm font-semibold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors cursor-pointer border-b">
                  <td className="py-3 text-sm">{order.id.slice(0, 8)}</td>
                  <td className="py-3 text-sm">{order.customer_name || order.customer_email || "عميل غير معروف"}</td>
                  <td className="py-3 text-sm">{formatDate(order.created_at)}</td>
                  <td className="py-3 text-sm">{order.items_count} منتجات</td>
                  <td className="py-3 text-sm font-semibold">{order.total} ريال</td>
                  <td className="py-3 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="py-3 text-sm">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          تغيير الحالة
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, "pending")}>
                          قيد الانتظار
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, "processing")}>
                          قيد المعالجة
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, "shipped")}>
                          تم الشحن
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, "delivered")}>
                          تم التسليم
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, "completed")}>
                          مكتمل
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, "cancelled")}>
                          ملغي
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-500" 
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          حذف الطلب
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Order Modal */}
      <AddOrderModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onOrderAdded={fetchOrders}
      />
    </div>
  );
};

export default Orders;
