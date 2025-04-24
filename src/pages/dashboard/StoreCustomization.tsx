
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Layers, Layout, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStoreCustomization } from "@/hooks/useStoreCustomization";
import { ThemeControls } from "@/components/store-customization/ThemeControls";
import { toast } from "sonner";

const StoreCustomization: React.FC = () => {
  // For demo purposes, we're using a hardcoded store ID
  // In a real app, this would come from the authenticated user's context
  const storeId = "demo-store";
  const { theme, isLoading, updateTheme } = useStoreCustomization(storeId);

  const handlePreviewStore = () => {
    // This would open the store in a new tab
    toast.info("هذه الميزة قيد التطوير");
  };

  const handlePublishChanges = () => {
    toast.info("هذه الميزة قيد التطوير");
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Palette className="w-6 h-6 text-[#F97415] mr-2" />
          <h1 className="text-2xl font-bold">تخصيص المتجر</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreviewStore}>
            <EyeIcon className="w-4 h-4 mr-2" />
            معاينة المتجر
          </Button>
          <Button 
            className="bg-[#F97415] hover:bg-[#F97415]/90"
            onClick={handlePublishChanges}
          >
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
              <Palette className="w-4 h-4 mr-2" />
              الخطوط والألوان
            </Button>
            <Button variant="outline">
              <Layers className="w-4 h-4 mr-2" />
              الصفحات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Theme Controls */}
      {theme && (
        <ThemeControls
          theme={theme}
          onUpdate={updateTheme.mutate}
          isLoading={updateTheme.isPending}
        />
      )}
    </div>
  );
};

export default StoreCustomization;
