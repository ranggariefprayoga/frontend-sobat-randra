import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { getAllQuizSessionByUser, getHistorySessionDetailByUser, WebResponseDetailHistorySession } from "@/model/quiz-history.model";
import { WebResponse } from "@/model/web-reponse.model";

// Hook untuk mengambil daftar sesi quiz yang dikerjakan user
export const useGetQuizSessionsForUser = () => {
  return useQuery<WebResponse<getAllQuizSessionByUser[]>, Error>({
    queryKey: ["quiz-sessions"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz-history/sessions`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};
export const useGetQuizSessionsFreeForUser = () => {
  return useQuery<WebResponse<getAllQuizSessionByUser[]>, Error>({
    queryKey: ["quiz-sessions"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz-history/sessions/free`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};

// Hook untuk mengambil detail soal dari sesi yang telah dikerjakan user
export const useGetQuizSessionQuestionDetailForUser = (try_out_session_id: number, product_try_out_id: number, question_id: number) => {
  return useQuery<WebResponseDetailHistorySession<getHistorySessionDetailByUser>, Error>({
    queryKey: ["quiz-session-question-detail", try_out_session_id, product_try_out_id, question_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz-history/session/${try_out_session_id}/product/${product_try_out_id}/question/${question_id}/detail`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};
export const useGetFreeQuizSessionQuestionDetailForUser = (try_out_session_id: number, product_try_out_id: number, question_id: number) => {
  return useQuery<WebResponseDetailHistorySession<getHistorySessionDetailByUser>, Error>({
    queryKey: ["quiz-session-question-detail-free", try_out_session_id, product_try_out_id, question_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz-history/session/${try_out_session_id}/product/${product_try_out_id}/question/${question_id}/detail/free`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};
