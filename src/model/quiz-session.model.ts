export interface CreateTryOutSessionRequest {
  product_try_out_id: number;
  is_trial?: boolean;
  duration_minutes?: number;
}

export interface TryOutSessionResponse {
  id: number;
  user_email?: string;
  user_id?: number;
  first_question_id?: number;
  product_try_out_id: number;
  try_out_token: string;
  is_trial: boolean;
  is_finished: boolean;
  started_at: Date;
  expired_at: Date;
  message?: string;
}

export interface submitFreeQuizSessionResponse {
  session_id: number;
  submitted_at: Date;
  total_questions: number;
  total_answered: number;
  remaining_questions: number;
}
