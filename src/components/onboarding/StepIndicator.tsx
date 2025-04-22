
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-between p-6 bg-gray-50">
      <div className="flex space-x-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentStep >= index + 1 ? "bg-[#F97415]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600">
        خطوة {currentStep} من {totalSteps}
      </p>
    </div>
  );
};
