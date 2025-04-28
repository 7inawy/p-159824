
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionFn?: () => void;
  secondaryActionLabel?: string;
  secondaryActionFn?: () => void;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  actionFn,
  secondaryActionLabel,
  secondaryActionFn
}: EmptyStateProps) {
  return (
    <Card className="w-full flex flex-col items-center justify-center text-center p-8 py-12">
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      
      <div className="flex gap-3">
        {actionLabel && actionFn && (
          <Button 
            className="bg-[#F97415] hover:bg-[#F97415]/90"
            onClick={actionFn}
          >
            {actionLabel}
          </Button>
        )}
        
        {secondaryActionLabel && secondaryActionFn && (
          <Button 
            variant="outline"
            onClick={secondaryActionFn}
          >
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
}
