import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { getAllQuizSessionByUser, getHistorySessionDetailByUser, WebResponseDetailHistorySession, WebResponseSession } from "@/model/quiz-history.model";

// Hook untuk mengambil daftar sesi quiz yang dikerjakan user
export const useGetQuizSessionsForUser = (page: number = 1, limit: number = 10) => {
  return useQuery<WebResponseSession<getAllQuizSessionByUser[]>, Error>({
    queryKey: ["quiz-sessions", page, limit],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz-history/sessions?page=${page}&limit=${limit}`, { withCredentials: true });
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
