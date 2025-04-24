
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  LayoutGrid, 
  ImageIcon, 
  MessageSquareQuote, 
  Tags, 
  Mail, 
  Code, 
  Video, 
  Instagram 
} from "lucide-react";

interface BlockSelectorProps {
  onSelect: (blockType: string) => void;
  onClose: () => void;
}

interface BlockTypeOption {
  type: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export function BlockSelector({ onSelect, onClose }: BlockSelectorProps) {
  const blockTypes: BlockTypeOption[] = [
    {
      type: "hero",
      name: "قسم الدعوة للعمل (Hero)",
      description: "صورة كبيرة مع عنوان وزر دعوة للعمل",
      icon: <ImageIcon className="h-8 w-8 text-[#F97415]" />
    },
    {
      type: "productGrid",
      name: "شبكة المنتجات",
      description: "عرض المنتجات المميزة أو الأحدث",
      icon: <LayoutGrid className="h-8 w-8 text-[#F97415]" />
    },
    {
      type: "testimonials",
      name: "آراء العملاء",
      description: "عرض متحرك لآراء العملاء",
      icon: <MessageSquareQuote className="h-8 w-8 text-[#F97415]" />
    },
    {
      type: "categoryBanner",
      name: "بانر الفئات",
      description: "عرض فئات المنتجات بشكل جذاب",
      icon: <Tags className="h-8 w-8 text-[#F97415]" />
    },
    {
      type: "newsletter",
      name: "النشرة البريدية",
      description: "نموذج للاشتراك في النشرة البريدية",
      icon: <Mail className="h-8 w-8 text-[#F97415]" />
    },
    {
      type: "customHtml",
      name: "HTML مخصص",
      description: "إضافة محتوى HTML مخصص",
      icon: <Code className="h-8 w-8 text-[#F97415]" />
    },
    {
      type: "video",
      name: "فيديو",
      description: "تضمين فيديو المنتج أو العلامة التجارية",
      icon: <Video className="h-8 w-8 text-[#F97415]" />
    },
    {
      type: "instagram",
      name: "انستاغرام",
      description: "عرض صور من حساب انستاغرام",
      icon: <Instagram className="h-8 w-8 text-[#F97415]" />
    }
  ];

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-4">اختر نوع العنصر</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {blockTypes.map((block) => (
            <Button
              key={block.type}
              variant="outline"
              className="flex flex-col h-auto items-center justify-start p-6 border-2 hover:border-[#F97415] text-left"
              onClick={() => onSelect(block.type)}
            >
              <div className="flex items-center justify-center mb-4">
                {block.icon}
              </div>
              <div className="text-lg font-semibold mb-2">{block.name}</div>
              <div className="text-muted-foreground text-sm">{block.description}</div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
