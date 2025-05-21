export interface CreateAnswerExplanationRequest {
  answer_explanation_text?: string[];
  answer_explanation_text_math?: string[];
  answer_explanation_images?: string[];
}

export interface UpdateAnswerExplanationRequest {
  answer_explanation_text?: string[];
  answer_explanation_text_math?: string[];
  answer_explanation_images?: string[];
}

export interface AnswerExplanationResponse {
  id: number;
  product_try_out_id: number;
  question_id: number;
  answer_explanation_text: string[];
  answer_explanation_text_math: string[];
  answer_explanation_images: string[];
}

export class bannerAnswerExplanationResponse {
  question_choice_images?: string[];
}
