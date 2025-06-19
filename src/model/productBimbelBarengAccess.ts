export interface CreateBimbelBarengAccessRequest {
  product_bimbel_bareng_id: number;
  user_email: string;
  phone_number: string;
  get_access?: boolean;
}

export interface UpdateBimbelBarengAccessRequest {
  user_email?: string;
  phone_number?: string;
  get_access?: boolean;
}

export interface BimbelBarengAccessResponse {
  id: number;
  product_bimbel_bareng_id: number;
  user_email?: string;
  get_access?: boolean;
  phone_number?: string;
  created_at?: Date;
  updated_at?: Date;
}
