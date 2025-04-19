import React from "react";

const Header: React.FC = () => {
  return (
    <header className="justify-center items-center bg-[#FEF1E8] flex w-full flex-col overflow-hidden text-base text-[#333] font-medium px-[70px] py-[39px] max-md:max-w-full max-md:px-5">
      <nav className="flex gap-[40px_45px] flex-wrap max-md:max-w-full">
        <a href="#faq" className="hover:text-[#F97415] transition-colors">
          اسئلة شائعة
        </a>
        <a href="#pricing" className="hover:text-[#F97415] transition-colors">
          خطط الاسعار
        </a>
        <a
          href="#testimonials"
          className="hover:text-[#F97415] transition-colors"
        >
          آراء عملائنا
        </a>
        <a href="#pos" className="hover:text-[#F97415] transition-colors">
          pos نقطة بيع
        </a>
        <a href="#payments" className="hover:text-[#F97415] transition-colors">
          المدفوعات
        </a>
        <a href="#delivery" className="hover:text-[#F97415] transition-colors">
          التوصيل
        </a>
        <a href="#marketing" className="hover:text-[#F97415] transition-colors">
          تسويق
        </a>
        <a href="#steps" className="hover:text-[#F97415] transition-colors">
          خطوات انشاء المتجر
        </a>
        <a
          href="#why-choose-us"
          className="hover:text-[#F97415] transition-colors"
        >
          لماذا تختارنا ؟
        </a>
        <a href="#partners" className="hover:text-[#F97415] transition-colors">
          الشركاء
        </a>
        <a href="#" className="text-[#F97415] text-lg font-black">
          الرئيسية
        </a>
      </nav>
    </header>
  );
};

export default Header;
