
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type OnboardingFormData = {
  storeName: string;
  storeDescription: string;
  storeCategory: string;
  logoFile: File | null;
  logoUrl: string;
};

export const useOnboardingForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>({
    storeName: "",
    storeDescription: "",
    storeCategory: "",
    logoFile: null,
    logoUrl: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({
            ...formData,
            logoFile: file,
            logoUrl: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, storeCategory: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;

      if (!user) {
        throw new Error("No authenticated user found");
      }

      let logoUrl = null;
      if (formData.logoFile) {
        const fileName = `${user.id}-${Date.now()}-${formData.logoFile.name}`;
        const { error: uploadError, data } = await supabase.storage
          .from("retailer-logos")
          .upload(fileName, formData.logoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("retailer-logos")
          .getPublicUrl(fileName);

        logoUrl = publicUrl;
      }

      const { error } = await supabase.from("retailers").insert({
        user_id: user.id,
        store_name: formData.storeName,
        description: formData.storeDescription,
        category: formData.storeCategory,
        logo_url: logoUrl,
      });

      if (error) throw error;

      toast({
        title: "Setup complete!",
        description: "Your store has been created successfully.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error setting up store",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    step,
    formData,
    setStep,
    handleFileChange,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
  };
};
