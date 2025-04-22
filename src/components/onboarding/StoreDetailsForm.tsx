
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { OnboardingFormData } from "@/hooks/useOnboardingForm";

interface StoreDetailsFormProps {
  formData: OnboardingFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (value: string) => void;
  onNext: (e: React.FormEvent) => void;
}

export const StoreDetailsForm: React.FC<StoreDetailsFormProps> = ({
  formData,
  onInputChange,
  onSelectChange,
  onNext,
}) => {
  return (
    <form onSubmit={onNext} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="storeName">اسم المتجر</Label>
          <Input
            id="storeName"
            name="storeName"
            placeholder="أدخل اسم متجرك"
            value={formData.storeName}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="storeCategory">فئة المتجر</Label>
          <Select
            value={formData.storeCategory}
            onValueChange={onSelectChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر فئة المتجر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fashion">الأزياء والموضة</SelectItem>
              <SelectItem value="electronics">الإلكترونيات</SelectItem>
              <SelectItem value="beauty">الجمال والعناية</SelectItem>
              <SelectItem value="food">الطعام والمشروبات</SelectItem>
              <SelectItem value="home">المنزل والأثاث</SelectItem>
              <SelectItem value="health">الصحة واللياقة</SelectItem>
              <SelectItem value="books">الكتب والقرطاسية</SelectItem>
              <SelectItem value="toys">الألعاب والهدايا</SelectItem>
              <SelectItem value="other">أخرى</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="storeDescription">وصف المتجر</Label>
          <Textarea
            id="storeDescription"
            name="storeDescription"
            placeholder="أخبرنا المزيد عن متجرك ومنتجاتك"
            value={formData.storeDescription}
            onChange={onInputChange}
            rows={4}
            className="resize-none"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        التالي
      </Button>
    </form>
  );
};
