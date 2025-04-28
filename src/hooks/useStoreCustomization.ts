
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

export interface ThemeVersion {
  id: string;
  store_id: string;
  name: string;
  is_live: boolean;
  created_at: string;
  updated_at: string;
  blocks_data?: StoreBlock[];
  theme_data?: StoreTheme;
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

  // Fetch theme versions
  const { data: versions, isLoading: areVersionsLoading } = useQuery({
    queryKey: ["storeVersions", storeId],
    queryFn: async () => {
      // Use type assertion to handle the store_theme_versions table
      const { data, error } = await supabase
        .from("store_theme_versions" as any)
        .select("*")
        .eq("store_id", storeId)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data as ThemeVersion[];
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

  // Save a new theme version
  const saveThemeVersion = useMutation({
    mutationFn: async ({ name, blocks, theme }: { name: string, blocks: StoreBlock[], theme: StoreTheme }) => {
      const versionData = {
        store_id: storeId,
        name,
        blocks_data: blocks,
        theme_data: theme,
        is_live: false
      };

      // Use type assertion to handle the store_theme_versions table
      const { data, error } = await supabase
        .from("store_theme_versions" as any)
        .insert([versionData])
        .select()
        .single();

      if (error) throw error;
      return data as ThemeVersion;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeVersions", storeId] });
      toast.success("تم حفظ نسخة التصميم بنجاح");
    },
    onError: (error: Error) => {
      toast.error(`فشل في حفظ نسخة التصميم: ${error.message}`);
    },
  });

  // Load a theme version
  const loadThemeVersion = useMutation({
    mutationFn: async (versionId: string) => {
      // Use type assertion to handle the store_theme_versions table
      const { data, error } = await supabase
        .from("store_theme_versions" as any)
        .select("*")
        .eq("id", versionId)
        .single();

      if (error) throw error;
      
      const version = data as ThemeVersion;
      
      if (version.blocks_data) {
        // Delete existing blocks
        await supabase
          .from("store_blocks")
          .delete()
          .eq("store_id", storeId);
          
        // Insert new blocks
        const blocksToInsert = version.blocks_data.map((block: any) => ({
          ...block,
          id: undefined, // Let Supabase generate a new ID
          store_id: storeId
        }));
        
        if (blocksToInsert.length > 0) {
          await supabase
            .from("store_blocks")
            .insert(blocksToInsert);
        }
      }
      
      if (version.theme_data) {
        // Update theme
        await supabase
          .from("store_themes")
          .update(version.theme_data)
          .eq("store_id", storeId);
      }
      
      return version;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeTheme", storeId] });
      queryClient.invalidateQueries({ queryKey: ["storeBlocks", storeId] });
      toast.success("تم تحميل نسخة التصميم بنجاح");
    },
    onError: (error: Error) => {
      toast.error(`فشل في تحميل نسخة التصميم: ${error.message}`);
    },
  });

  // Set a theme version as live
  const setLiveVersion = useMutation({
    mutationFn: async (versionId: string) => {
      // First, set all versions as not live
      await supabase
        .from("store_theme_versions" as any)
        .update({ is_live: false })
        .eq("store_id", storeId);
      
      // Then set the selected version as live
      const { data, error } = await supabase
        .from("store_theme_versions" as any)
        .update({ is_live: true })
        .eq("id", versionId)
        .select()
        .single();

      if (error) throw error;
      return data as ThemeVersion;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeVersions", storeId] });
      toast.success("تم تفعيل نسخة التصميم بنجاح");
    },
    onError: (error: Error) => {
      toast.error(`فشل في تفعيل نسخة التصميم: ${error.message}`);
    },
  });

  // Delete a theme version
  const deleteThemeVersion = useMutation({
    mutationFn: async (versionId: string) => {
      const { error } = await supabase
        .from("store_theme_versions" as any)
        .delete()
        .eq("id", versionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeVersions", storeId] });
      toast.success("تم حذف نسخة التصميم بنجاح");
    },
    onError: (error: Error) => {
      toast.error(`فشل في حذف نسخة التصميم: ${error.message}`);
    },
  });

  return {
    theme,
    blocks,
    versions,
    isLoading: isThemeLoading || areBlocksLoading || areVersionsLoading,
    updateTheme,
    createBlock,
    updateBlock,
    deleteBlock,
    updateBlockOrder,
    updateBlocks,
    saveThemeVersion,
    loadThemeVersion,
    setLiveVersion,
    deleteThemeVersion,
  };
}
