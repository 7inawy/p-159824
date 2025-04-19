import React from "react";

interface PricingFeatureProps {
  text: string;
  included: boolean;
}

const PricingFeature: React.FC<PricingFeatureProps> = ({ text, included }) => {
  return (
    <div className="flex items-center gap-2.5 justify-center mt-[11px] p-2.5">
      <div className="text-black text-2xl font-semibold text-right self-stretch w-[172px] my-auto">
        {text}
      </div>
      <div className="self-stretch flex items-center gap-2.5 w-[45px] my-auto p-2.5">
        <div className="self-stretch w-[25px] my-auto">
          <img
            src={included ? "https://cdn.builder.io/api/v1/image/assets/TEMP/0f81a0eb375a95aa42489baba2dbed35b1a2ef09?placeholderIfAbsent=true" : "https://cdn.builder.io/api/v1/image/assets/TEMP/0554887b08d925cd79208cd260a358364311f7ba?placeholderIfAbsent=true"}
            alt={included ? "Included" : "Not included"}
            className="aspect-[1] object-contain w-full"
          />
        </div>
      </div>
    </div>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: Array<{
    text: string;
    included: boolean;
  }>;
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  isPopular = false,
}) => {
  return (
    <div className="justify-center items-center bg-white self-stretch flex min-w-60 min-h-[747px] flex-col grow shrink w-[421px] my-auto rounded-2xl max-md:max-w-full relative">
      <div className="flex w-[480px] max-w-full flex-col items-stretch justify-center">
        <div className="bg-[rgba(251,251,251,1)] flex w-full flex-col items-stretch p-[15px] rounded-[13px] max-md:max-w-full">
          <div className="flex w-full flex-col items-stretch text-[32px] text-[#333] font-black text-center leading-[72px] max-md:max-w-full">
            <div className="self-center flex w-[106px] max-w-full flex-col items-stretch whitespace-nowrap pb-7">
              <div className="self-center z-10">{title}</div>
              <div className="bg-[rgba(255,220,96,1)] flex shrink-0 h-[13px]" />
            </div>
            <div className="max-md:max-w-full">{price}</div>
          </div>

          <p className="text-[#767676] text-right text-lg font-medium leading-[26px] mt-8 max-md:max-w-full">
            {description}
          </p>

          <button className="justify-center items-center bg-[#F97415] self-center flex min-h-14 w-[234px] max-w-full flex-col overflow-hidden text-base text-white font-bold mt-8 p-5 rounded-[255.923px] border-[1.024px] border-solid border-[#EDEDED]">
            <div className="flex items-center gap-1.5">
              <span className="self-stretch gap-[9px] my-auto">اشترك الان</span>
            </div>
          </button>
        </div>

        <div className="border min-h-px w-full mt-4 border-[rgba(255,255,255,0.3)] border-solid max-md:max-w-full" />

        <div className="flex w-full flex-col items-stretch justify-center mt-4 p-2.5 max-md:max-w-full">
          <div className="flex w-full flex-col justify-center max-md:max-w-full">
            {features.map((feature, index) => (
              <PricingFeature
                key={index}
                text={feature.text}
                included={feature.included}
              />
            ))}
          </div>
        </div>
      </div>

      {isPopular && (
        <div className="self-stretch absolute z-0 min-h-9 w-[153px] max-w-full gap-2.5 text-[15px] text-[#EA5823] font-black text-right h-9 px-[22px] py-[11px] rounded-[0px_16px_0px_16px] right-[23px] top-[42px] max-md:px-5">
          الباقة الأكثر طلباً
        </div>
      )}
    </div>
  );
};

export default PricingCard;
