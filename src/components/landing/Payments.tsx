import React from "react";

interface PaymentFeatureProps {
  text: string;
}

const PaymentFeature: React.FC<PaymentFeatureProps> = ({ text }) => {
  return (
    <div className="flex w-full max-w-[813px] items-center gap-2.5 justify-center flex-wrap mt-4 p-2.5 max-md:max-w-full">
      <p className="text-[#767676] text-right text-2xl font-medium leading-9 self-stretch w-[704px] my-auto max-md:max-w-full">
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

const Payments: React.FC = () => {
  const features = [
    "فيزا، ماستركارد، فودافون كاش، والدفع عند الاستلام – خيّرات كتير تناسب كل عميل.",
    "كل عملية دفع محمية بأحدث تقنيات الأمان.",
    "فلوسك توصلك أسرع من أي وقت، و��قدر تتابع كل العمليات من لوحة التحكم.",
  ];

  return (
    <section
      id="payments"
      className="flex min-h-[690px] w-full flex-col overflow-hidden items-center justify-center px-[147px] py-[85px] max-md:max-w-full max-md:mr-1 max-md:px-5"
    >
      <div className="flex w-full max-w-[1620px] gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d08ae9248f707b10453e9e9b7b7e52628e51780?placeholderIfAbsent=true"
          alt="Payments illustration"
          className="aspect-[1.33] object-contain w-[693px] min-w-60 max-md:max-w-full"
        />

        <div className="flex min-w-60 min-h-[520px] items-center justify-between w-[813px] max-md:max-w-full">
          <div className="self-stretch flex min-w-60 w-[813px] flex-col my-auto max-md:max-w-full">
            <div className="w-[653px] max-w-full text-[50px] text-[#333] font-black text-center leading-[94px] pb-[23px] px-1 max-md:text-[40px] max-md:leading-[84px]">
              <h2 className="z-10 max-md:max-w-full max-md:text-[40px] max-md:leading-[84px]">
                المدفوعات؟ أسهل مما تتخيل!
              </h2>
              <div className="bg-[rgba(255,220,96,1)] flex w-[612px] shrink-0 max-w-full h-[13px] ml-[15px] mr-[19px] -mt-9 max-md:mr-2.5" />
            </div>

            <p className="self-stretch text-[#767676] text-right text-lg font-medium leading-6 mt-4 max-md:max-w-full">
              فعّل الدفع على متجرك في دقايق واستقبل فلوسك بأمان وسرعة. إحنا
              موفّرين لك كل الطرق اللي عملاءك بيفضّلوها.
            </p>

            {features.map((feature, index) => (
              <PaymentFeature key={index} text={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payments;
