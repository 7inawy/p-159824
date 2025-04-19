import React from "react";

interface DeliveryFeatureProps {
  text: string;
}

const DeliveryFeature: React.FC<DeliveryFeatureProps> = ({ text }) => {
  return (
    <div className="flex w-full max-w-[813px] items-center gap-2.5 justify-center flex-wrap mt-4 p-2.5 max-md:max-w-full">
      <p className="text-[#767676] text-right text-2xl font-medium self-stretch w-[704px] my-auto max-md:max-w-full">
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

const Delivery: React.FC = () => {
  const features = [
    "تقدر تختار من أكتر من شركة شحن حسب اللي يناسبك ويناسب عميلك.",
    "أنت وعميلك تقدروا تتابعوا حالة الطلب لحظة بلحظة.",
    "وفّر في تكلفة الشحن من غير ما تأثر على سرعة الخدمة.",
    "لو العميل رجّع منتج، تقدر تدير العملية كلها بسهولة من لوحة التحكم.",
  ];

  return (
    <section
      id="delivery"
      className="bg-[rgba(249,116,21,0.03)] flex min-h-[690px] w-full flex-col overflow-hidden items-center justify-center px-[150px] py-[70px] max-md:max-w-full max-md:px-5"
    >
      <div className="flex max-w-full w-[1614px] items-center gap-[40px_78px] justify-between flex-wrap">
        <div className="self-stretch flex min-w-60 flex-col w-[813px] my-auto max-md:max-w-full">
          <div className="w-[548px] max-w-full text-[50px] text-[#333] font-black text-center leading-[94px] pb-[23px] max-md:text-[40px] max-md:leading-[84px]">
            <h2 className="z-10 max-md:max-w-full max-md:text-[40px] max-md:leading-[84px] max-md:mr-[5px]">
              التوصيل؟ إحنا مغطّيينك!
            </h2>
            <div className="bg-[rgba(255,220,96,1)] flex shrink-0 h-[13px] max-md:max-w-full" />
          </div>

          <p className="self-stretch text-[#767676] text-right text-lg font-medium leading-6 mt-4 max-md:max-w-full">
            وصّل طلباتك لأي مكان في مصر بسهولة! من أول ما يطلب العميل، وإحنا
            بنتابع الشحنة لحد ما توصل لباب البيت.
          </p>

          {features.map((feature, index) => (
            <DeliveryFeature key={index} text={feature} />
          ))}
        </div>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d37b1cb6c3b8f6fa07ab99513ae44c882a47558?placeholderIfAbsent=true"
          alt="Delivery illustration"
          className="aspect-[1.52] object-contain w-[721px] self-stretch min-w-60 my-auto max-md:max-w-full"
        />
      </div>
    </section>
  );
};

export default Delivery;
