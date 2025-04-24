
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoreBlock } from "@/hooks/useStoreCustomization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBlockTypeName } from "@/utils/blockHelpers";

interface BlockEditorProps {
  block: StoreBlock;
  onContentUpdate: (content: Record<string, any>) => void;
}

export function BlockEditor({ block, onContentUpdate }: BlockEditorProps) {
  const handleInputChange = (
    key: string,
    value: any
  ) => {
    onContentUpdate({
      ...block.content,
      [key]: value,
    });
  };

  const renderEditor = () => {
    switch (block.block_type) {
      case "hero":
        return renderHeroEditor();
      case "productGrid":
        return renderProductGridEditor();
      case "testimonials":
        return renderTestimonialsEditor();
      case "categoryBanner":
        return renderCategoryBannerEditor();
      case "newsletter":
        return renderNewsletterEditor();
      case "customHtml":
        return renderCustomHtmlEditor();
      case "video":
        return renderVideoEditor();
      case "instagram":
        return renderInstagramEditor();
      default:
        return <div>لا يوجد محرر لهذا النوع من العناصر.</div>;
    }
  };

  const renderHeroEditor = () => {
    const content = block.content;
    return (
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="heroTitle">العنوان</Label>
          <Input
            id="heroTitle"
            value={content.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="heroSubtitle">العنوان الفرعي</Label>
          <Input
            id="heroSubtitle"
            value={content.subtitle || ""}
            onChange={(e) => handleInputChange("subtitle", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="heroImageUrl">رابط الصورة</Label>
          <Input
            id="heroImageUrl"
            value={content.imageUrl || ""}
            onChange={(e) => handleInputChange("imageUrl", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="heroButtonText">نص الزر</Label>
            <Input
              id="heroButtonText"
              value={content.buttonText || ""}
              onChange={(e) => handleInputChange("buttonText", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="heroButtonLink">رابط الزر</Label>
            <Input
              id="heroButtonLink"
              value={content.buttonLink || ""}
              onChange={(e) => handleInputChange("buttonLink", e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderProductGridEditor = () => {
    const content = block.content;
    return (
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="productGridTitle">العنوان</Label>
          <Input
            id="productGridTitle"
            value={content.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="productCount">عدد المنتجات</Label>
          <Input
            id="productCount"
            type="number"
            min="1"
            max="12"
            value={content.productCount || 4}
            onChange={(e) => handleInputChange("productCount", parseInt(e.target.value) || 4)}
          />
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          <Switch
            id="showPrices"
            checked={content.showPrices || false}
            onCheckedChange={(checked) => handleInputChange("showPrices", checked)}
          />
          <Label htmlFor="showPrices">إظهار الأسعار</Label>
        </div>
      </div>
    );
  };

  const renderTestimonialsEditor = () => {
    const content = block.content;
    const testimonials = content.testimonials || [];

    return (
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="testimonialsTitle">العنوان</Label>
          <Input
            id="testimonialsTitle"
            value={content.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-3">آراء العملاء</h3>
          <div className="space-y-4">
            {testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="grid gap-2 mb-2">
                  <Label htmlFor={`testimonialName${index}`}>اسم العميل</Label>
                  <Input
                    id={`testimonialName${index}`}
                    value={testimonial.name || ""}
                    onChange={(e) => {
                      const newTestimonials = [...testimonials];
                      newTestimonials[index].name = e.target.value;
                      handleInputChange("testimonials", newTestimonials);
                    }}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`testimonialText${index}`}>النص</Label>
                  <Textarea
                    id={`testimonialText${index}`}
                    value={testimonial.text || ""}
                    onChange={(e) => {
                      const newTestimonials = [...testimonials];
                      newTestimonials[index].text = e.target.value;
                      handleInputChange("testimonials", newTestimonials);
                    }}
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() => {
                const newTestimonials = [
                  ...testimonials,
                  { name: "عميل جديد", text: "رأي العميل هنا" }
                ];
                handleInputChange("testimonials", newTestimonials);
              }}
            >
              + إضافة رأي جديد
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderCategoryBannerEditor = () => {
    const content = block.content;
    const categories = content.categories || [];

    return (
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="categoryBannerTitle">العنوان</Label>
          <Input
            id="categoryBannerTitle"
            value={content.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-3">الفئات</h3>
          <div className="space-y-4">
            {categories.map((category: any, index: number) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="grid gap-2 mb-2">
                  <Label htmlFor={`categoryName${index}`}>اسم الفئة</Label>
                  <Input
                    id={`categoryName${index}`}
                    value={category.name || ""}
                    onChange={(e) => {
                      const newCategories = [...categories];
                      newCategories[index].name = e.target.value;
                      handleInputChange("categories", newCategories);
                    }}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`categoryImage${index}`}>رابط الصورة</Label>
                  <Input
                    id={`categoryImage${index}`}
                    value={category.imageUrl || ""}
                    onChange={(e) => {
                      const newCategories = [...categories];
                      newCategories[index].imageUrl = e.target.value;
                      handleInputChange("categories", newCategories);
                    }}
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() => {
                const newCategories = [
                  ...categories,
                  { name: "فئة جديدة", imageUrl: "https://placehold.co/400x300" }
                ];
                handleInputChange("categories", newCategories);
              }}
            >
              + إضافة فئة جديدة
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsletterEditor = () => {
    const content = block.content;
    return (
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="newsletterTitle">العنوان</Label>
          <Input
            id="newsletterTitle"
            value={content.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="newsletterSubtitle">العنوان الفرعي</Label>
          <Input
            id="newsletterSubtitle"
            value={content.subtitle || ""}
            onChange={(e) => handleInputChange("subtitle", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="newsletterButtonText">نص الزر</Label>
          <Input
            id="newsletterButtonText"
            value={content.buttonText || ""}
            onChange={(e) => handleInputChange("buttonText", e.target.value)}
          />
        </div>
      </div>
    );
  };

  const renderCustomHtmlEditor = () => {
    const content = block.content;
    return (
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="customHtml">HTML مخصص</Label>
          <Textarea
            id="customHtml"
            className="min-h-[200px] font-mono"
            value={content.html || ""}
            onChange={(e) => handleInputChange("html", e.target.value)}
          />
        </div>
      </div>
    );
  };

  const renderVideoEditor = () => {
    const content = block.content;
    return (
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="videoTitle">العنوان</Label>
          <Input
            id="videoTitle"
            value={content.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="videoUrl">رابط الفيديو (YouTube Embed URL)</Label>
          <Input
            id="videoUrl"
            value={content.videoUrl || ""}
            onChange={(e) => handleInputChange("videoUrl", e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          <Switch
            id="autoplay"
            checked={content.autoplay || false}
            onCheckedChange={(checked) => handleInputChange("autoplay", checked)}
          />
          <Label htmlFor="autoplay">تشغيل تلقائي</Label>
        </div>
      </div>
    );
  };

  const renderInstagramEditor = () => {
    const content = block.content;
    return (
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="instagramTitle">العنوان</Label>
          <Input
            id="instagramTitle"
            value={content.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="instagramUsername">اسم المستخدم</Label>
          <Input
            id="instagramUsername"
            value={content.username || ""}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="instagramPostCount">عدد المنشورات</Label>
          <Input
            id="instagramPostCount"
            type="number"
            min="1"
            max="12"
            value={content.postCount || 6}
            onChange={(e) => handleInputChange("postCount", parseInt(e.target.value) || 6)}
          />
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>تعديل العنصر: {getBlockTypeName(block.block_type)}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content">
          <TabsList className="mb-4">
            <TabsTrigger value="content">المحتوى</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            {renderEditor()}
          </TabsContent>
          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">تفعيل العنصر</Label>
                <Switch
                  id="isActive"
                  checked={block.is_active}
                  onCheckedChange={(checked) => {
                    // This requires additional handling in the parent component
                    // as is_active is at the block level, not in content
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6 space-x-2 space-x-reverse">
          <Button variant="outline" onClick={() => {
            // Reset to default content
            const defaultContent = getDefaultContentForBlock(block.block_type);
            onContentUpdate(defaultContent);
          }}>
            إعادة ضبط
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to get default content for a block type
function getDefaultContentForBlock(blockType: string): Record<string, any> {
  switch (blockType) {
    case "hero":
      return {
        title: "أهلاً بك في متجرنا",
        subtitle: "اكتشف منتجاتنا الرائعة",
        buttonText: "تسوق الآن",
        buttonLink: "#",
        imageUrl: "https://placehold.co/1200x600",
        alignment: "center"
      };
    case "productGrid":
      return {
        title: "منتجاتنا المميزة",
        productCount: 4,
        showPrices: true
      };
    case "testimonials":
      return {
        title: "آراء العملاء",
        testimonials: [
          { name: "أحمد محمد", text: "منتجات رائعة وخدمة ممتازة!" },
          { name: "سارة أحمد", text: "سرعة في التوصيل وجودة عالية للمنتجات." }
        ]
      };
    case "categoryBanner":
      return {
        title: "تسوق حسب الفئة",
        categories: [
          { name: "الإلكترونيات", imageUrl: "https://placehold.co/400x300" },
          { name: "الملابس", imageUrl: "https://placehold.co/400x300" }
        ]
      };
    case "newsletter":
      return {
        title: "اشترك في نشرتنا البريدية",
        subtitle: "احصل على آخر العروض والأخبار",
        buttonText: "اشتراك"
      };
    case "customHtml":
      return {
        html: "<div><h2>عنوان مخصص</h2><p>هذا نص تجريبي يمكن تعديله.</p></div>"
      };
    case "video":
      return {
        title: "شاهد الفيديو",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        autoplay: false
      };
    case "instagram":
      return {
        title: "تابعنا على انستاغرام",
        username: "@yourstore",
        postCount: 6
      };
    default:
      return {};
  }
}
