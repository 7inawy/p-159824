
import React from "react";
import { Button } from "@/components/ui/button";

interface HeroBlockProps {
  content: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    imageUrl: string;
    alignment?: string;
  };
  theme?: any;
}

export function HeroBlock({ content, theme }: HeroBlockProps) {
  const { title, subtitle, buttonText, buttonLink, imageUrl, alignment = "center" } = content;

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ minHeight: "400px" }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 h-full min-h-[400px] text-white text-center">
        {title && <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>}
        {subtitle && <p className="text-lg md:text-xl mb-6 max-w-2xl">{subtitle}</p>}
        {buttonText && (
          <Button 
            className="px-6 py-2 bg-[#F97415] hover:bg-[#F97415]/90 text-white"
            asChild
          >
            <a href={buttonLink || "#"}>{buttonText}</a>
          </Button>
        )}
      </div>
    </div>
  );
}
