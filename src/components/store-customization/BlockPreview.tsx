
import React from "react";
import { StoreBlock } from "@/hooks/useStoreCustomization";
import { HeroBlock } from "./blocks/HeroBlock";
import { ProductGridBlock } from "./blocks/ProductGridBlock";
import { TestimonialsBlock } from "./blocks/TestimonialsBlock";
import { CategoryBannerBlock } from "./blocks/CategoryBannerBlock";
import { NewsletterBlock } from "./blocks/NewsletterBlock";
import { CustomHtmlBlock } from "./blocks/CustomHtmlBlock";
import { VideoBlock } from "./blocks/VideoBlock";
import { InstagramBlock } from "./blocks/InstagramBlock";
import { getDefaultContentForBlockType } from "@/utils/blockHelpers";

interface BlockPreviewProps {
  blocks: StoreBlock[];
  theme?: any; // Optional theme prop for applying theme settings
}

export function BlockPreview({ blocks, theme }: BlockPreviewProps) {
  const renderBlock = (block: StoreBlock) => {
    if (!block.is_active) return null;
    
    // Make sure the content is properly typed with defaults from blockHelpers
    const defaultContent = getDefaultContentForBlockType(block.block_type);
    const content = { ...defaultContent, ...block.content };

    // Define the correct types for each block
    type HeroContent = {
      title: string;
      subtitle: string;
      buttonText: string;
      buttonLink: string;
      imageUrl: string;
      alignment?: string;
    };

    type ProductGridContent = {
      title: string;
      productCount: number;
      showPrices: boolean;
    };

    type TestimonialsContent = {
      title: string;
      testimonials: Array<{
        name: string;
        text: string;
        image?: string;
      }>;
    };

    type CategoryBannerContent = {
      title: string;
      categories: Array<{
        name: string;
        imageUrl: string;
      }>;
    };

    type NewsletterContent = {
      title: string;
      subtitle: string;
      buttonText: string;
    };

    type CustomHtmlContent = {
      html: string;
    };

    type VideoContent = {
      title: string;
      videoUrl: string;
      autoplay: boolean;
    };

    type InstagramContent = {
      title: string;
      username: string;
      postCount: number;
    };

    // Now render the appropriate block component based on block type
    switch (block.block_type) {
      case "hero":
        return <HeroBlock 
          key={block.id} 
          content={content as HeroContent} 
          theme={theme} 
        />;
        
      case "productGrid":
        return <ProductGridBlock 
          key={block.id} 
          content={content as ProductGridContent} 
          theme={theme} 
        />;
        
      case "testimonials":
        return <TestimonialsBlock 
          key={block.id} 
          content={content as TestimonialsContent} 
          theme={theme} 
        />;
        
      case "categoryBanner":
        return <CategoryBannerBlock 
          key={block.id} 
          content={content as CategoryBannerContent} 
          theme={theme} 
        />;
        
      case "newsletter":
        return <NewsletterBlock 
          key={block.id} 
          content={content as NewsletterContent} 
          theme={theme} 
        />;
        
      case "customHtml":
        return <CustomHtmlBlock 
          key={block.id} 
          content={content as CustomHtmlContent} 
          theme={theme} 
        />;
        
      case "video":
        return <VideoBlock 
          key={block.id} 
          content={content as VideoContent} 
          theme={theme} 
        />;
        
      case "instagram":
        return <InstagramBlock 
          key={block.id} 
          content={content as InstagramContent} 
          theme={theme} 
        />;
        
      default:
        return (
          <div key={block.id} className="p-4 border border-dashed text-center text-muted-foreground">
            عنصر غير معروف: {block.block_type}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 overflow-hidden">
      {blocks
        .sort((a, b) => a.block_order - b.block_order)
        .map((block) => renderBlock(block))}
        
      {blocks.length === 0 && (
        <div className="p-16 border border-dashed rounded-md text-center text-muted-foreground">
          المعاينة فارغة. قم بإضافة عناصر للمتجر لرؤيتها هنا.
        </div>
      )}
    </div>
  );
}
