export interface CreateTryOutSessionRequest {
  product_try_out_id: number;
  is_trial?: boolean;
  duration_minutes?: number;
}

export interface TryOutSessionResponse {
  id: number;
  user_email?: string;
  user_id?: number;
  product_try_out_id: number;
  try_out_token: string;
  is_trial: boolean;
  is_finished: boolean;
  started_at: string; // ISO date string from API
  expired_at: string; // ISO date string from API
  first_question_number?: number; // <- tambahan agar konsisten
  first_question_id?: number; // <- kalau ini memang dikembalikan, tetapkan
  message?: string;
}

export interface submitFreeQuizSessionResponse {
  session_id: number;
  submitted_at: string; // serialized date
  total_questions: number;
  total_answered: number;
  remaining_questions: number;
}
