export interface TryOutAnswerResponse {
  id: number;
  product_try_out_id: number;
  try_out_session_id: number;
  user_id: number;
  question_id: number;
  question_choice_id: number;
  score: number;
  is_correct: boolean;
  message?: string;
  created_at: Date;
  updated_at: Date;
}
