
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SaveIcon, Star, StarOff, Trash } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export interface ThemeVersion {
  id: string;
  store_id: string;
  name: string;
  is_live: boolean;
  created_at: string;
  updated_at: string;
}

interface ThemeVersionsProps {
  versions: ThemeVersion[];
  currentVersionId: string | null;
  onSaveVersion: (name: string) => void;
  onLoadVersion: (versionId: string) => void;
  onDeleteVersion: (versionId: string) => void;
  onSetLiveVersion: (versionId: string) => void;
  isLoading: boolean;
}

export function ThemeVersions({
  versions,
  currentVersionId,
  onSaveVersion,
  onLoadVersion,
  onDeleteVersion,
  onSetLiveVersion,
  isLoading
}: ThemeVersionsProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newVersionName, setNewVersionName] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleSaveNew = () => {
    if (newVersionName.trim()) {
      onSaveVersion(newVersionName);
      setNewVersionName("");
      setShowSaveDialog(false);
    }
  };

  const confirmDelete = (versionId: string) => {
    onDeleteVersion(versionId);
    setShowDeleteConfirm(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>نسخ التصميم</CardTitle>
          <Button 
            size="sm" 
            className="bg-[#F97415] hover:bg-[#F97415]/90"
            onClick={() => setShowSaveDialog(true)}
            disabled={isLoading}
          >
            <SaveIcon className="w-4 h-4 mr-1" /> حفظ نسخة جديدة
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {versions.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            لم يتم حفظ أي نسخ بعد. قم بالضغط على "حفظ نسخة جديدة" للبدء.
          </div>
        ) : (
          <div className="space-y-2">
            {versions.map((version) => (
              <div 
                key={version.id}
                className={`p-3 border rounded-md hover:border-[#F97415] flex justify-between items-center ${
                  currentVersionId === version.id ? "border-[#F97415] ring-1 ring-[#F97415]" : ""
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="font-medium">{version.name}</span>
                    {version.is_live && (
                      <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                        مفعل
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    تم التعديل: {new Date(version.updated_at).toLocaleString("ar")}
                  </div>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onLoadVersion(version.id)}
                    disabled={currentVersionId === version.id || isLoading}
                  >
                    تحميل
                  </Button>
                  {!version.is_live ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-amber-500"
                      onClick={() => onSetLiveVersion(version.id)}
                      disabled={isLoading}
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-gray-400"
                      disabled={true}
                    >
                      <StarOff className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => setShowDeleteConfirm(version.id)}
                    disabled={isLoading}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Save New Version Dialog */}
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>حفظ نسخة جديدة</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="version-name" className="text-sm font-medium">
                  اسم النسخة
                </label>
                <Input
                  id="version-name"
                  placeholder="مثال: تصميم رمضان"
                  value={newVersionName}
                  onChange={(e) => setNewVersionName(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">إلغاء</Button>
              </DialogClose>
              <Button 
                className="bg-[#F97415] hover:bg-[#F97415]/90"
                onClick={handleSaveNew}
                disabled={!newVersionName.trim() || isLoading}
              >
                حفظ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>تأكيد الحذف</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>هل أنت متأكد من حذف هذه النسخة؟ لا يمكن التراجع عن هذا الإجراء.</p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">إلغاء</Button>
              </DialogClose>
              <Button 
                variant="destructive"
                onClick={() => showDeleteConfirm && confirmDelete(showDeleteConfirm)}
                disabled={isLoading}
              >
                حذف
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
