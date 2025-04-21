
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <header className="justify-center items-center bg-[#FEF1E8] flex w-full flex-col overflow-hidden text-base text-[#333] font-medium px-[70px] py-[39px] max-md:max-w-full max-md:px-5">
      <div className="flex w-full justify-between items-center">
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
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-[#F97415] text-[#F97415] hover:bg-[#F97415] hover:text-white"
            onClick={() => navigate("/auth")}
          >
            تسجيل الدخول
          </Button>
          <Button 
            className="bg-[#F97415] hover:bg-[#F97415]/90"
            onClick={() => navigate("/auth")}
          >
            إنشاء متجر
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
