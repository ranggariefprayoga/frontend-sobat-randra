export interface CreateTryOutSessionRequest {
  product_try_out_id: number;
  is_trial?: boolean;
  duration_minutes?: number;
}

export interface TryOutSessionResponse {
  id: number;
  user_email: string;
  user_id: number;
  product_try_out_id: number;
  try_out_token: string;
  is_trial: boolean;
  is_finished: boolean;
  started_at: string; // ISO date string from API
  expired_at: string; // ISO date string from API
  first_question_number: number; // <- tambahan agar konsisten
  message?: string;
}

export interface submitFreeQuizSessionResponse {
  session_id: number;
  submitted_at: string; // serialized date
  total_questions: number;
  total_answered: number;
  remaining_questions: number;
}

export interface quizTokenExtractResponse {
  duration_minutes: number;
  expired_at: string;
  first_question_id: number;
  first_question_number: number;
  iat: number;
  is_trial: boolean;
  name: string;
  product_try_out_id: number;
  started_at: string;
  user_email: string;
  user_id: number;
}
