
import React from "react";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearImage: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  imagePreview,
  onImageChange,
  onClearImage,
}) => {
  return (
    <div className="mb-4">
      <FormLabel>صورة المنتج</FormLabel>
      <div className="mt-2">
        {!imagePreview ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Input 
              type="file" 
              id="image" 
              accept="image/*"
              onChange={onImageChange}
              className="hidden"
            />
            <label 
              htmlFor="image" 
              className="cursor-pointer flex flex-col items-center justify-center text-gray-500"
            >
              <Upload size={24} className="mb-2" />
              <span>انقر لرفع صورة</span>
              <span className="text-xs mt-1">PNG, JPG, WebP</span>
            </label>
          </div>
        ) : (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Product preview" 
              className="h-40 w-auto mx-auto object-contain rounded-md"
            />
            <Button 
              type="button"
              variant="destructive" 
              size="icon" 
              className="absolute top-0 right-0 rounded-full h-6 w-6" 
              onClick={onClearImage}
            >
              <X size={14} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
