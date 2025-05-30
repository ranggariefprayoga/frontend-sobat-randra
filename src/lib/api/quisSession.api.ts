import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { submitFreeQuizSessionResponse, TryOutSessionResponse } from "@/model/quiz-session.model";

// 🔍 Check password (by product ID)
export const useCheckQuizPassword = () => {
  return useMutation<WebResponse<boolean>, Error, { product_try_out_id: number; password: string }>({
    mutationFn: async ({ product_try_out_id, password }) => {
      const res = await axios.post(`${API_BASE_URL}/api/quiz/check-password/${product_try_out_id}`, { password }, { withCredentials: true });
      return res.data;
    },
  });
};

// 🔍 Check availability of premium tryout session (admin only)
export const useCheckAvailablePremiumSession = (product_try_out_id: number | undefined, user_email: string) => {
  return useQuery<WebResponse<boolean>, Error>({
    queryKey: ["quiz", "session", "check-premium", product_try_out_id, user_email],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/check-available-premium/${product_try_out_id}/${user_email}`, { withCredentials: true });
      return res.data;
    },
    enabled: !!product_try_out_id && !!user_email,
  });
};

// 🚀 Start free quiz session
export const useStartFreeQuizSession = () => {
  return useMutation<WebResponse<TryOutSessionResponse>, Error, { product_try_out_id: number; password: string }>({
    mutationFn: async ({ product_try_out_id, password }) => {
      const res = await axios.post(`${API_BASE_URL}/api/quiz/start/free/${product_try_out_id}`, { password }, { withCredentials: true });
      return res.data;
    },
  });
};

// ✅ Submit quiz session
export const useSubmitFreeQuizSession = () => {
  const queryClient = useQueryClient();
  return useMutation<WebResponse<submitFreeQuizSessionResponse>, Error>({
    mutationFn: async () => {
      const res = await axios.post(`${API_BASE_URL}/api/quiz/submit/free`, {}, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz", "session"] });
    },
  });
};

// 🔍 Check availability of free session (admin only)
export const useCheckAvailableFreeSession = (product_try_out_id: number, user_id: number) => {
  return useQuery<WebResponse<boolean>, Error>({
    queryKey: ["quiz", "session", "check", product_try_out_id, user_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/check-available-free/${product_try_out_id}/${user_id}`, { withCredentials: true });
      return res.data;
    },
    enabled: !!product_try_out_id && !!user_id,
  });
};

// 📦 Get all quiz sessions (admin)
export const useGetAllQuizSessions = () => {
  return useQuery<WebResponse<TryOutSessionResponse[]>, Error>({
    queryKey: ["quiz", "session", "all"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz`, { withCredentials: true });
      return res.data;
    },
  });
};

// 📦 Get quiz sessions by product ID (admin)
export const useGetQuizSessionsByProductId = (product_try_out_id: number) => {
  return useQuery<WebResponse<TryOutSessionResponse[]>, Error>({
    queryKey: ["quiz", "session", "byProduct", product_try_out_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/${product_try_out_id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!product_try_out_id,
  });
};

// 📦 Get session by product + session ID (user only)
export const useGetQuizSessionByProductAndSession = (product_try_out_id: number, session_id: number) => {
  return useQuery<WebResponse<TryOutSessionResponse>, Error>({
    queryKey: ["quiz", "session", product_try_out_id, session_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/${product_try_out_id}/${session_id}`, { withCredentials: true });
      return res.data;
    },
    enabled: !!product_try_out_id && !!session_id,
  });
};

// 🗑️ Delete quiz session (admin)
export const useDeleteQuizSession = (): UseMutationResult<WebResponse<string>, Error, { product_try_out_id: number; session_id: number }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, session_id }) => {
      const res = await axios.delete(`${API_BASE_URL}/api/quiz/${product_try_out_id}/${session_id}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, { product_try_out_id }) => {
      queryClient.invalidateQueries({ queryKey: ["quiz", "session", "all"] });
      queryClient.invalidateQueries({ queryKey: ["quiz", "session", "byProduct", product_try_out_id] });
    },
  });
};
