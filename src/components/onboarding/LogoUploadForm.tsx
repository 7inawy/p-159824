
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { OnboardingFormData } from "@/hooks/useOnboardingForm";

interface LogoUploadFormProps {
  formData: OnboardingFormData;
  isLoading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const LogoUploadForm: React.FC<LogoUploadFormProps> = ({
  formData,
  isLoading,
  onFileChange,
  onSubmit,
  onBack,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="storeLogo">شعار المتجر</Label>
          <div className="flex flex-col items-center space-y-4">
            {formData.logoUrl ? (
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={formData.logoUrl}
                  alt="Store logo preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                  onClick={() => onFileChange({ target: { files: null } } as any)}
                >
                  ×
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-lg mb-4">
                <span className="text-gray-400">شعار المتجر</span>
              </div>
            )}

            <div className="w-full">
              <Input
                id="storeLogo"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-2">
                يفضل استخدام صورة بحجم 512×512 بكسل بتنسيق PNG أو JPG
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          السابق
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "جاري الإعداد..." : "إنهاء الإعداد"}
        </Button>
      </div>
    </form>
  );
};
