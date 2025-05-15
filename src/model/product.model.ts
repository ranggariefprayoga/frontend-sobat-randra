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
  is_free_available?: boolean;
  link_to_form?: string;
  created_at: string;
  updated_at: string;
}

export interface BimbelProductlModel {
  id: number;
  name: string;
  is_active: boolean;
  category: "Kelas Belajar Bareng (KBB)" | "Private Bareng Minsob";
  capacity: number;
  banner_image: string;
  description: string;
  jadwal_bimbel: string;
  price: number;
  old_price?: number;
  link_to_meeting?: string;
  link_to_whatsApp?: string;
  created_at: string;
  updated_at: string;
}

export interface createTryOutResponse {
  id: number;
  name: string;
  is_active: boolean;
  is_free_available: boolean;
  password?: string;
  banner_image: string;
  description: string;
  marketing_text?: string;
  price: number;
  old_price?: number;
  link_to_form?: string;
  created_at: Date;
  updated_at: Date;
}

export interface updateTryOutResponse {
  id: number;
  name?: string;
  is_active: boolean;
  is_free_available: boolean;
  password?: string;
  banner_image?: string;
  description?: string;
  marketing_text?: string;
  price?: number;
  old_price?: number;
  link_to_form?: string;
  created_at: Date;
  updated_at: Date;
}

export interface updateTryOutRequest {
  name?: string;
  is_active?: boolean;
  is_free_available?: boolean;
  password?: string;
  banner_image?: string;
  description?: string;
  marketing_text?: string;
  price?: number;
  old_price?: number;
  link_to_form?: string;
}
export interface createTryOutRequest {
  name: string;
  is_active: boolean;
  is_free_available: boolean;
  password?: string;
  banner_image: string;
  description: string;
  marketing_text?: string;
  price: number;
  old_price?: number;
  link_to_form?: string;
}

export class BannerResponse {
  banner_image?: string;
}
