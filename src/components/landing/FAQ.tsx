import React from "react";
import FAQItem from "@/components/ui/faq-item";

const FAQ: React.FC = () => {
  const faqs = [
    {
      number: "01",
      question: "1. هل لازم يكون عندي خبرة تقنية علشان أستخدم المنصة؟",
      answer:
        "منصتنا تقدم برامج تعليمية تركز على تطوير المهارات الشخصية والاجتماعية للأطفال. نستخدم طرقًا مبتكرة لتعليم المهارات الناعمة التي تساعد الأطفال على النجاح في الحياة الدراسية والمهنية.",
    },
    {
      number: "02",
      question: "2. هل فيه خطة مجانية؟",
    },
    {
      number: "03",
      question: "3. إزاي أستلم الفلوس من المبيعات؟",
    },
    {
      number: "04",
      question: "4. هل أقدر أربط المتجر مع شركات شحن؟",
    },
    {
      number: "05",
      question: "5. هل فيه دعم فني لو واجهت مشكلة؟",
    },
  ];

  return (
    <section
      id="faq"
      className="flex flex-col overflow-hidden justify-center mt-[7px] px-[150px] py-16 max-md:max-w-full max-md:px-5"
    >
      <div className="flex w-full max-w-[1619px] flex-col items-stretch max-md:max-w-full">
        <h2 className="w-[455px] max-w-full text-[50px] text-[#333] font-black text-center leading-[94px] max-md:max-w-full max-md:text-[40px] max-md:leading-[84px]">
          اسئلة قابلناها كتير...
        </h2>

        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            number={faq.number}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
