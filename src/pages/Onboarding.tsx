
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Onboarding = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    storeCategory: "",
    logoFile: null as File | null,
    logoUrl: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Preview the image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({
            ...formData,
            logoFile: file,
            logoUrl: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, storeCategory: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const user = (await supabase.auth.getUser()).data.user;
      
      if (!user) {
        throw new Error("No authenticated user found");
      }
      
      // Upload logo if exists
      let logoPath = null;
      if (formData.logoFile) {
        const fileName = `store-logos/${user.id}-${Date.now()}-${formData.logoFile.name}`;
        const { error: uploadError, data } = await supabase.storage
          .from("store-assets")
          .upload(fileName, formData.logoFile);
          
        if (uploadError) throw uploadError;
        logoPath = data.path;
      }
      
      // Create store profile
      const { error } = await supabase.from("stores").insert({
        owner_id: user.id,
        name: formData.storeName,
        description: formData.storeDescription,
        category: formData.storeCategory,
        logo_url: logoPath,
      });
      
      if (error) throw error;
      
      toast({
        title: "Setup complete!",
        description: "Your store has been created successfully.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error setting up store",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FEF1E8] p-4" dir="rtl">
      <Card className="w-full max-w-3xl overflow-hidden border-none shadow-lg">
        <CardHeader className="bg-[#F97415] text-white text-center p-6">
          <CardTitle className="text-2xl font-bold">إعداد متجرك</CardTitle>
          <CardDescription className="text-white/90">
            لنبدأ بإعداد متجرك الخاص بك بخطوات بسيطة
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">اسم المتجر</Label>
                  <Input
                    id="storeName"
                    name="storeName"
                    placeholder="أدخل اسم متجرك"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeCategory">فئة المتجر</Label>
                  <Select
                    value={formData.storeCategory}
                    onValueChange={handleSelectChange}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر فئة المتجر" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion">الأزياء والموضة</SelectItem>
                      <SelectItem value="electronics">الإلكترونيات</SelectItem>
                      <SelectItem value="beauty">الجمال والعناية</SelectItem>
                      <SelectItem value="food">الطعام والمشروبات</SelectItem>
                      <SelectItem value="home">المنزل والأثاث</SelectItem>
                      <SelectItem value="health">الصحة واللياقة</SelectItem>
                      <SelectItem value="books">الكتب والقرطاسية</SelectItem>
                      <SelectItem value="toys">الألعاب والهدايا</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">وصف المتجر</Label>
                  <Textarea
                    id="storeDescription"
                    name="storeDescription"
                    placeholder="أخبرنا المزيد عن متجرك ومنتجاتك"
                    value={formData.storeDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="resize-none"
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                التالي
              </Button>
            </form>
          )}
          
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeLogo">شعار المتجر</Label>
                  <div className="flex flex-col items-center space-y-4">
                    {formData.logoUrl ? (
                      <div className="relative w-32 h-32 mb-4">
                        <img
                          src={formData.logoUrl}
                          alt="Store logo preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                          onClick={() => setFormData({ ...formData, logoFile: null, logoUrl: "" })}
                        >
                          ×
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-lg mb-4">
                        <span className="text-gray-400">شعار المتجر</span>
                      </div>
                    )}
                    
                    <div className="w-full">
                      <Input
                        id="storeLogo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        يفضل استخدام صورة بحجم 512×512 بكسل بتنسيق PNG أو JPG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  السابق
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "جاري الإعداد..." : "إنهاء الإعداد"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <div className="flex space-x-2">
            <span className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-[#F97415]" : "bg-gray-300"}`}></span>
            <span className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-[#F97415]" : "bg-gray-300"}`}></span>
          </div>
          <p className="text-sm text-gray-600">
            خطوة {step} من 2
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Onboarding;
