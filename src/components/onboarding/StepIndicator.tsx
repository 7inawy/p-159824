
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-between items-center w-full p-6 bg-gray-50">
      <div className="flex space-x-3">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <span
              className={`w-3 h-3 rounded-full transition-colors ${
                currentStep >= index + 1 ? "bg-[#F97415]" : "bg-gray-300"
              }`}
            />
            {index < totalSteps - 1 && (
              <div 
                className={`w-8 h-0.5 mt-1.5 ${
                  currentStep > index + 1 ? "bg-[#F97415]" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600">
        خطوة {currentStep} من {totalSteps}
      </p>
    </div>
  );
};
