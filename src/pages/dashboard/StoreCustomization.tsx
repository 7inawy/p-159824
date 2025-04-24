
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Layers, Layout, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStoreCustomization } from "@/hooks/useStoreCustomization";
import { ThemeControls } from "@/components/store-customization/ThemeControls";
import { BlockManager } from "@/components/store-customization/BlockManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlockPreview } from "@/components/store-customization/BlockPreview";
import { toast } from "sonner";

const StoreCustomization: React.FC = () => {
  // For demo purposes, we're using a hardcoded store ID
  // In a real app, this would come from the authenticated user's context
  const storeId = "demo-store";
  const { 
    theme, 
    blocks, 
    isLoading, 
    updateTheme, 
    updateBlocks 
  } = useStoreCustomization(storeId);
  
  const [activeTab, setActiveTab] = useState("blocks");
  
  const handlePreviewStore = () => {
    // This would open the store in a new tab
    toast.info("هذه الميزة قيد التطوير");
  };

  const handlePublishChanges = () => {
    toast.success("تم نشر التغييرات بنجاح");
  };

  const handleUpdateBlocks = (updatedBlocks: any[]) => {
    updateBlocks.mutate(updatedBlocks);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F97415] mx-auto"></div>
          <p className="mt-4 text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Palette className="w-6 h-6 text-[#F97415] mr-2" />
          <h1 className="text-2xl font-bold">تخصيص المتجر</h1>
        </div>
        <div className="flex space-x-2 space-x-reverse">
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

      {/* Editor Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-card border">
          <TabsTrigger value="blocks" className="flex items-center">
            <Layout className="w-4 h-4 mr-2" />
            العناصر
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            التصميم
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center">
            <EyeIcon className="w-4 h-4 mr-2" />
            المعاينة
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="blocks" className="mt-6">
          {blocks && (
            <BlockManager 
              blocks={blocks} 
              onBlocksUpdate={handleUpdateBlocks} 
              isLoading={updateBlocks.isPending}
            />
          )}
        </TabsContent>
        
        <TabsContent value="theme" className="mt-6">
          {theme && (
            <ThemeControls
              theme={theme}
              onUpdate={updateTheme.mutate}
              isLoading={updateTheme.isPending}
            />
          )}
        </TabsContent>
        
        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>معاينة المتجر</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden rounded-b-lg">
              <div className="border-t p-4 bg-background">
                {blocks && theme && (
                  <div className="border rounded-lg overflow-hidden">
                    <BlockPreview blocks={blocks} theme={theme} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreCustomization;
