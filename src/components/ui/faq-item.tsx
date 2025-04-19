import React, { useState } from "react";

interface FAQItemProps {
  number: string;
  question: string;
  answer?: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ number, question, answer }) => {
  const [isOpen, setIsOpen] = useState(number === "01");

  return (
    <div className="bg-[#F8F8F8] flex w-full gap-8 flex-wrap mt-8 p-10 rounded-[20px] max-md:max-w-full max-md:px-5 first:mt-0">
      {isOpen ? (
        <div className="flex min-w-60 flex-col items-stretch flex-1 shrink basis-[0%] pt-[3px] max-md:max-w-full">
          <div className="flex w-full gap-4 flex-wrap max-md:max-w-full">
            <div className="rotate-[-3.1415925661670165rad] flex gap-2.5 grow shrink w-[38px]">
              <button
                className="bg-[rgba(238,238,238,1)] flex min-h-12 w-12 items-center gap-2.5 overflow-hidden justify-center h-12 rounded-3xl"
                onClick={() => setIsOpen(false)}
              >
                <div className="rotate-[1.570796370506285rad] self-stretch flex w-6 items-center gap-0.5 my-auto">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c646245be52a4b58a8ee699b715937683bbc1cc?placeholderIfAbsent=true"
                    alt="Collapse"
                    className="aspect-[1] object-contain w-6 self-stretch my-auto"
                  />
                </div>
              </button>
            </div>
            <div className="flex min-w-60 flex-col text-[28px] text-[#333] font-semibold text-right leading-none grow shrink w-[1380px] pl-20 py-px max-md:max-w-full">
              <h3 className="z-10 max-md:max-w-full">{question}</h3>
              <div className="bg-[rgba(255,220,96,1)] flex w-[687px] shrink-0 max-w-full h-[13px]" />
            </div>
          </div>
          <p className="w-[1198px] max-w-full text-lg text-[#767676] font-medium text-right leading-[48px] mt-6 max-md:max-w-full">
            {answer ||
              "منصتنا تقدم برامج تعليمية تركز على تطوير المهارات الشخصية والاجتماعية للأطفال. نستخدم طرقًا مبتكرة لتعليم المهارات الناعمة التي تساعد الأطفال على النجاح في الحياة الدراسية والمهنية."}
          </p>
        </div>
      ) : (
        <div className="flex min-w-60 items-center gap-4 flex-wrap h-full flex-1 shrink basis-[0%] max-md:max-w-full">
          <div className="self-stretch flex gap-2.5 w-12 my-auto">
            <button
              className="justify-center items-center bg-[#EEE] flex min-h-12 w-12 gap-2.5 overflow-hidden h-12 rounded-3xl"
              onClick={() => setIsOpen(true)}
            >
              <div className="rotate-[1.570796370506285rad] self-stretch flex w-6 items-center gap-0.5 my-auto">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9a8fc419010f7c112c2032fedead145fccb8c0e?placeholderIfAbsent=true"
                  alt="Expand"
                  className="aspect-[0.96] object-contain w-6 self-stretch my-auto"
                />
              </div>
            </button>
          </div>
          <div className="self-stretch flex min-w-60 text-[28px] text-[#333] font-semibold text-right leading-none flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
            <div className="min-w-60 w-full py-px">
              <h3 className="z-10">{question}</h3>
              <div className="bg-[rgba(255,220,96,1)] flex shrink-0 h-[13px]" />
            </div>
          </div>
        </div>
      )}

      <div className="gap-2.5 text-5xl text-[#A5A5A5] font-semibold whitespace-nowrap text-right leading-none max-md:text-[40px]">
        {number}
      </div>
    </div>
  );
};

export default FAQItem;
