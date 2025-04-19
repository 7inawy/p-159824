import React from "react";

interface FeatureCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <div className="bg-white border-neutral-100 border self-stretch flex min-w-60 min-h-[392px] flex-col overflow-hidden items-center justify-center grow shrink w-[266px] my-auto pl-[33px] pr-8 py-[25px] rounded-[20px] border-solid max-md:px-5">
      <div className="flex flex-col items-center">
        <div className="w-[185px] max-w-full">
          <div className="bg-white border-neutral-100 flex flex-col items-center justify-center w-full h-[185px] px-[19px] rounded-[50%] border-solid border-2 max-md:px-5">
            <img
              src={imageUrl}
              alt={title}
              className="aspect-[1] object-contain w-[83px]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center text-center mt-9">
          <h3 className="text-[#333] text-xl font-extrabold leading-none">
            {title}
          </h3>
          <p className="text-[#767676] text-base font-medium leading-4 mt-5">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
