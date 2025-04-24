
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Filter, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/useOrders";
import { OrderDetails } from "@/components/orders/OrderDetails";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateArabic } from "@/lib/utils";

const Orders: React.FC = () => {
  const { orders, isLoading, error, useOrderDetails } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [createOrderOpen, setCreateOrderOpen] = useState(false);
  
  const { data: selectedOrder } = useOrderDetails(selectedOrderId);

  // Filter orders based on search query
  const filteredOrders = orders?.filter(order => {
    if (!searchQuery) return true;
    
    // Search by order ID or status
    return order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
           order.status.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'processing':
        return 'قيد المعالجة';
      case 'shipped':
        return 'تم الشحن';
      case 'cancelled':
        return 'ملغي';
      case 'pending':
        return 'قيد الانتظار';
      default:
        return status;
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
          onClick={() => setCreateOrderOpen(true)}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">رقم الطلب</TableHead>
              <TableHead className="text-right">التاريخ</TableHead>
              <TableHead className="text-right">المنتجات</TableHead>
              <TableHead className="text-right">المبلغ</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  جاري التحميل...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-red-500">
                  حدث خطأ أثناء تحميل البيانات
                </TableCell>
              </TableRow>
            ) : filteredOrders?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  لا توجد طلبات
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders?.map((order) => (
                <TableRow 
                  key={order.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrderId(order.id)}
                >
                  <TableCell>{order.id.substring(0, 8)}</TableCell>
                  <TableCell>{order.created_at ? formatDateArabic(new Date(order.created_at)) : "-"}</TableCell>
                  <TableCell>{order.items_count} منتجات</TableCell>
                  <TableCell className="font-semibold">{order.total.toFixed(2)} ريال</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyles(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Dialog */}
      <OrderDetails 
        open={!!selectedOrderId} 
        onOpenChange={(open) => {
          if (!open) setSelectedOrderId(null);
        }}
        order={selectedOrder || null}
      />

      {/* Create Order Dialog */}
      <CreateOrderDialog
        open={createOrderOpen}
        onOpenChange={setCreateOrderOpen}
      />
    </div>
  );
};

export default Orders;
