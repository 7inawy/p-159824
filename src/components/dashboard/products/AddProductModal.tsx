
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload } from "lucide-react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ 
  isOpen, 
  onClose,
  onProductAdded
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productType, setProductType] = useState<string>("simple");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    status: "published"
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({ title: "خطأ", description: "يرجى إدخال اسم المنتج", variant: "destructive" });
      return false;
    }
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      toast({ title: "خطأ", description: "يرجى إدخال سعر صحيح", variant: "destructive" });
      return false;
    }
    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      toast({ title: "خطأ", description: "يرجى إدخال كمية صحيحة", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Get the retailer_id for the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({ title: "خطأ", description: "يجب تسجيل الدخول لإضافة منتج", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      
      const { data: retailerData, error: retailerError } = await supabase
        .from("retailers")
        .select("id")
        .eq("user_id", user.id)
        .single();
      
      if (retailerError || !retailerData) {
        toast({ title: "خطأ", description: "لم يتم العثور على معلومات المتجر", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      
      let imageUrl = null;
      
      // Upload image if available
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, image);
        
        if (uploadError) {
          toast({ title: "خطأ", description: "فشل في رفع الصورة", variant: "destructive" });
          setIsLoading(false);
          return;
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrl;
      }
      
      // Insert product
      const { data, error } = await supabase
        .from("products")
        .insert({
          retailer_id: retailerData.id,
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          stock: Number(formData.stock),
          category: formData.category,
          image_url: imageUrl,
        })
        .select();
      
      if (error) {
        console.error("Error inserting product:", error);
        toast({ title: "خطأ", description: "فشل في إضافة المنتج", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      
      toast({ title: "تم بنجاح", description: "تمت إضافة المنتج بنجاح" });
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        status: "published"
      });
      setImage(null);
      setImagePreview(null);
      onProductAdded();
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      toast({ title: "خطأ", description: "حدث خطأ غير متوقع", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">إضافة منتج جديد</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productType">نوع المنتج</Label>
              <Select 
                value={productType} 
                onValueChange={(value) => setProductType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع المنتج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">منتج بسيط</SelectItem>
                  <SelectItem value="variable">منتج متعدد الخيارات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">الحالة</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="حالة المنتج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">منشور</SelectItem>
                  <SelectItem value="draft">مسودة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">اسم المنتج*</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              placeholder="أدخل اسم المنتج"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">وصف المنتج</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              placeholder="أدخل وصف المنتج"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">السعر*</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                value={formData.price} 
                onChange={handleInputChange} 
                placeholder="أدخل سعر المنتج"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">الكمية المتوفرة*</Label>
              <Input 
                id="stock" 
                name="stock" 
                type="number" 
                value={formData.stock} 
                onChange={handleInputChange} 
                placeholder="أدخل الكمية المتوفرة"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">الفئة</Label>
            <Input 
              id="category" 
              name="category" 
              value={formData.category} 
              onChange={handleInputChange} 
              placeholder="أدخل فئة المنتج"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">صورة المنتج</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="معاينة" 
                    className="mx-auto h-40 object-contain" 
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  >
                    إزالة الصورة
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-500">اضغط لاختيار صورة أو اسحب وأفلت الصورة هنا</p>
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                'إضافة المنتج'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
