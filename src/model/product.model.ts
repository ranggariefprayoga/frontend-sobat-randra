export interface TryOutProductModel {
  id: number;
  name: string;
  password?: string;
  is_active: boolean;
  banner_image?: string;
  description: string;
  marketing_text?: string;
  old_price?: number;
  price: number;
  link_to_form?: string;
  created_at: string;
  updated_at: string;
}
