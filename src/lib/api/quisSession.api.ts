import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { WebResponse } from "@/model/web-reponse.model";
import { quizTokenExtractResponse, TryOutSessionResponse } from "@/model/quiz-session.model";
import { API_BASE_URL } from "../apiBaseUrl";

interface UpdateFreeQuizSessionVariables {
  productTryOutId: number;
  userId: number;
  expiredAt: string;
}

export const useQuizToken = () => {
  return useQuery<WebResponse<quizTokenExtractResponse>, Error>({
    queryKey: ["quiz", "check-free"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/quiz-token/free`, {
        withCredentials: true,
      });
      return res.data;
    },
  });
};

export const useUpdateFreeQuizSession = () => {
  return useMutation<WebResponse<TryOutSessionResponse>, Error, UpdateFreeQuizSessionVariables>({
    mutationFn: async ({ productTryOutId, userId, expiredAt }) => {
      const res = await axios.post<WebResponse<TryOutSessionResponse>>(
        `${API_BASE_URL}/api/quiz/update/free`,
        {
          product_try_out_id: productTryOutId,
          user_id: userId,
          expired_at: expiredAt,
        },
        { withCredentials: true }
      );
      return res.data;
    },
  });
};
// ✅ Check password for free product
export const useCheckFreeTryOutPassword = () => {
  return useMutation({
    mutationFn: async ({ productTryOutId, password }: { productTryOutId: number | string; password: string }) => {
      const res = await axios.post<WebResponse<boolean>>(`${API_BASE_URL}/api/quiz/check-password/${productTryOutId}`, { password }, { withCredentials: true });
      return res.data;
    },
  });
};

// ✅ Start free quiz session
export const useStartFreeTryOut = () => {
  return useMutation({
    mutationFn: async ({ productTryOutId, password }: { productTryOutId: number | string; password: string }) => {
      const res = await axios.post<WebResponse<TryOutSessionResponse>>(`${API_BASE_URL}/api/quiz/start/free/${productTryOutId}`, { password }, { withCredentials: true });
      return res.data;
    },
  });
};

// ✅ Submit free try out session
export const useSubmitFreeQuizSession = () => {
  return useMutation({
    mutationFn: async () => {
      // Send a POST request to the backend to submit the free quiz session
      const res = await axios.post<WebResponse<TryOutSessionResponse>>(
        `${API_BASE_URL}/api/quiz/submit/free`,
        {}, // Body can be empty if no extra data is required
        { withCredentials: true } // Ensures that cookies are sent with the request
      );

      return res.data; // Return the response data
    },
  });
};

// ✅ Check available free session
export const useCheckAvailableFree = (productTryOutId: number, userId: number | undefined, options?: UseQueryOptions<WebResponse<boolean>, Error>) => {
  return useQuery<WebResponse<boolean>, Error>({
    queryKey: ["check-free", productTryOutId, userId],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/check-available-free/${productTryOutId}/${userId}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: Boolean(productTryOutId && userId),
    ...options,
  });
};

// ✅ Check available premium session
export const useCheckAvailablePremium = (productTryOutId: number | string, userEmail: string) => {
  return useQuery<WebResponse<boolean>>({
    queryKey: ["quiz", "available-premium", productTryOutId, userEmail],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/check-available-premium/${productTryOutId}/${userEmail}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: Boolean(productTryOutId && userEmail),
  });
};
