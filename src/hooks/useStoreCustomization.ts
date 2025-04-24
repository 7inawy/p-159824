
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface StoreTheme {
  id: string;
  store_id: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font_family: string;
  button_style: string;
  button_radius: number;
  is_dark_mode: boolean;
}

export interface StoreBlock {
  id: string;
  store_id: string;
  block_type: string;
  block_order: number;
  content: Record<string, any>;
  is_active: boolean;
}

export function useStoreCustomization(storeId: string) {
  const queryClient = useQueryClient();

  // Fetch theme
  const { data: theme, isLoading: isThemeLoading } = useQuery({
    queryKey: ["storeTheme", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_themes")
        .select("*")
        .eq("store_id", storeId)
        .single();

      if (error) throw error;
      return data as StoreTheme;
    },
  });

  // Fetch blocks
  const { data: blocks, isLoading: areBlocksLoading } = useQuery({
    queryKey: ["storeBlocks", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_blocks")
        .select("*")
        .eq("store_id", storeId)
        .order("block_order", { ascending: true });

      if (error) throw error;
      return data as StoreBlock[];
    },
  });

  // Update theme
  const updateTheme = useMutation({
    mutationFn: async (updatedTheme: Partial<StoreTheme>) => {
      const { data, error } = await supabase
        .from("store_themes")
        .update(updatedTheme)
        .eq("store_id", storeId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeTheme", storeId] });
      toast.success("تم تحديث تصميم المتجر بنجاح");
    },
    onError: (error: Error) => {
      toast.error(`فشل في تحديث تصميم المتجر: ${error.message}`);
    },
  });

  // Create a new block
  const createBlock = useMutation({
    mutationFn: async (newBlock: Omit<StoreBlock, 'id'>) => {
      const { data, error } = await supabase
        .from("store_blocks")
        .insert([newBlock])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeBlocks", storeId] });
      toast.success("تم إضافة العنصر بنجاح");
    },
    onError: (error: Error) => {
      toast.error(`فشل في إضافة العنصر: ${error.message}`);
    },
  });

  // Update a block
  const updateBlock = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<StoreBlock> & { id: string }) => {
      const { data, error } = await supabase
        .from("store_blocks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeBlocks", storeId] });
      toast.success("تم تحديث العنصر بنجاح");
    },
    onError: (error: Error) => {
      toast.error(`فشل في تحديث العنصر: ${error.message}`);
    },
  });

  // Delete a block
  const deleteBlock = useMutation({
    mutationFn: async (blockId: string) => {
      const { error } = await supabase
        .from("store_blocks")
        .delete()
        .eq("id", blockId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeBlocks", storeId] });
      toast.success("تم حذف العنصر بنجاح");
    },
    onError: (error: Error) => {
      toast.error(`فشل في حذف العنصر: ${error.message}`);
    },
  });

  // Update block order
  const updateBlockOrder = useMutation({
    mutationFn: async (updatedBlocks: StoreBlock[]) => {
      // Create an array of objects for upsert
      const blocksToUpdate = updatedBlocks.map(block => ({
        id: block.id,
        block_order: block.block_order,
        block_type: block.block_type,
        store_id: storeId,
        content: block.content || {},
        is_active: block.is_active
      }));

      const { error } = await supabase
        .from("store_blocks")
        .upsert(blocksToUpdate, { onConflict: 'id' });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeBlocks", storeId] });
      toast.success("تم تحديث ترتيب العناصر بنجاح");
    },
    onError: (error: Error) => {
      toast.error(`فشل في تحديث ترتيب العناصر: ${error.message}`);
    },
  });

  // Update multiple blocks at once
  const updateBlocks = useMutation({
    mutationFn: async (updatedBlocks: StoreBlock[]) => {
      return updateBlockOrder.mutateAsync(updatedBlocks);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeBlocks", storeId] });
    }
  });

  return {
    theme,
    blocks,
    isLoading: isThemeLoading || areBlocksLoading,
    updateTheme,
    createBlock,
    updateBlock,
    deleteBlock,
    updateBlockOrder,
    updateBlocks,
  };
}
