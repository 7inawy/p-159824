
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/useOrders";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Minus, Trash } from "lucide-react";

interface CreateOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  customer_id: z.string().min(1, "يرجى اختيار العميل"),
  items: z.array(
    z.object({
      product_id: z.string().min(1, "يرجى اختيار المنتج"),
      quantity: z.number().min(1, "الكمية يجب أن تكون على الأقل 1"),
      price: z.number().min(0, "السعر يجب أن يكون أكبر من أو يساوي 0"),
    })
  ).min(1, "يجب أن يحتوي الطلب على منتج واحد على الأقل"),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateOrderDialog: React.FC<CreateOrderDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { createOrder } = useOrders();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_id: "",
      items: [{ product_id: "", quantity: 1, price: 0 }],
    },
  });

  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("name");

      if (error) throw error;

      // If customers table doesn't exist or is empty, return mock data
      if (!data || data.length === 0) {
        return [
          { id: "1", name: "أحمد علي" },
          { id: "2", name: "محمد خالد" },
          { id: "3", name: "سارة محمد" },
          { id: "4", name: "فاطمة أحمد" },
        ];
      }

      return data;
    },
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");

      if (error) throw error;
      return data || [];
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      await createOrder.mutateAsync(values);
      onOpenChange(false);
      form.reset({
        customer_id: "",
        items: [{ product_id: "", quantity: 1, price: 0 }],
      });
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addProductRow = () => {
    const items = form.getValues("items");
    form.setValue("items", [
      ...items,
      { product_id: "", quantity: 1, price: 0 },
    ]);
  };

  const removeProductRow = (index: number) => {
    const items = form.getValues("items");
    if (items.length > 1) {
      form.setValue(
        "items",
        items.filter((_, i) => i !== index)
      );
    }
  };

  const increaseQuantity = (index: number) => {
    const items = form.getValues("items");
    const newQuantity = (items[index].quantity || 0) + 1;
    form.setValue(`items.${index}.quantity`, newQuantity);
  };

  const decreaseQuantity = (index: number) => {
    const items = form.getValues("items");
    const currentQuantity = items[index].quantity || 0;
    if (currentQuantity > 1) {
      form.setValue(`items.${index}.quantity`, currentQuantity - 1);
    }
  };

  const handleProductChange = (index: number, productId: string) => {
    form.setValue(`items.${index}.product_id`, productId);
    
    // Find the product price
    const product = products?.find(p => p.id === productId);
    if (product) {
      form.setValue(`items.${index}.price`, product.price);
    }
  };

  const calculateTotal = () => {
    const items = form.getValues("items");
    return items.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إنشاء طلب جديد</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="customer_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العميل</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoadingCustomers}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العميل" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers?.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>المنتجات</FormLabel>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead>الكمية</TableHead>
                    <TableHead>السعر</TableHead>
                    <TableHead>الإجمالي</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {form.watch("items").map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select
                          onValueChange={(value) => handleProductChange(index, value)}
                          value={item.product_id}
                          disabled={isLoadingProducts}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="اختر المنتج" />
                          </SelectTrigger>
                          <SelectContent>
                            {products?.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => decreaseQuantity(index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity || 1}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => increaseQuantity(index)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{item.price?.toFixed(2) || "0.00"} ريال</TableCell>
                      <TableCell>
                        {((item.price || 0) * (item.quantity || 0)).toFixed(2)} ريال
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeProductRow(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={addProductRow}
              >
                <Plus className="h-4 w-4 mr-2" /> إضافة منتج
              </Button>
            </div>

            <div className="flex justify-end text-lg font-bold">
              <p>الإجمالي: {calculateTotal().toFixed(2)} ريال</p>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#F97415] hover:bg-[#F97415]/90"
              >
                {isSubmitting ? "جاري الإنشاء..." : "إنشاء الطلب"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
