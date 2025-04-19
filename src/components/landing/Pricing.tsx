import React, { useState } from "react";
import PricingCard from "@/components/ui/pricing-card";

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const features = [
    { text: "دروس أساسية", included: true },
    { text: "دعم فني محدود", included: true },
    { text: "دعم فني محدود", included: false },
    { text: "أنشطة تفاعلية", included: false },
  ];

  const description =
    "يقدم محتوى أساسي لتطوير المهارات الشخصية والاجتماعية للمدارس التي تبدأ في تعليم المهارات الناعمة.";

  return (
    <section
      id="pricing"
      className="bg-[rgba(249,116,21,0.03)] flex min-h-[1037px] flex-col overflow-hidden items-center justify-center mt-[46px] pb-[60px] px-[147px] max-md:max-w-full max-md:mr-[3px] max-md:mt-10 max-md:px-5"
    >
      <div className="flex w-full max-w-[1620px] flex-col items-stretch max-md:max-w-full">
        <div className="self-center flex w-full max-w-[1616px] flex-col items-stretch text-center max-md:max-w-full">
          <div className="flex h-20 w-full flex-col items-center text-[50px] text-[#333] font-black leading-[94px] max-md:max-w-full max-md:text-[40px] max-md:leading-[84px]">
            <h2 className="w-[352px] max-w-full px-[29px] max-md:text-[40px] max-md:leading-[84px] max-md:px-5">
              خطط الاسعار
            </h2>
          </div>

          <div className="self-center flex min-h-[41px] w-[159px] max-w-full text-sm font-normal whitespace-nowrap mt-4 p-[5px]">
            <button
              className={`self-stretch min-h-8 gap-[13px] px-[13px] py-[9px] rounded-[91.576px] ${
                billingPeriod === "monthly"
                  ? "bg-[#F97415] text-white"
                  : "text-black"
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              شهريا
            </button>
            <button
              className={`gap-[13px] pl-3 pr-[13px] py-[7px] rounded-[92px] ${
                billingPeriod === "yearly"
                  ? "bg-[#F97415] text-white"
                  : "text-black"
              }`}
              onClick={() => setBillingPeriod("yearly")}
            >
              سنويا
            </button>
          </div>
        </div>

        <div className="flex w-full items-center gap-5 flex-wrap mt-[50px] max-md:max-w-full max-md:mt-10">
          <PricingCard
            title="مبتدأ"
            price="700 جنيها"
            description={description}
            features={features}
          />

          <PricingCard
            title="مبتدأ"
            price="700 جنيها"
            description={description}
            features={features}
          />

          <PricingCard
            title="مبتدأ"
            price="700 جنيها"
            description={description}
            features={features}
            isPopular={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
