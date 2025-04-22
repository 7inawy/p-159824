
import React from "react";

const POS: React.FC = () => {
  return (
    <section id="pos" className="flex items-stretch flex-wrap mt-1.5">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7ba75b65825a1f8366da84bf6fde0ffbe42862b?placeholderIfAbsent=true"
        alt="Decoration"
        className="aspect-[0.28] object-contain w-[9px] z-10 shrink-0 mt-[153px] max-md:-mr-1.5 max-md:mt-10"
      />

      <div className="bg-[rgba(249,116,21,0.03)] flex min-h-[757px] w-fit flex-col overflow-hidden items-center justify-center grow shrink-0 basis-0 px-[150px] py-[108px] max-md:max-w-full max-md:px-5 max-md:py-[100px]">
        <div className="flex max-w-full w-[1612px] items-center gap-[40px_100px] justify-between flex-wrap">
          <div className="self-stretch min-w-60 min-h-[390px] w-[873px] my-auto max-md:max-w-full">
            <div className="flex w-full flex-col max-md:max-w-full">
              <div className="flex w-[852px] max-w-full flex-col items-center">
                <div className="w-full text-[50px] text-[#333] font-black text-center leading-[94px] pt-14 px-5 max-md:text-[40px] max-md:leading-[84px]">
                  <div className="bg-[rgba(255,220,96,1)] flex w-full shrink-0 h-[13px] max-md:mr-0.5" />
                  <h2 className="z-10 mt-[-189px] max-md:max-w-full max-md:text-[40px] max-md:leading-[84px]">
                    نقطة بيع (POS) ذكية تشتغل في أي وقت ومن أي مكان!
                  </h2>
                </div>

                <p className="text-[#767676] text-right text-lg font-medium leading-6 mt-4 max-md:max-w-full">
                  سواء بتبيع أونلاين أو في المحل، نظام الـPOS بتاعنا هيسهّل عليك
                  عمليات البيع، الحساب، وطباعة الفواتير في لحظتها – من غير
                  تعقيد!
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col items-stretch mt-[49px] max-md:max-w-full max-md:mt-10">
              <button className="justify-center items-center bg-[#F97415] flex min-h-14 w-[228px] max-w-full flex-col overflow-hidden text-base text-white font-bold p-5 rounded-[255.923px] border-[1.024px] border-solid border-[#EDEDED]">
                <div className="flex items-center gap-1.5">
                  <span className="self-stretch gap-[9px] my-auto">
                    ابدأ تجربتك المجانية الان
                  </span>
                </div>
              </button>

              <p className="text-[#767676] text-right text-sm font-medium mt-3 max-md:max-w-full">
                مجانا لمدة 7 ايام بدون بطاقو بنكية او مصاريف خفية
              </p>
            </div>
          </div>

          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a77b2361987220f65bb4348f67a76a63f7e0572?placeholderIfAbsent=true"
            alt="POS system illustration"
            className="aspect-[1.12] object-contain w-[605px] self-stretch min-w-60 my-auto max-md:max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default POS;
