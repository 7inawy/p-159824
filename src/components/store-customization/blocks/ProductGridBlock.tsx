
import React from "react";

interface ProductGridBlockProps {
  content: {
    title: string;
    productCount: number;
    showPrices: boolean;
  };
  theme?: any;
}

export function ProductGridBlock({ content, theme }: ProductGridBlockProps) {
  const { title, productCount = 4, showPrices = true } = content;

  // For demo, generate placeholder products
  const demoProducts = Array.from({ length: productCount }, (_, i) => ({
    id: `product-${i}`,
    name: `منتج ${i + 1}`,
    price: 99.99 + i * 10,
    imageUrl: `https://placehold.co/300x300?text=منتج+${i + 1}`
  }));

  return (
    <div className="w-full py-4">
      {title && <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {demoProducts.map((product) => (
          <div key={product.id} className="group rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
            <div className="aspect-square relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg">{product.name}</h3>
              {showPrices && (
                <p className="text-[#F97415] font-bold mt-1">
                  {product.price.toFixed(2)} ج.م
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
