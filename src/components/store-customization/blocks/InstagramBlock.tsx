
import React from "react";
import { Instagram } from "lucide-react";

interface InstagramBlockProps {
  content: {
    title: string;
    username: string;
    postCount: number;
  };
  theme?: any;
}

export function InstagramBlock({ content, theme }: InstagramBlockProps) {
  const { title, username, postCount = 6 } = content;

  // Create placeholder images for demo
  const demoImages = Array.from({ length: Math.min(postCount, 12) }, (_, i) => ({
    id: `post-${i}`,
    imageUrl: `https://placehold.co/600x600?text=Instagram+${i + 1}`
  }));

  return (
    <div className="w-full py-8">
      <div className="text-center mb-6">
        {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
        {username && (
          <a 
            href={`https://instagram.com/${username.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#F97415] hover:underline"
          >
            <Instagram className="h-4 w-4 mr-1" />
            {username}
          </a>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {demoImages.map((post) => (
          <div 
            key={post.id} 
            className="aspect-square overflow-hidden"
          >
            <img 
              src={post.imageUrl} 
              alt="Instagram post" 
              className="w-full h-full object-cover hover:opacity-90 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
