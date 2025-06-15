export interface WebPaginatedResponseForLeaderboards<T> {
  data: { myRank: T; topUsers: T[] } | null;
  meta: {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}

export interface rankResponse {
  rank: number;
  name: string;
  email: string;
  score: number;
}

export interface productLeaderboardAvailable {
  id: number;
  name: string;
}
