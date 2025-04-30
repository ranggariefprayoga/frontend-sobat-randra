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
