export interface bimbelBarengResponse {
  id: number;
  name: string;
  is_active: boolean;
  capacity: number;
  banner_image: string;
  description: string;
  marketing_text: string;
  pemateri: string;
  jadwal_bimbel_image: string;
  price: number;
  old_price: number;
  link_to_meeting: string;
  link_to_whatsapp: string;
  created_at: Date;
  updated_at: Date;
}

export interface updateBimbelBarengRequest {
  name?: string;
  is_active?: boolean;
  capacity?: number;
  banner_image?: string;
  description?: string;
  marketing_text?: string;
  pemateri?: string;
  jadwal_bimbel_image?: string;
  price?: number;
  old_price?: number;
  link_to_meeting?: string;
  link_to_whatsapp?: string;
}
export interface createBimbelBarengRequest {
  name: string;
  is_active: boolean;
  capacity: number;
  banner_image: string;
  description: string;
  marketing_text: string;
  pemateri: string;
  jadwal_bimbel_image: string;
  price: number;
  old_price: number;
  link_to_meeting: string;
  link_to_whatsapp: string;
}

export interface BannerBimbelResponse {
  banner_image?: string;
  jadwal_bimbel_image?: string;
}
