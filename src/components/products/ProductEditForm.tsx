
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "./form/ImageUpload";
import { BasicDetailsForm, productSchema, type ProductFormValues } from "./form/BasicDetailsForm";

interface ProductEditFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export const ProductEditForm: React.FC<ProductEditFormProps> = ({ 
  open, 
  onOpenChange,
  product 
}) => {
  const { updateProduct } = useProducts();
  const [image, setImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      category: product?.category || null,
      stock: product?.stock || 0,
      status: product?.status || "published",
    },
  });

  // Update form values when product changes
  React.useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description || "",
        price: product.price,
        category: product.category,
        stock: product.stock,
        status: product.status || "published",
      });
      
      // Set image preview if product has an image
      setImagePreview(product.image_url);
    }
  }, [product, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      
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
    if (!product) return;
    
    try {
      setIsSubmitting(true);
      
      let image_url = product.image_url;
      
      // Upload new image if changed
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
        
        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);
          
        image_url = publicUrlData.publicUrl;
      } else if (imagePreview === null && product.image_url) {
        // Remove image if user cleared it
        image_url = null;
      }
      
      const updatedProductData: Partial<Product> & { id: string } = {
        id: product.id,
        name: data.name,
        description: data.description || null,
        price: data.price,
        category: data.category,
        stock: data.stock,
        status: data.status,
        image_url,
      };
      
      await updateProduct.mutateAsync(updatedProductData);
      
      form.reset();
      setImage(null);
      setImagePreview(null);
      onOpenChange(false);
      
      toast.success("تم تحديث المنتج بنجاح");
    } catch (error: any) {
      toast.error(`فشل في تحديث المنتج: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>تعديل المنتج</DialogTitle>
          <DialogDescription>
            قم بتعديل تفاصيل المنتج وانقر على حفظ عندما تنتهي.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="md:col-span-2">
              <ImageUpload
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
                onClearImage={clearImage}
              />
            </div>
            
            <BasicDetailsForm form={form} />
            
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
                {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
