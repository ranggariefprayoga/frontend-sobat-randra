import { QuizSessionModel } from "@/model/quiz-session.model";

export const QuizSessionDataDummy: QuizSessionModel[] | [] = [
  {
    id: 1,
    user_id: 1,
    product_try_out_id: 3,
    token: "3",
    started_at: "2025-05-06T00:00:00.000Z",
    expired_at: "2025-05-06T19:00:00.000Z",
    is_active: true,
    is_completed: false,
    for_product_free: true,
    created_at: "2025-05-06T00:00:00.000Z",
    updated_at: "2025-05-06T00:00:00.000Z",
  },
];
