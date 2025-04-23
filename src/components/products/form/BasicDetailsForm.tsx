
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2, { message: "اسم المنتج مطلوب" }),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, { message: "السعر يجب أن يكون أكبر من 0" }),
  category: z.string().optional().nullable(),
  stock: z.coerce.number().min(0, { message: "المخزون يجب أن يكون 0 أو أكبر" }),
  status: z.enum(["published", "draft"]),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface BasicDetailsFormProps {
  form: UseFormReturn<ProductFormValues>;
}

export const BasicDetailsForm: React.FC<BasicDetailsFormProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>اسم المنتج</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>السعر</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="number" 
                step="0.01" 
                min="0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الفئة</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value || undefined}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="ملابس">ملابس</SelectItem>
                <SelectItem value="أحذية">أحذية</SelectItem>
                <SelectItem value="إكسسوارات">إكسسوارات</SelectItem>
                <SelectItem value="حقائب">حقائب</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>المخزون</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="number" 
                min="0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الحالة</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="published">منشور</SelectItem>
                <SelectItem value="draft">مسودة</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الوصف</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export { productSchema };
export type { ProductFormValues };
