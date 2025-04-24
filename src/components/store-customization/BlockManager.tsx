
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { StoreBlock } from "@/hooks/useStoreCustomization";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { BlockSelector } from "./BlockSelector";
import { BlockEditor } from "./BlockEditor";
import { BlockPreview } from "./BlockPreview";

interface BlockManagerProps {
  blocks: StoreBlock[];
  onBlocksUpdate: (blocks: StoreBlock[]) => void;
  isLoading: boolean;
}

export function BlockManager({ blocks, onBlocksUpdate, isLoading }: BlockManagerProps) {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [showBlockSelector, setShowBlockSelector] = useState(false);

  // Find the selected block
  const selectedBlock = selectedBlockId 
    ? blocks.find(block => block.id === selectedBlockId) 
    : null;

  // Handle drag end event
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update block order
    const updatedBlocks = items.map((block, index) => ({
      ...block,
      block_order: index
    }));

    onBlocksUpdate(updatedBlocks);
  };

  // Handle adding a new block
  const handleAddBlock = (blockType: string) => {
    const newBlock: StoreBlock = {
      id: `temp-${Date.now()}`, // Temporary ID, will be replaced by server
      store_id: blocks[0]?.store_id || '',
      block_type: blockType,
      block_order: blocks.length,
      content: getDefaultContentForBlockType(blockType),
      is_active: true
    };

    onBlocksUpdate([...blocks, newBlock]);
    setShowBlockSelector(false);
    setSelectedBlockId(newBlock.id);
  };

  // Handle removing a block
  const handleRemoveBlock = (blockId: string) => {
    const updatedBlocks = blocks
      .filter(block => block.id !== blockId)
      .map((block, index) => ({
        ...block,
        block_order: index
      }));
    
    onBlocksUpdate(updatedBlocks);
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  // Handle updating block content
  const handleUpdateBlockContent = (blockId: string, content: Record<string, any>) => {
    const updatedBlocks = blocks.map(block => 
      block.id === blockId ? { ...block, content } : block
    );
    
    onBlocksUpdate(updatedBlocks);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Block List Panel */}
      <div className="w-full lg:w-1/3 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>العناصر</CardTitle>
              <Button 
                size="sm" 
                className="bg-[#F97415] hover:bg-[#F97415]/90"
                onClick={() => setShowBlockSelector(true)}
              >
                <Plus className="w-4 h-4 mr-1" /> إضافة عنصر
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {blocks.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                لا توجد عناصر حالياً. اضغط على 'إضافة عنصر' للبدء.
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="blocks">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {blocks.map((block, index) => (
                        <Draggable key={block.id} draggableId={block.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 border rounded-md bg-card hover:border-[#F97415] flex justify-between items-center ${
                                selectedBlockId === block.id ? "border-[#F97415] ring-1 ring-[#F97415]" : ""
                              }`}
                              onClick={() => setSelectedBlockId(block.id)}
                            >
                              <div>
                                <div className="font-medium">
                                  {getBlockTypeName(block.block_type)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  الترتيب: {block.block_order + 1}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveBlock(block.id);
                                }}
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Block Editor Panel */}
      <div className="w-full lg:w-2/3 space-y-4">
        {selectedBlock ? (
          <BlockEditor 
            block={selectedBlock} 
            onContentUpdate={(content) => handleUpdateBlockContent(selectedBlock.id, content)} 
          />
        ) : (
          <Card>
            <CardContent className="text-center py-10 text-muted-foreground">
              الرجاء اختيار عنصر للتعديل أو إضافة عنصر جديد.
            </CardContent>
          </Card>
        )}

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>معاينة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4 bg-background">
              <BlockPreview blocks={blocks} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Block Selector Modal */}
      {showBlockSelector && (
        <BlockSelector 
          onSelect={handleAddBlock} 
          onClose={() => setShowBlockSelector(false)} 
        />
      )}
    </div>
  );
}

// Helper functions
function getBlockTypeName(blockType: string): string {
  const blockTypes: Record<string, string> = {
    hero: "قسم الدعوة للعمل (Hero)",
    productGrid: "شبكة المنتجات",
    testimonials: "آراء العملاء",
    categoryBanner: "بانر الفئات",
    newsletter: "النشرة البريدية",
    customHtml: "HTML مخصص",
    video: "فيديو",
    instagram: "انستاغرام"
  };

  return blockTypes[blockType] || blockType;
}

function getDefaultContentForBlockType(blockType: string): Record<string, any> {
  switch (blockType) {
    case "hero":
      return {
        title: "أهلاً بك في متجرنا",
        subtitle: "اكتشف منتجاتنا الرائعة",
        buttonText: "تسوق الآن",
        buttonLink: "#",
        imageUrl: "https://placehold.co/1200x600",
        alignment: "center"
      };
    case "productGrid":
      return {
        title: "منتجاتنا المميزة",
        productCount: 4,
        showPrices: true
      };
    case "testimonials":
      return {
        title: "آراء العملاء",
        testimonials: [
          { name: "أحمد محمد", text: "منتجات رائعة وخدمة ممتازة!" },
          { name: "سارة أحمد", text: "سرعة في التوصيل وجودة عالية للمنتجات." }
        ]
      };
    case "categoryBanner":
      return {
        title: "تسوق حسب الفئة",
        categories: [
          { name: "الإلكترونيات", imageUrl: "https://placehold.co/400x300" },
          { name: "الملابس", imageUrl: "https://placehold.co/400x300" }
        ]
      };
    case "newsletter":
      return {
        title: "اشترك في نشرتنا البريدية",
        subtitle: "احصل على آخر العروض والأخبار",
        buttonText: "اشتراك"
      };
    case "customHtml":
      return {
        html: "<div><h2>عنوان مخصص</h2><p>هذا نص تجريبي يمكن تعديله.</p></div>"
      };
    case "video":
      return {
        title: "شاهد الفيديو",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        autoplay: false
      };
    case "instagram":
      return {
        title: "تابعنا على انستاغرام",
        username: "@yourstore",
        postCount: 6
      };
    default:
      return {};
  }
}
