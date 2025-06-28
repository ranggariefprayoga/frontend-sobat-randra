export interface WebPaginatedResponseForLeaderboards<T> {
  data: { myRank: T; topUsers: T[] } | null;
  meta: {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}

export interface CategoryScore {
  category: string;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  score: number;
}

export interface rankResponse {
  rank: number;
  name: string;
  email: string;
  score: number;
  status: string;
  session_id: number;
  category_score: CategoryScore[];
}
export interface productLeaderboardAvailable {
  id: number;
  name: string;
}
