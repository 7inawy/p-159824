
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";
import { X, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Define the form schema
const productSchema = z.object({
  name: z.string().min(2, { message: "اسم المنتج مطلوب" }),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, { message: "السعر يجب أن يكون أكبر من 0" }),
  category: z.string().optional().nullable(),
  stock: z.coerce.number().min(0, { message: "المخزون يجب أن يكون 0 أو أكبر" }),
  status: z.enum(["published", "draft"]),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ open, onOpenChange }) => {
  const { createProduct } = useProducts();
  const [image, setImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: null,
      stock: 0,
      status: "published",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      
      let image_url = null;
      
      // Upload image if available
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('products')
          .upload(filePath, image);
          
        if (uploadError) {
          throw new Error(uploadError.message);
        }
        
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);
          
        image_url = publicUrlData.publicUrl;
      }
      
      // Prepare product data
      const productData: Omit<Product, "id" | "created_at" | "updated_at"> = {
        ...data,
        image_url,
        retailer_id: null, // This would typically come from the authenticated user
      };
      
      await createProduct.mutateAsync(productData);
      
      // Reset the form
      form.reset();
      setImage(null);
      setImagePreview(null);
      
      // Close the dialog
      onOpenChange(false);
      
      toast.success("تم إضافة المنتج بنجاح");
    } catch (error: any) {
      toast.error(`فشل في إضافة المنتج: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>إضافة منتج جديد</DialogTitle>
          <DialogDescription>
            أدخل تفاصيل المنتج الجديد وانقر على إضافة عندما تنتهي.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                {/* Image Upload */}
                <div className="mb-4">
                  <FormLabel>صورة المنتج</FormLabel>
                  <div className="mt-2">
                    {!imagePreview ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Input 
                          type="file" 
                          id="image" 
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <label 
                          htmlFor="image" 
                          className="cursor-pointer flex flex-col items-center justify-center text-gray-500"
                        >
                          <Upload size={24} className="mb-2" />
                          <span>انقر لرفع صورة</span>
                          <span className="text-xs mt-1">PNG, JPG, WebP</span>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Product preview" 
                          className="h-40 w-auto mx-auto object-contain rounded-md"
                        />
                        <Button 
                          type="button"
                          variant="destructive" 
                          size="icon" 
                          className="absolute top-0 right-0 rounded-full h-6 w-6" 
                          onClick={clearImage}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
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
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                إلغاء
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[#F97415] hover:bg-[#F97415]/90"
              >
                {isSubmitting ? "جاري الإضافة..." : "إضافة المنتج"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
