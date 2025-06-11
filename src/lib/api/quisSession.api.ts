import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { TryOutSessionResponse } from "@/model/quiz-session.model";

// Get active quiz sessions
export const useGetAllQuizSessions = () => {
  return useQuery<WebResponse<TryOutSessionResponse[]>, Error>({
    queryKey: ["quiz-sessions"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};

// Check available free tryout session
export const useCheckAvailableFreeTryOut = (product_try_out_id?: number, user_id?: number) => {
  return useQuery<WebResponse<boolean>, Error>({
    queryKey: ["check-available-free", product_try_out_id, user_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/check-available-free/${product_try_out_id}/${user_id}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && user_id),
    retry: false,
  });
};

// Start a quiz session
export const useStartTryOutSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, password }: { product_try_out_id: number; password?: string }) => {
      const res = await axios.post(`${API_BASE_URL}/api/quiz/start/${product_try_out_id}`, { password }, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-sessions"] });
    },
  });
};

// Submit a quiz session
export const useSubmitTryOutSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${API_BASE_URL}/api/quiz/submit`, {}, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-sessions"] });
    },
  });
};

// Update premium quiz session
export const useUpdateTryOutSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ try_out_session_id, product_try_out_id, user_email }: { try_out_session_id: number; product_try_out_id: number; user_email: string }) => {
      const res = await axios.patch(`${API_BASE_URL}/api/quiz/session/update`, { try_out_session_id, product_try_out_id, user_email }, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-sessions"] });
    },
  });
};

// Check available premium tryout session
export const useCheckAvailablePremiumTryOut = (product_try_out_id?: number, user_email?: string) => {
  return useQuery<WebResponse<boolean>, Error>({
    queryKey: ["check-available-premium", product_try_out_id, user_email],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/check-available-premium/${product_try_out_id}/${user_email}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && user_email),
    retry: false,
  });
};

// Get quiz token
export const useGetQuizToken = () => {
  return useQuery<WebResponse<TryOutSessionResponse>, Error>({
    queryKey: ["quiz-token"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/quiz-token`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};
