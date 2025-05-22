export interface CreateProductAccessTryOut {
  product_try_out_id: number;
  user_email: string;
  get_access?: boolean;
}

export interface UpdateProductAccessTryOut {
  user_email?: string;
  get_access?: boolean;
}

export interface ProductAccessTryOutResponse {
  id: number;
  product_try_out_id: number;
  user_email?: string;
  get_access?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
