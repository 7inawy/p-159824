import React from "react";
import FeatureCard from "@/components/ui/feature-card";

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      id: 1,
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/961a5aafd27f084173a96d1dbae081b2de656406?placeholderIfAbsent=true",
      title: "حصة إيرادات تنافسية",
      description:
        "نقدم نماذج مشاركة أرباح تنافسية حسب اختيارك لطريقة إنتاج الفيديوهات.",
    },
    {
      id: 2,
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/882227a932504bfc9f0fb1fe18823cee660d3bc7?placeholderIfAbsent=true",
      title: "حصة إيرادات تنافسية",
      description:
        "نقدم نماذج مشاركة أرباح تنافسية حسب اختيارك لطريقة إنتاج الفيديوهات.",
    },
    {
      id: 3,
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/ee28ea0a177a5a4a8e909f56225e21dbaea718c5?placeholderIfAbsent=true",
      title: "حصة إيرادات تنافسية",
      description:
        "نقدم نماذج مشاركة أرباح تنافسية حسب اختيارك لطريقة إنتاج الفيديوهات.",
    },
    {
      id: 4,
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/bc3e2d44f2cd140d279baecc250ddda6f1d2e90d?placeholderIfAbsent=true",
      title: "حصة إيرادات تنافسية",
      description:
        "نقدم نماذج مشاركة أرباح تنافسية حسب اختيارك لطريقة إنتاج الفيديوهات.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="bg-[rgba(249,116,21,0.03)] flex min-h-[690px] flex-col overflow-hidden items-stretch justify-center mt-[26px] px-[150px] py-[81px] max-md:max-w-full max-md:px-5"
    >
      <div className="flex w-full flex-col items-stretch max-md:max-w-full">
        <div className="self-center flex w-[695px] max-w-full flex-col items-stretch text-right leading-none">
          <div className="self-center w-[382px] max-w-full text-[50px] text-[#333] font-black pb-[9px] max-md:text-[40px]">
            <h2 className="z-10 max-md:text-[40px] max-md:ml-[9px] max-md:mr-1.5">
              ليه تختار منصتنا؟
            </h2>
            <div className="bg-[rgba(255,220,96,1)] flex shrink-0 h-[13px]" />
          </div>
          <p className="text-[#767676] text-xl font-medium mt-4 max-md:max-w-full">
            منصة مصرية بتخليك تطلق متجرك الإلكتروني في دقائق، من غير ما تحتاج
            خبرة تقنية
          </p>
        </div>

        <div className="flex w-full items-center gap-[40px_98px] flex-wrap mt-[50px] max-md:max-w-full max-md:mt-10">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              imageUrl={feature.imageUrl}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
