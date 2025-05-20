export interface QuizSessionModel {
  id: number;
  user_id: number;
  product_try_out_id: number;
  token: string | null;
  started_at: string;
  expired_at: string;
  is_active: boolean;
  is_completed: boolean;
  for_product_free: boolean;
  created_at: string;
  updated_at: string;
}
