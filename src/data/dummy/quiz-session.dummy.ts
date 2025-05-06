import { QuizSessionModel } from "@/model/quiz-session.model";

export const QuizSessionDataDummy: QuizSessionModel[] | [] = [
  {
    id: 1,
    user_id: 1,
    product_id: 3,
    token: null,
    started_at: "2025-05-06T00:00:00.000Z",
    expired_at: "2025-05-06T16:00:00.000Z",
    is_active: false,
    is_completed: true,
    for_product_free: true,
    created_at: "2025-05-06T00:00:00.000Z",
    updated_at: "2025-05-06T00:00:00.000Z",
  },
];
