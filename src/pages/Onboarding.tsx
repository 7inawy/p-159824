
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StoreDetailsForm } from "@/components/onboarding/StoreDetailsForm";
import { LogoUploadForm } from "@/components/onboarding/LogoUploadForm";
import { StepIndicator } from "@/components/onboarding/StepIndicator";
import { useOnboardingForm } from "@/hooks/useOnboardingForm";

const Onboarding = () => {
  const {
    isLoading,
    step,
    formData,
    setStep,
    handleFileChange,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
  } = useOnboardingForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FEF1E8] p-4" dir="rtl">
      <Card className="w-full max-w-3xl overflow-hidden border-none shadow-lg">
        <CardHeader className="bg-[#F97415] text-white text-center p-6">
          <CardTitle className="text-2xl font-bold">إعداد متجرك</CardTitle>
          <CardDescription className="text-white/90">
            لنبدأ بإعداد متجرك الخاص بك بخطوات بسيطة
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {step === 1 && (
            <StoreDetailsForm
              formData={formData}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
              onNext={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            />
          )}

          {step === 2 && (
            <LogoUploadForm
              formData={formData}
              isLoading={isLoading}
              onFileChange={handleFileChange}
              onSubmit={handleSubmit}
              onBack={() => setStep(1)}
            />
          )}
        </CardContent>

        <CardFooter>
          <StepIndicator currentStep={step} totalSteps={2} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Onboarding;
