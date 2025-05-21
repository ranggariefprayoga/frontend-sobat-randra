export interface CreateQuestionChoiceRequest {
  question_choice_title: string;
  question_choice_text?: string[];
  question_choice_text_math?: string[];
  question_choice_images?: string[];
  question_choice_weighted: number;
}

export interface UpdateQuestionChoiceRequest {
  product_try_out_id: number;
  question_id: number;
  question_choice_title?: string;
  question_choice_text?: string[];
  question_choice_text_math?: string[];
  question_choice_images?: string[];
  question_choice_weighted?: number;
}

export interface QuestionChoiceResponse {
  id: number;
  product_try_out_id: number;
  question_id: number;
  question_choice_title: string;
  question_choice_text: string[];
  question_choice_text_math: string[];
  question_choice_images: string[];
  question_choice_weighted: number;
  created_at: Date;
  updated_at: Date;
}

export interface bannerQuestionChoiceResponse {
  question_choice_images?: string[];
}
