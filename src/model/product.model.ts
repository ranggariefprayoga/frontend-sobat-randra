export interface TryOutProductModel {
  id: number;
  name: string;
  is_active: boolean;
  is_trial_product?: boolean;
  password?: string;
  max_free_questions?: number;
  banner_image?: string;
  description: string;
  marketing_text?: string;
  old_price?: number;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export interface createTryOutResponse {
  id: number;
  name: string;
  is_active: boolean;
  is_trial_product: boolean;
  password?: string;
  banner_image: string;
  description: string;
  marketing_text?: string;
  price: number;
  old_price?: number;
  max_free_questions?: number;
  created_at: Date;
  updated_at: Date;
}

export interface updateTryOutResponse {
  id: number;
  name?: string;
  is_active: boolean;
  is_trial_product: boolean;
  password?: string;
  banner_image?: string;
  description?: string;
  marketing_text?: string;
  price?: number;
  old_price?: number;
  max_free_questions?: number;
  created_at: Date;
  updated_at: Date;
}

export interface updateTryOutRequest {
  name?: string;
  is_active?: boolean;
  is_trial_product?: boolean;
  password?: string;
  banner_image?: string;
  description?: string;
  marketing_text?: string;
  price?: number;
  old_price?: number;
  max_free_questions?: number;
}
export interface createTryOutRequest {
  name: string;
  is_active: boolean;
  is_trial_product: boolean;
  password?: string;
  banner_image: string;
  description: string;
  marketing_text?: string;
  price: number;
  old_price?: number;
  max_free_questions?: number;
}

export class BannerResponse {
  banner_image?: string;
}
