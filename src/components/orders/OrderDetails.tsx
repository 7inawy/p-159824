
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderWithItems } from "@/hooks/useOrders";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDateArabic } from "@/lib/utils";

interface OrderDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderWithItems | null;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  open,
  onOpenChange,
  order,
}) => {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "مكتمل";
      case "processing":
        return "قيد المعالجة";
      case "shipped":
        return "تم الشحن";
      case "cancelled":
        return "ملغي";
      case "pending":
        return "قيد الانتظار";
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <span>تفاصيل الطلب #{order.id.substring(0, 8)}</span>
            <Badge className={getStatusColor(order.status)}>
              {getStatusText(order.status)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-500">تاريخ الطلب</h4>
              <p>{order.created_at ? formatDateArabic(new Date(order.created_at)) : "-"}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500">إجمالي الطلب</h4>
              <p className="font-bold">{order.total.toFixed(2)} ريال</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold mb-3">المنتجات</h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 border rounded-md"
                >
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × {item.price.toFixed(2)} ريال
                    </p>
                  </div>
                  <p className="font-semibold">
                    {(item.quantity * item.price).toFixed(2)} ريال
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center font-bold">
            <span>الإجمالي:</span>
            <span>{order.total.toFixed(2)} ريال</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
