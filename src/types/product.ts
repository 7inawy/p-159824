
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string | null;
  description: string | null;
  image_url: string | null;
  stock: number;
  retailer_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  status?: "published" | "draft"; // Added status field as optional
  sku: string; // Added SKU property
}
