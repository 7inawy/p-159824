
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
    <div className="bg-white border-neutral-100 border flex min-w-[250px] max-w-[300px] min-h-[340px] flex-col overflow-hidden items-center justify-center p-6 rounded-[20px] border-solid">
      <div className="flex flex-col items-center">
        <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[185px] lg:h-[185px]">
          <div className="bg-white border-neutral-100 flex flex-col items-center justify-center w-full h-full p-4 rounded-[50%] border-solid border-2">
            <img
              src={imageUrl}
              alt={title}
              className="aspect-[1] object-contain w-[60%] h-[60%]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center text-center mt-6">
          <h3 className="text-[#333] text-xl font-extrabold leading-none">
            {title}
          </h3>
          <p className="text-[#767676] text-base font-medium leading-5 mt-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
