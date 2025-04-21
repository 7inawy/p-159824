
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  CreditCard, 
  Truck, 
  Users, 
  Bell, 
  FileText 
} from "lucide-react";

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Settings className="w-6 h-6 text-[#F97415] mr-2" />
        <h1 className="text-2xl font-bold">الإعدادات</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          <Button variant="default" className="w-full justify-start bg-[#F97415] hover:bg-[#F97415]/90">
            <Settings className="w-5 h-5 mr-2" />
            معلومات المتجر
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <CreditCard className="w-5 h-5 mr-2" />
            طرق الدفع
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Truck className="w-5 h-5 mr-2" />
            الشحن والتوصيل
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Users className="w-5 h-5 mr-2" />
            فريق العمل
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Bell className="w-5 h-5 mr-2" />
            الإشعارات
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <FileText className="w-5 h-5 mr-2" />
            الصفحات القانونية
          </Button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border">
            <CardHeader>
              <CardTitle>معلومات المتجر</CardTitle>
              <CardDescription>تحديث المعلومات الأساسية لمتجرك</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">اسم المتجر</Label>
                    <Input id="storeName" defaultValue="متجري الإلكتروني" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storeDescription">وصف المتجر</Label>
                    <Textarea 
                      id="storeDescription" 
                      rows={4}
                      className="resize-none"
                      defaultValue="متجر إلكتروني متخصص في بيع الملابس والإكسسوارات للرجال والنساء بأفضل الأسعار وأعلى جودة."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني للتواصل</Label>
                      <Input id="email" type="email" defaultValue="info@mystore.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف للتواصل</Label>
                      <Input id="phone" type="tel" defaultValue="+966 50 123 4567" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storeLogo">شعار المتجر</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        <span className="text-gray-400">شعار</span>
                      </div>
                      <div className="flex-1">
                        <Input id="storeLogo" type="file" />
                        <p className="text-xs text-gray-500 mt-1">
                          يفضل استخدام صورة بحجم 512×512 بكسل
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storeDomain">نطاق المتجر</Label>
                    <div className="flex">
                      <Input id="storeDomain" defaultValue="mystore" />
                      <span className="flex items-center px-3 border border-r-0 bg-gray-50 rounded-r-md">
                        .domain.com
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      يمكنك ربط نطاق مخصص من خلال إعدادات النطاقات
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline">إلغاء</Button>
                  <Button className="bg-[#F97415] hover:bg-[#F97415]/90">حفظ التغييرات</Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card className="border">
            <CardHeader>
              <CardTitle>الإعدادات الإضافية</CardTitle>
              <CardDescription>تحديث إعدادات متجرك المتقدمة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">تفعيل متابعة المخزون</h3>
                    <p className="text-sm text-gray-500">عرض حالة المخزون للعميل في صفحة المنتج</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">تفعيل</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">بيع المنتجات عندما تكون غير متوفرة</h3>
                    <p className="text-sm text-gray-500">السماح للعملاء بالطلب عندما يكون المنتج غير متوفر في المخزون</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">تعطيل</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">عملة المتجر الافتراضية</h3>
                    <p className="text-sm text-gray-500">العملة الرئيسية المستخدمة لعرض الأسعار</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">SAR - ريال سعودي</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
