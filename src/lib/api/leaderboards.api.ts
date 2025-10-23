import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { productLeaderboardAvailable, rankResponse, WebPaginatedResponseForLeaderboards } from "@/model/leaderboards.model";

// Get product TryOuts for leaderboard
export const useGetProductTryOutsForLeaderboard = () => {
  return useQuery<WebResponse<productLeaderboardAvailable[]>, Error>({
    queryKey: ["product-try-outs-leaderboard"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz-results/user/product-try-out`, { withCredentials: true });
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// Get quiz leaderboard for user (pagination, search)
export const useGetQuizLeaderboardForUser = (product_try_out_id?: number | null, limit: number = 10, page: number = 1, search: string = "") => {
  return useQuery<WebPaginatedResponseForLeaderboards<rankResponse>, Error>({
    queryKey: ["quiz-leaderboard", product_try_out_id, limit, page, search],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz-results/user/product-try-out/${product_try_out_id}`, {
        params: {
          limit,
          page,
          search,
        },
        withCredentials: true,
      });
      return res.data;
    },
    enabled: Boolean(product_try_out_id),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
