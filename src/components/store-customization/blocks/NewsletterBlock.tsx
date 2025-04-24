
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewsletterBlockProps {
  content: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  theme?: any;
}

export function NewsletterBlock({ content, theme }: NewsletterBlockProps) {
  const { title, subtitle, buttonText } = content;

  return (
    <div className="w-full py-10 px-4 bg-gray-50 rounded-lg">
      <div className="max-w-lg mx-auto text-center">
        {title && <h2 className="text-2xl font-bold mb-3">{title}</h2>}
        {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Input 
            type="email" 
            placeholder="بريدك الإلكتروني" 
            className="flex-grow"
          />
          <Button className="bg-[#F97415] hover:bg-[#F97415]/90">
            {buttonText || "اشتراك"}
          </Button>
        </div>
      </div>
    </div>
  );
}
