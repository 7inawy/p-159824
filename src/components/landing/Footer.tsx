import React from "react";
import { Facebook, Youtube, Instagram, MessageCircle } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[rgba(52,73,85,1)] flex min-h-[433px] w-full flex-col overflow-hidden items-center justify-center mt-[22px] px-[150px] py-[63px] max-md:max-w-full max-md:px-5">
      <div className="relative flex max-w-full w-[1618px] flex-col items-center">
        <div className="z-0 flex w-[813px] max-w-full flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center">
            <h2 className="w-full text-[50px] text-white font-black text-center leading-[94px] px-[70px] rounded-[0px_0px_0px_0px] max-md:max-w-full max-md:text-[40px] max-md:leading-[84px] max-md:px-5">
              ابدأ متجرك أونلاين بكل سهولة
            </h2>
            <p className="text-[#EBEDEE] text-right text-lg font-medium leading-none mt-4 max-md:max-w-full">
              منصة بسيطة وسريعة علشان تطلق مشروعك وتوصل لعملاءك في كل مكان.
            </p>
          </div>

          <button className="justify-center items-center bg-[#F97415] flex min-h-14 w-[228px] max-w-full flex-col overflow-hidden text-base text-white font-bold mt-4 p-5 rounded-[255.923px] border-[1.024px] border-solid border-[#EDEDED]">
            <div className="flex items-center gap-1.5">
              <span className="self-stretch gap-[9px] my-auto">
                ابدأ تجربتك المجانية الان
              </span>
            </div>
          </button>
        </div>

        <div className="border z-0 min-h-px w-full mt-8 border-[rgba(240,240,240,0.1)] border-solid" />

        <div className="absolute z-0 min-h-[238px] w-[78px] overflow-hidden h-[238px] pt-[13px] pb-[30px] px-3.5 left-0 bottom-0">
          <div className="w-full">
            <div className="bg-[#EB6032] flex min-h-[50px] w-full h-[50px] rounded-[40px]" />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/10d863dbbbd513ca35a45deb6aa7e3e7bf5a0f33?placeholderIfAbsent=true"
              alt="Contact"
              className="aspect-[1] object-contain w-full mt-[23px] rounded-[40px]"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bcf38f1e3b028c9b797f301d16cb21e8553c4701?placeholderIfAbsent=true"
              alt="Contact"
              className="aspect-[1] object-contain w-full mt-[23px]"
            />
          </div>
        </div>
      </div>

      <p className="self-stretch text-lg text-[#EBEDEE] font-medium text-right leading-none mt-2.5">
        جميع الحقوق محفوظة - منصة رابح 2024
      </p>

      <div className="flex gap-4 mt-2.5">
        <a
          href="#"
          className="flex w-8 shrink-0 h-8 items-center justify-center text-white hover:text-[#F97415] transition-colors"
          aria-label="Facebook"
        >
          <Facebook size={20} />
        </a>
        <a
          href="#"
          className="flex w-8 shrink-0 h-8 items-center justify-center text-white hover:text-[#F97415] transition-colors"
          aria-label="YouTube"
        >
          <Youtube size={20} />
        </a>
        <a
          href="#"
          className="flex w-8 shrink-0 h-8 items-center justify-center text-white hover:text-[#F97415] transition-colors"
          aria-label="Snapchat"
        >
          <MessageCircle size={20} />
        </a>
        <a
          href="#"
          className="flex w-8 shrink-0 h-8 items-center justify-center text-white hover:text-[#F97415] transition-colors"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
