export interface ProductPromoResponse {
  id: number;
  name: string;
  is_active: boolean;
  banner_image: string;
  description: string;
  marketing_text?: string;
  price: number;
  old_price?: number;
  created_at: Date;
  updated_at: Date;
}

export interface updateProductPromoRequest {
  name?: string;
  is_active?: boolean;
  banner_image?: string;
  description?: string;
  marketing_text?: string;
  price?: number;
  old_price?: number;
}
export interface createProductPromoRequest {
  name: string;
  is_active: boolean;
  banner_image: string;
  description: string;
  marketing_text?: string;
  price: number;
  old_price?: number;
}

export interface BannerProductPromoResponse {
  banner_image?: string;
}
