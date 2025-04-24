import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PackageCheck, Filter, Search, AlertTriangle, PlusCircle, MinusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useProducts } from "@/hooks/useProducts";
import { useInventory } from "@/hooks/useInventory";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const inventoryActionSchema = z.object({
  quantity: z.number().min(1, "الكمية يجب أن تكون رقم موجب"),
  reason: z.string().optional()
});

const Inventory: React.FC = () => {
  // Sample inventory data
  const inventory = [
    { id: "PRD1001", name: "قميص قطني", sku: "SHT-001", stock: 25, reorderLevel: 10, status: "in-stock" },
    { id: "PRD1002", name: "بنطلون جينز", sku: "PNT-001", stock: 18, reorderLevel: 10, status: "in-stock" },
    { id: "PRD1003", name: "حذاء رياضي", sku: "SHO-001", stock: 10, reorderLevel: 10, status: "in-stock" },
    { id: "PRD1004", name: "ساعة يد", sku: "WTC-001", stock: 7, reorderLevel: 5, status: "in-stock" },
    { id: "PRD1005", name: "قميص أزرق", sku: "SHT-002", stock: 2, reorderLevel: 5, status: "low-stock" },
    { id: "PRD1006", name: "نظارة شمسية", sku: "ACC-001", stock: 15, reorderLevel: 5, status: "in-stock" },
    { id: "PRD1007", name: "حقيبة جلدية", sku: "BAG-001", stock: 6, reorderLevel: 5, status: "in-stock" },
    { id: "PRD1008", name: "سماعات لاسلكية", sku: "ELC-001", stock: 1, reorderLevel: 5, status: "low-stock" },
    { id: "PRD1009", name: "حذاء رياضي أحمر", sku: "SHO-002", stock: 0, reorderLevel: 5, status: "out-of-stock" }
  ];

  const { products } = useProducts();
  const { updateInventory } = useInventory();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [inventoryAction, setInventoryAction] = useState<"restock" | "remove">("restock");

  const form = useForm<z.infer<typeof inventoryActionSchema>>({
    resolver: zodResolver(inventoryActionSchema),
    defaultValues: {
      quantity: 1,
      reason: ""
    }
  });

  const handleInventoryAction = (values: z.infer<typeof inventoryActionSchema>) => {
    if (!selectedProduct) return;

    updateInventory.mutate({
      product_id: selectedProduct,
      action: inventoryAction,
      quantity: values.quantity,
      previous_stock: products?.find(p => p.id === selectedProduct)?.stock || 0,
      new_stock: 0, // This will be calculated in the mutation
      reason: values.reason
    });

    form.reset();
    setSelectedProduct(null);
  };

  const calculateStockStatus = (stock: number, reorderLevel: number) => {
    if (stock === 0) return "out-of-stock";
    if (stock <= reorderLevel) return "low-stock";
    return "in-stock";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <PackageCheck className="w-6 h-6 text-[#F97415] mr-2" />
        <h1 className="text-2xl font-bold">المخزون</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border shadow-sm">
          <CardContent className="p-4 flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <PackageCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">منتجات متوفرة</p>
              <p className="text-2xl font-bold">٧</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm">
          <CardContent className="p-4 flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">مخزون منخفض</p>
              <p className="text-2xl font-bold">٢</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm">
          <CardContent className="p-4 flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <PackageCheck className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">نفذت من المخزون</p>
              <p className="text-2xl font-bold">١</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="بحث عن منتج..." 
                className="pl-3 pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                <span>تصفية</span>
              </Button>
              <Button className="bg-[#F97415] hover:bg-[#F97415]/90">
                تحديث المخزون
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table with Action Button */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-right text-sm font-semibold">المنتج</th>
              <th className="py-2 text-right text-sm font-semibold">SKU</th>
              <th className="py-2 text-right text-sm font-semibold">المخزون الحالي</th>
              <th className="py-2 text-right text-sm font-semibold">حد إعادة الطلب</th>
              <th className="py-2 text-right text-sm font-semibold">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-gray-50 transition-colors cursor-pointer border-b"
              >
                <td className="py-3 text-sm font-medium">{item.name}</td>
                <td className="py-3 text-sm text-gray-500">{item.sku}</td>
                <td className="py-3 text-sm">{item.stock}</td>
                <td className="py-3 text-sm">{item.reorder_level}</td>
                <td className="py-3 text-sm">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    calculateStockStatus(item.stock, item.reorder_level) === 'in-stock' ? 'bg-green-100 text-green-800' :
                    calculateStockStatus(item.stock, item.reorder_level) === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {calculateStockStatus(item.stock, item.reorder_level) === 'in-stock' ? 'متوفر' :
                     calculateStockStatus(item.stock, item.reorder_level) === 'low-stock' ? 'مخزون منخفض' : 'غير متوفر'}
                  </span>
                </td>
                <td>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedProduct(item.id)}
                      >
                        <PlusCircle className="w-4 h-4 ml-2" /> إضافة
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>تحديث مخزون {item.name}</DialogTitle>
                      </DialogHeader>
                      <div className="flex gap-2 mb-4">
                        <Button 
                          variant={inventoryAction === "restock" ? "default" : "outline"}
                          onClick={() => setInventoryAction("restock")}
                        >
                          <PlusCircle className="w-4 h-4 ml-2" /> إضافة مخزون
                        </Button>
                        <Button 
                          variant={inventoryAction === "remove" ? "destructive" : "outline"}
                          onClick={() => setInventoryAction("remove")}
                        >
                          <MinusCircle className="w-4 h-4 ml-2" /> تخفيض مخزون
                        </Button>
                      </div>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleInventoryAction)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>الكمية</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field} 
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>سبب التحديث (اختياري)</FormLabel>
                                <FormControl>
                                  <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full">
                            تأكيد التحديث
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
