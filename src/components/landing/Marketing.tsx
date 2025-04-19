import React from "react";

interface FeatureItemProps {
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => {
  return (
    <div className="flex w-full max-w-[813px] items-center gap-2.5 justify-center flex-wrap mt-4 p-2.5 max-md:max-w-full">
      <p className="text-[#767676] text-right text-2xl font-normal leading-9 self-stretch w-[704px] my-auto max-md:max-w-full">
        {text}
      </p>
      <div className="self-stretch flex min-h-[62px] items-center gap-2.5 w-[62px] my-auto pl-2.5 pr-1 py-[7px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f78da95f9c8a464b31954dfb71e9c2e08bf0eac?placeholderIfAbsent=true"
          alt="Check icon"
          className="aspect-[1] object-contain w-12 self-stretch my-auto"
        />
      </div>
    </div>
  );
};

const Marketing: React.FC = () => {
  return (
    <section
      id="marketing"
      className="flex min-h-[690px] w-full flex-col overflow-hidden items-center justify-center mt-[7px] px-[150px] py-[90px] max-md:max-w-full max-md:px-5"
    >
      <div className="flex max-w-full w-[1612px] items-center gap-[40px_100px] justify-between flex-wrap">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dd4a2dcf795d293f6cd31e372f7d825e74bea0d?placeholderIfAbsent=true"
          alt="Marketing illustration"
          className="aspect-[1.32] object-contain w-[672px] self-stretch min-w-60 my-auto max-md:max-w-full"
        />

        <div className="self-stretch flex min-w-60 min-h-[482px] flex-col justify-between w-[751px] my-auto max-md:max-w-full">
          <div className="max-w-full w-[766px] text-[50px] text-[#333] font-black text-center leading-[94px] pl-[5px] pb-[23px] max-md:text-[40px] max-md:leading-[84px]">
            <h2 className="z-10 max-md:max-w-full max-md:text-[40px] max-md:leading-[84px] max-md:mr-[7px]">
              حلول تسويقية تساعدك تكبر أسرع
            </h2>
            <div className="bg-[rgba(255,220,96,1)] flex shrink-0 h-[13px] max-md:max-w-full" />
          </div>

          <p className="self-stretch text-[#767676] text-right text-lg font-medium leading-6 mt-4 max-md:max-w-full">
            احنا مش بس بنساعدك تفتح متجرك، إحنا كمان بنديّك أدوات تسويقية قوية
            توصلك لعملاء أكتر وتزود مبيعاتك بسهولة.
          </p>

          {[1, 2, 3].map((index) => (
            <FeatureItem
              key={index}
              text="ربط بالسوشيال ميديا وصّل متجرك بفيسبوك وإنستجرام واعرض منتجاتك بسهولة على كل المنصات."
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marketing;
