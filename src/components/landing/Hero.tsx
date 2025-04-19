import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="w-full mt-[120px] max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[76%] max-md:w-full max-md:ml-0">
          <div className="grow max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              <div className="w-[38%] max-md:w-full max-md:ml-0">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e102eeb77ae1600f9bad8b253ce4d418ddd151c?placeholderIfAbsent=true"
                  alt="Hero illustration"
                  className="aspect-[0.81] object-contain w-full grow max-md:max-w-full"
                />
              </div>
              <div className="w-[62%] ml-5 max-md:w-full max-md:ml-0">
                <h1 className="text-[#333] text-center text-6xl font-black leading-[94px] mt-[17px] max-md:max-w-full max-md:text-[40px] max-md:leading-[70px]">
                  من غير مصاريف كتير ولا تعقيد… ابني متجرك الإلكتروني على مزاجك!
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[24%] ml-5 max-md:w-full max-md:ml-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/00c5df4d5f793ffaf9e9ae0b2747165b849a7d9e?placeholderIfAbsent=true"
            alt="Hero decoration"
            className="aspect-[0.6] object-contain w-[442px] shrink-0 max-w-full grow max-md:mt-10"
          />
        </div>
      </div>

      <div className="flex min-h-[104px] flex-col overflow-hidden items-center justify-center mt-2 px-[77px] py-[26px] max-md:max-w-full max-md:px-5">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <img
            key={index}
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d306e011238812e3b26a48f6ea882666152d1ff?placeholderIfAbsent=true"
            alt="Partner logo"
            className="aspect-[3.39] object-contain w-44 max-w-full mt-2.5 first:mt-0"
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
