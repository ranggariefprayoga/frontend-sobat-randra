import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { CreateFeedbackRequest, FeedbackResponse } from "@/model/feedback.model";
import { WebPaginatedResponse } from "@/model/user.model";

export const useGetAllFeedback = (page: number = 1, limit: number = 10) => {
  return useQuery<WebPaginatedResponse<FeedbackResponse[]>, Error>({
    queryKey: ["feedback", "paginated", page, limit],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/feedback?page=${page}&limit=${limit}`, {
        withCredentials: true,
      });
      return res.data;
    },
    retry: false,
  });
};

export const useGetFiveStarFeedback = () => {
  return useQuery<WebResponse<FeedbackResponse[]>, Error>({
    queryKey: ["feedback", "five-star"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/feedback/five-star`);
      return res.data;
    },
    retry: false,
  });
};

export const useCreateFeedback = (): UseMutationResult<WebResponse<FeedbackResponse>, Error, CreateFeedbackRequest> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateFeedbackRequest) => {
      const res = await axios.post(`${API_BASE_URL}/api/feedback`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
  });
};

export const useDeleteFeedbackById = (): UseMutationResult<WebResponse<string>, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (feedbackId: number) => {
      const res = await axios.delete(`${API_BASE_URL}/api/feedback/${feedbackId}`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
  });
};
