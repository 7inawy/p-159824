import React from "react";

interface StepProps {
  number: string;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
    <div className="flex min-w-60 min-h-[110px] items-center gap-8 flex-wrap flex-1 shrink basis-[0%] max-md:max-w-full">
      <div className="self-stretch flex min-w-60 h-[49px] items-center gap-4 w-[523px] my-auto max-md:max-w-full">
        <div className="self-stretch flex min-w-60 w-[523px] flex-col items-stretch justify-center my-auto max-md:max-w-full">
          <div className="flex w-full text-[28px] text-[#070812] font-semibold leading-none max-md:max-w-full">
            <div className="flex w-[196px] flex-col items-stretch">
              <h3 className="z-10">{title}</h3>
              <div className="bg-[rgba(255,220,96,1)] flex shrink-0 h-3.5" />
            </div>
          </div>
          <p className="text-[#999] text-lg font-medium leading-[21px] mt-4 max-md:max-w-full">
            {description}
          </p>
        </div>
      </div>
      <div className="self-stretch gap-2.5 text-5xl text-[#A5A5A5] font-semibold whitespace-nowrap leading-none my-auto max-md:text-[40px]">
        {number}
      </div>
    </div>
  );
};

const Steps: React.FC = () => {
  const stepsDescription =
    "ابدأ رحلتك في التجارة أونلاين معانا بسجّل بياناتك المطلوبة لإنشاء حساب على منصّة بناء المتاجر بتاعتنا.";

  return (
    <section
      id="steps"
      className="z-10 flex min-h-[690px] flex-col overflow-hidden items-center text-right justify-center max-md:max-w-full"
    >
      <div className="flex min-h-[690px] w-full max-w-[1920px] flex-col overflow-hidden items-center justify-center py-[148px] max-md:max-w-full max-md:py-[100px]">
        <div className="flex w-full flex-col items-center leading-none">
          <div className="flex w-[1152px] max-w-full flex-col items-center">
            <div className="w-[1128px] max-w-full text-[50px] text-[#070812] font-black py-0.5 max-md:text-[40px]">
              <h2 className="z-10 max-md:max-w-full max-md:text-[40px]">
                كل اللي محتاجه 4 خطوات بس و متجرك يبقى شغّال!
              </h2>
              <div className="bg-[rgba(255,220,96,1)] flex shrink-0 h-[13px] max-md:max-w-full" />
            </div>
            <p className="text-[#999] text-xl font-medium mt-4 max-md:max-w-full">
              منصة من غير كود، تقدر تبدأ بيها متجرك أونلاين بكل سهولة.
            </p>
          </div>
        </div>

        <div className="flex w-[1530px] max-w-full items-center gap-[40px_104px] mt-[63px] max-md:mt-10">
          <div className="self-stretch min-w-60 w-[1620px] my-auto max-md:max-w-full">
            <div className="flex w-full gap-[40px_46px] flex-wrap max-md:max-w-full">
              <Step
                number="03"
                title="ضيف منتجاتك"
                description={stepsDescription}
              />
              <Step
                number="01"
                title="أنشئ حسابك"
                description={stepsDescription}
              />
            </div>

            <div className="flex w-full gap-[40px_46px] flex-wrap mt-6 max-md:max-w-full">
              <Step
                number="04"
                title="فعّل الدفع والتوصيل"
                description={stepsDescription}
              />
              <Step
                number="02"
                title="اختر شكل متجرك"
                description={stepsDescription}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
