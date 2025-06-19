export interface ProductVideoBelajarResponse {
  id: number;
  name: string;
  is_active: boolean;
  banner_image: string;
  description: string;
  marketing_text?: string;
  price: number;
  old_price?: number;
  link_to_product: string;
  created_at: Date;
  updated_at: Date;
}

export interface updateProductVideoBelajarRequest {
  name?: string;
  is_active?: boolean;
  banner_image?: string;
  description?: string;
  marketing_text?: string;
  price?: number;
  old_price?: number;
  link_to_product?: string;
}
export interface createProductVideoBelajarRequest {
  name: string;
  is_active: boolean;
  banner_image: string;
  description: string;
  marketing_text?: string;
  price: number;
  old_price?: number;
  link_to_product?: string;
}

export interface BannerProductVideoBelajarResponse {
  banner_image?: string;
}
