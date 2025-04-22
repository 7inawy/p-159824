
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomerAdded: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ 
  isOpen, 
  onClose,
  onCustomerAdded
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast({ title: "خطأ", description: "يرجى إدخال البريد الإلكتروني", variant: "destructive" });
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      toast({ title: "خطأ", description: "يجب أن تكون كلمة المرور 6 أحرف على الأقل", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Create the user in Supabase Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        email_confirm: true,
        user_metadata: {
          full_name: formData.fullName,
          phone: formData.phone
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (!data.user) {
        throw new Error("فشل في إنشاء المستخدم");
      }
      
      // Set the user role to 'customer' in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'customer' })
        .eq('id', data.user.id);
      
      if (profileError) {
        // Try to delete the user if profile update fails
        await supabase.auth.admin.deleteUser(data.user.id);
        throw profileError;
      }
      
      toast({ title: "تم بنجاح", description: "تمت إضافة العميل بنجاح" });
      setFormData({
        email: "",
        password: "",
        fullName: "",
        phone: ""
      });
      onCustomerAdded();
      onClose();
    } catch (error: any) {
      console.error("Error adding customer:", error);
      toast({ 
        title: "خطأ في إضافة العميل", 
        description: error.message, 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">إضافة عميل جديد</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني*</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              placeholder="أدخل البريد الإلكتروني"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور*</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              value={formData.password} 
              onChange={handleInputChange} 
              placeholder="أدخل كلمة المرور"
              required
              minLength={6}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullName">الاسم الكامل</Label>
            <Input 
              id="fullName" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleInputChange} 
              placeholder="أدخل الاسم الكامل"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange} 
              placeholder="أدخل رقم الهاتف"
            />
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الإضافة...
                </>
              ) : (
                'إضافة العميل'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerModal;
