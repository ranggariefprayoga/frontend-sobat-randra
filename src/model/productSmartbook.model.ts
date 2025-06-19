export interface ProductSmartbookResponse {
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

export interface updateProductSmartbookRequest {
  name?: string;
  is_active?: boolean;
  banner_image?: string;
  description?: string;
  marketing_text?: string;
  price?: number;
  old_price?: number;
  link_to_product?: string;
}
export interface createProductSmartbookRequest {
  name: string;
  is_active: boolean;
  banner_image: string;
  description: string;
  marketing_text?: string;
  price: number;
  old_price?: number;
  link_to_product?: string;
}

export interface BannerProductSmartbookResponse {
  banner_image?: string;
}
