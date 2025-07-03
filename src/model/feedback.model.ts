export interface CreateFeedbackRequest {
  rating: number;
  message: string;
}

export interface FeedbackResponse {
  id: number;
  rating: number;
  message: string;
  user_id: number;
  user_name: string;
  created_at: Date;
  updated_at: Date;
}
