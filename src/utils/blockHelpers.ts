
export function getBlockTypeName(blockType: string): string {
  const blockTypes: Record<string, string> = {
    hero: "قسم الدعوة للعمل (Hero)",
    productGrid: "شبكة المنتجات",
    testimonials: "آراء العملاء",
    categoryBanner: "بانر الفئات",
    newsletter: "النشرة البريدية",
    customHtml: "HTML مخصص",
    video: "فيديو",
    instagram: "انستاغرام"
  };

  return blockTypes[blockType] || blockType;
}

export function getDefaultContentForBlockType(blockType: string): Record<string, any> {
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
