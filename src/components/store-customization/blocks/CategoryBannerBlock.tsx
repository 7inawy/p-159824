
import React from "react";

interface CategoryBannerBlockProps {
  content: {
    title: string;
    categories: Array<{
      name: string;
      imageUrl: string;
    }>;
  };
  theme?: any;
}

export function CategoryBannerBlock({ content, theme }: CategoryBannerBlockProps) {
  const { title, categories = [] } = content;

  return (
    <div className="w-full py-6">
      {title && <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>}
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden rounded-lg group cursor-pointer"
          >
            <div className="aspect-[4/3] w-full">
              <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <h3 className="text-white font-bold text-lg">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
