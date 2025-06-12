import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { TryOutAnswerResponse } from "@/model/quiz-answer.model";

// Save user answer
export const useSaveUserAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, question_id, question_choice_id }: { product_try_out_id: number; question_id: number; question_choice_id: number }) => {
      const res = await axios.post(`${API_BASE_URL}/api/quiz/answer/${product_try_out_id}`, { question_id, question_choice_id }, { withCredentials: true });
      return res.data;
    },

    // Optimistic update (we assume success immediately)
    onMutate: async ({ product_try_out_id, question_id, question_choice_id }) => {
      // Immediately update UI with optimistic data
      await queryClient.cancelQueries({ queryKey: ["user-answers", product_try_out_id, question_id] });

      // Optimistically update the selected choice for the given question
      queryClient.setQueryData(["user-answers", product_try_out_id, question_id], (oldData: WebResponse<TryOutAnswerResponse> | undefined) => {
        if (!oldData) return;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            question_choice_id: question_choice_id, // Optimistic update
          },
        };
      });
    },

    // Refetch data after mutation is completed
    onSettled: async ({ product_try_out_id, question_id }) => {
      // Invalidate the query to refetch the updated data after the mutation is settled
      await queryClient.invalidateQueries({ queryKey: ["user-answers", product_try_out_id, question_id] }); // Refetch data after mutation is settled
    },
  });
};

// Get user answer by product and question ID
export const useGetUserAnswerByProductAndQuestionId = (product_try_out_id?: number, try_out_session_id?: number, question_id?: number) => {
  return useQuery<WebResponse<TryOutAnswerResponse>, Error>({
    queryKey: ["user-answer", product_try_out_id, try_out_session_id, question_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/answer/user/product/${product_try_out_id}/answers/session/${try_out_session_id}/question/${question_id}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && try_out_session_id && question_id),
    retry: false,
    // Immediately refetch the data when the mutation changes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

// Check if user has answered or not
export const useCheckUserHasAnsweredOrNot = (product_try_out_id?: number, try_out_session_id?: number) => {
  return useQuery<WebResponse<number[]>, Error>({
    queryKey: ["check-user-answered", product_try_out_id, try_out_session_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/answer/user/product/${product_try_out_id}/answers/session/${try_out_session_id}/check`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && try_out_session_id), // Make sure all values exist before running query
    retry: false,
  });
};
