
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Layers, SquarePen, Globe, Layout, Type, Image, Copy, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const StoreCustomization: React.FC = () => {
  // Sample themes
  const themes = [
    { id: "theme1", name: "الأساسي", image: "https://placehold.co/300x200?text=Basic+Theme", active: true },
    { id: "theme2", name: "الأنيق", image: "https://placehold.co/300x200?text=Elegant+Theme", active: false },
    { id: "theme3", name: "العصري", image: "https://placehold.co/300x200?text=Modern+Theme", active: false },
    { id: "theme4", name: "التقليدي", image: "https://placehold.co/300x200?text=Classic+Theme", active: false },
  ];

  // Sample pages
  const pages = [
    { id: "page1", name: "الرئيسية", url: "/" },
    { id: "page2", name: "المنتجات", url: "/products" },
    { id: "page3", name: "من نحن", url: "/about" },
    { id: "page4", name: "تواصل معنا", url: "/contact" },
    { id: "page5", name: "المدونة", url: "/blog" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Palette className="w-6 h-6 text-[#F97415] mr-2" />
          <h1 className="text-2xl font-bold">تخصيص المتجر</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <EyeIcon className="w-4 h-4 mr-2" />
            معاينة المتجر
          </Button>
          <Button className="bg-[#F97415] hover:bg-[#F97415]/90">
            نشر التغييرات
          </Button>
        </div>
      </div>

      {/* Editor Navigation */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="default" className="bg-[#F97415] hover:bg-[#F97415]/90">
              <Layout className="w-4 h-4 mr-2" />
              القوالب
            </Button>
            <Button variant="outline">
              <Type className="w-4 h-4 mr-2" />
              الخطوط والألوان
            </Button>
            <Button variant="outline">
              <Layers className="w-4 h-4 mr-2" />
              الصفحات
            </Button>
            <Button variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              النطاق
            </Button>
            <Button variant="outline">
              <SquarePen className="w-4 h-4 mr-2" />
              محرر متقدم
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Themes */}
      <Card className="border">
        <CardHeader>
          <CardTitle>قوالب المتجر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <Card key={theme.id} className={`border cursor-pointer overflow-hidden ${theme.active ? 'ring-2 ring-[#F97415]' : ''}`}>
                <div className="relative">
                  <img src={theme.image} alt={theme.name} className="w-full aspect-[3/2] object-cover" />
                  {theme.active && (
                    <div className="absolute top-2 right-2 bg-[#F97415] text-white text-xs rounded-full px-2 py-1">
                      نشط
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{theme.name}</h3>
                    <Button size="sm" variant={theme.active ? "outline" : "default"} className={theme.active ? "opacity-50 cursor-not-allowed" : ""}>
                      {theme.active ? "نشط" : "تفعيل"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Page Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pages List */}
        <Card className="border">
          <CardHeader>
            <CardTitle>صفحات المتجر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pages.map((page) => (
                <div 
                  key={page.id} 
                  className="p-3 border rounded-md flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                >
                  <span>{page.name}</span>
                  <div className="flex space-x-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <SquarePen className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-3">
                <Image className="w-4 h-4 mr-2" />
                إضافة صفحة جديدة
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Page Editor Preview */}
        <Card className="border lg:col-span-2">
          <CardHeader>
            <CardTitle>محرر الصفحات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 min-h-[500px] rounded-md border border-dashed border-gray-300 flex items-center justify-center flex-col p-6">
              <Layout className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800">اختر صفحة للتعديل</h3>
              <p className="text-gray-500 text-center mt-2">
                اختر صفحة من القائمة للبدء في تخصيصها<br />
                أو قم بإضافة صفحة جديدة
              </p>
              <Button className="mt-4 bg-[#F97415] hover:bg-[#F97415]/90">
                <SquarePen className="w-4 h-4 mr-2" />
                ابدأ التعديل
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreCustomization;
