
import React from "react";

interface TestimonialsBlockProps {
  content: {
    title: string;
    testimonials: Array<{
      name: string;
      text: string;
      image?: string;
    }>;
  };
  theme?: any;
}

export function TestimonialsBlock({ content, theme }: TestimonialsBlockProps) {
  const { title, testimonials = [] } = content;

  return (
    <div className="w-full py-10 px-4">
      {title && <h2 className="text-2xl font-bold mb-8 text-center">{title}</h2>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="bg-gray-50 p-6 rounded-lg border shadow-sm"
          >
            <div className="flex flex-col">
              <blockquote className="text-lg mb-4">"{testimonial.text}"</blockquote>
              <div className="mt-auto font-medium">— {testimonial.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
