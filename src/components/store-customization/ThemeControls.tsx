
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import type { StoreTheme } from "@/hooks/useStoreCustomization";

interface ThemeControlsProps {
  theme: StoreTheme;
  onUpdate: (theme: Partial<StoreTheme>) => void;
  isLoading?: boolean;
}

export function ThemeControls({ theme, onUpdate, isLoading }: ThemeControlsProps) {
  const handleColorChange = (field: keyof StoreTheme, value: string) => {
    onUpdate({ [field]: value });
  };

  const handleDarkModeToggle = (checked: boolean) => {
    onUpdate({ is_dark_mode: checked });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تخصيص المظهر</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-3">
            <Label htmlFor="primary-color">اللون الرئيسي</Label>
            <div className="flex gap-2">
              <Input
                id="primary-color"
                type="color"
                value={theme.primary_color}
                className="w-20 h-10 p-1"
                onChange={(e) => handleColorChange("primary_color", e.target.value)}
              />
              <Input
                type="text"
                value={theme.primary_color}
                className="flex-1"
                onChange={(e) => handleColorChange("primary_color", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="secondary-color">اللون الثانوي</Label>
            <div className="flex gap-2">
              <Input
                id="secondary-color"
                type="color"
                value={theme.secondary_color}
                className="w-20 h-10 p-1"
                onChange={(e) => handleColorChange("secondary_color", e.target.value)}
              />
              <Input
                type="text"
                value={theme.secondary_color}
                className="flex-1"
                onChange={(e) => handleColorChange("secondary_color", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="accent-color">لون التأكيد</Label>
            <div className="flex gap-2">
              <Input
                id="accent-color"
                type="color"
                value={theme.accent_color}
                className="w-20 h-10 p-1"
                onChange={(e) => handleColorChange("accent_color", e.target.value)}
              />
              <Input
                type="text"
                value={theme.accent_color}
                className="flex-1"
                onChange={(e) => handleColorChange("accent_color", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">الوضع الداكن</Label>
            <Switch
              id="dark-mode"
              checked={theme.is_dark_mode}
              onCheckedChange={handleDarkModeToggle}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
