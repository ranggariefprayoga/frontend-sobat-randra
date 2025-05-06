export interface HistoryNilaiModel {
  id: number;
  session_id: number;
  user_id: number;
  product_id: number;
  total_score: number;
  is_free: boolean;
  details: {
    category: string;
    total_questions: number;
    correct_answers: number;
    wrong_answers: number;
    score: number;
    ambang_batas: number;
  }[];
}
