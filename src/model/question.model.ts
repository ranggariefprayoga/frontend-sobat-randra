export interface CreateQuestionRequest {
  product_try_out_id?: number;
  number_of_question: number;
  category: string;
  question_text?: string[];
  question_text_math?: string[];
}

export interface UpdateQuestionRequest {
  question_text?: string[];
  question_text_math?: string[];
  question_images?: string[];
}

export interface QuestionResponse {
  id: number;
  product_try_out_id: number;
  number_of_question: number;
  _count?: {
    question_choices: number;
    answer_explanations: number;
  };
  question_text?: string[];
  question_text_math?: string[];
  question_images?: string[];
  category: string;
}

export interface bannerQuestionResponse {
  question_images?: string[];
}
