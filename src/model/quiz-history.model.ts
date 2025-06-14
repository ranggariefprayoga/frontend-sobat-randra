interface CategoryScore {
  category: string; // Nama kategori (TWK, TIU, TKP)
  score: number; // Skor total untuk kategori
  totalQuestions: number; // Jumlah total pertanyaan untuk kategori
  correctAnswers: number; // Jumlah jawaban benar
  wrongAnswers: number; // Jumlah jawaban salah
}

export interface getAllQuizSessionByUser {
  try_out_session_id: number;
  product_try_out_id: number;
  question_id: number;
  product_name: string;
  total_score: number;
  total_user_answer: number;
  category_scores: CategoryScore[];
  expired_at: Date;
}

export interface getHistorySessionDetailByUser {
  question_id: number;
  number_of_question: number;
  question_text: string[] | [];
  question_text_math: string[] | [];
  question_images: string[] | [];
  user_answer: {
    question_choice_title: string;
    question_choice_text: string[];
    question_choice_text_math: string[];
    question_choice_images: string[];
  } | null;
  correct_answer: {
    question_choice_title: string;
    question_choice_text: string[];
    question_choice_text_math: string[];
    question_choice_images: string[];
  } | null;
  correct_answer_title: string;
  question_choices:
    | {
        id: number;
        question_choice_title: string;
        question_choice_text: string[];
        question_choice_text_math: string[];
        question_choice_images: string[];
      }[]
    | null;
  isFirst: boolean;
  answer_explanation: {
    answer_explanation_text: string[];
    answer_explanation_text_math: string[];
    answer_explanation_images: string[];
  } | null;
  isLast: boolean;
  nextQuestionId: number;
  previousQuestionId: number;
  message: string | null;
}

export interface WebResponseSession<T> {
  data: {
    total_sessions: number;
    total_pages: number;
    current_page: number;
    limit: number;
    sessions?: T;
  };
  errors?: string;
  message?: string;
}

export interface WebResponseDetailHistorySession<T> {
  data: {
    try_out_session_id: number;
    product_try_out_id: number;
    total_user_answers: number;
    details?: T;
  };
  errors?: string;
  message?: string;
}
