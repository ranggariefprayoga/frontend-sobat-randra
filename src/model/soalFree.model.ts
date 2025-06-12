// src/model/soal.model.ts

export interface QuestionChoiceSoal {
  id: number;
  question_choice_title: string; // A, B, C, D
  question_choice_text: string[];
  question_choice_text_math?: string[];
  question_choice_images?: string[];
}

export interface Question {
  id: number;
  product_try_out_id: number;
  number_of_question: number;
  question_text: string[];
  question_text_math?: string[];
  question_images?: string[];
  category: "TWK" | "TIU" | "TKP";
  question_choices: QuestionChoiceSoal[];
}

export interface SoalPayload {
  session_id: number;
  quiz_token: string | null;
  product_try_out_id: number;
  question: Question | null;
  isFirst: boolean;
  isLast: boolean;
  nextQuestionId: number | null | undefined;
  previousQuestionId: number | null | undefined;
  message?: string | null;
  redirectTimeoutSeconds?: number;
  expired_at: Date;
}
