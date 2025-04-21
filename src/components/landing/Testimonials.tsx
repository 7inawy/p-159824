
import React from "react";
interface TestimonialProps {
  name?: string;
  role?: string;
  rating?: string;
  content: string;
  imageSrc: string;
}
const Testimonial: React.FC<TestimonialProps> = ({
  name = "احمد على",
  role = "Founder rebekia",
  rating = "https://cdn.builder.io/api/v1/image/assets/TEMP/b5201320344e64fb8ee00df6321b2a77da9c921e?placeholderIfAbsent=true",
  content,
  imageSrc
}) => {
  return (
    <div className="flex items-center gap-x-10 gap-y-12 w-full max-w-screen-xl mx-auto">
      <p className="text-[#999] text-right text-lg font-medium leading-[18px] self-stretch w-[479px] my-auto max-md:max-w-full">
        {content}
      </p>
      <div className="self-stretch min-w-60 text-black w-[575px] my-auto rounded-[0px_0px_0px_0px] max-md:max-w-full">
        <div className="flex flex-col relative min-h-[460px] w-full pr-20 pt-[146px] pb-[74px] rounded-[0px_0px_0px_0px] max-md:max-w-full max-md:pr-5 max-md:pt-[100px]">
          <img src={imageSrc} alt={name} className="absolute h-full w-full object-cover inset-0" />
          <div className="relative text-[27px] font-extrabold ml-[45px] max-md:ml-2.5">
            {name}
          </div>
          <div className="flex flex-col relative aspect-[1.321] w-[280px] max-w-full text-base font-normal pl-[21px] pr-14 pt-[9px] pb-[65px] max-md:px-5">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/630fbe2b42db2ac693212b56cb71c82f5830ea64?placeholderIfAbsent=true" alt="Background" className="absolute h-full w-full object-cover inset-0" />
            <div className="relative ml-6 max-md:ml-2.5">{role}</div>
            <img src={rating} alt="Rating" className="aspect-[6.02] object-contain w-[145px] max-w-full mt-[95px] max-md:mt-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonialContent = "لأننا مؤمنين إن مجتمعنا الطبي مليان مواهب، لم تُكتشف بعد.. قررنا إن أكاديميتنا تكسر الصندوق المجتمعي اللي اتحطينا فيه من زمان، وبمساعدة المتخصصين في مجالات الإرشاد المهني صممنا برامج معتمدة على الخلفية الطبية والمهارات والمواهب، هتأهلك تشتغل في مجالات موازية وكمان تدخلك دخل إضافي";
  return <section id="testimonials" className="flex min-h-[690px] flex-col overflow-hidden items-center justify-center mt-[15px] py-px max-md:max-w-full max-md:mr-[3px]">
      <div className="flex w-full max-w-[2263px] flex-col items-stretch max-md:max-w-full">
        <div className="self-center flex w-[813px] max-w-full flex-col items-stretch">
          <div className="flex w-[653px] max-w-full flex-col items-center text-[50px] text-[#333] font-black text-center leading-[94px] px-20 max-md:text-[40px] max-md:leading-[84px] max-md:px-5">
            <div className="flex w-[258px] max-w-full flex-col items-stretch pb-7 max-md:text-[40px] max-md:leading-[84px]">
              <h2 className="z-10 ml-4 max-md:text-[40px] max-md:leading-[84px] max-md:ml-2.5">
                آراء عملائنا
              </h2>
              <div className="bg-[rgba(255,220,96,1)] flex shrink-0 h-[13px]" />
            </div>
          </div>

          <p className="text-[#767676] text-right text-lg font-medium leading-6 mt-4 max-md:max-w-full">
            اسمع تجارب حقيقية من ناس بدأت تبيع أونلاين معانا وحققوا نجاحات
            كبيرة! رأيهم هو أكبر دليل على فرق منصتنا.
          </p>
        </div>

        <div className="flex w-full items-center gap-[40px_55px] flex-wrap mt-[70px] max-md:max-w-full max-md:mt-10">
          <Testimonial content={testimonialContent} imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/60f5d041853865d6212ce823330c4d9794cba645?placeholderIfAbsent=true" />

          <div className="self-stretch flex min-w-60 items-center gap-[40px_50px] flex-wrap my-auto max-md:max-w-full">
            <p className="text-[#999] text-right text-lg font-medium leading-[18px] self-stretch w-[479px] my-auto max-md:max-w-full">
              {testimonialContent}
            </p>
            <div className="self-stretch flex min-w-60 flex-col w-[575px] my-auto rounded-[0px_0px_0px_0px] max-md:max-w-full">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9fce85c7-44ce-4acf-a89f-d792b62b015a?placeholderIfAbsent=true" alt="Testimonial" className="aspect-[0.87] object-contain w-[400px] max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Testimonials;
