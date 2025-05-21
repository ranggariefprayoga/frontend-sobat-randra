import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { AnswerExplanationResponse, CreateAnswerExplanationRequest, UpdateAnswerExplanationRequest } from "@/model/answerExplanation.model";

type AnswerExplanationPayload = {
  product_try_out_id: number | string;
  questionId: number | string;
  answerExplanationId?: number | string;
  data?: CreateAnswerExplanationRequest | UpdateAnswerExplanationRequest;
  files?: File[];
};

// Get all answer explanations in a question
export const useGetAllAnswerExplanations = (product_try_out_id?: number | string, questionId?: number | string) => {
  return useQuery<WebResponse<AnswerExplanationResponse[]>, Error>({
    queryKey: ["answer-explanation", product_try_out_id, questionId],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/answer-explanation`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && questionId),
    retry: false,
  });
};

// Get answer explanation by ID
export const useGetAnswerExplanationById = (product_try_out_id?: number | string, questionId?: number | string, answerExplanationId?: number | string) => {
  return useQuery<WebResponse<AnswerExplanationResponse>, Error>({
    queryKey: ["answer-explanation", product_try_out_id, questionId, answerExplanationId],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/answer-explanation/${answerExplanationId}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && questionId && answerExplanationId),
    retry: false,
  });
};

// Create answer explanation
export const useCreateAnswerExplanation = (): UseMutationResult<WebResponse<AnswerExplanationResponse>, Error, AnswerExplanationPayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, questionId, data, files }) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (files) files.forEach((file) => formData.append("answer_explanation_images", file));

      const res = await axios.post(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/answer-explanation`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["answer-explanation", variables.product_try_out_id, variables.questionId] });
    },
  });
};

// Update answer explanation
export const useUpdateAnswerExplanation = (): UseMutationResult<WebResponse<AnswerExplanationResponse>, Error, AnswerExplanationPayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, questionId, answerExplanationId, data, files }) => {
      const formData = new FormData();
      if (data) formData.append("data", JSON.stringify(data));
      if (files) files.forEach((file) => formData.append("answer_explanation_images", file));

      const res = await axios.patch(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/answer-explanation/${answerExplanationId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["answer-explanation", variables.product_try_out_id, variables.questionId] });
      queryClient.invalidateQueries({
        queryKey: ["answer-explanation", variables.product_try_out_id, variables.questionId, variables.answerExplanationId],
      });
    },
  });
};

// Delete all answer explanations in a question
export const useDeleteAllAnswerExplanations = (): UseMutationResult<WebResponse<string>, Error, { product_try_out_id: number; questionId: number }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, questionId }) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/answer-explanation`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, { product_try_out_id, questionId }) => {
      queryClient.invalidateQueries({ queryKey: ["answer-explanation", product_try_out_id, questionId] });
    },
  });
};

// Delete specific answer explanation by ID
export const useDeleteAnswerExplanationById = (): UseMutationResult<WebResponse<string>, Error, { product_try_out_id: number; questionId: number; answerExplanationId: number }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, questionId, answerExplanationId }) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/answer-explanation/${answerExplanationId}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, { product_try_out_id, questionId, answerExplanationId }) => {
      queryClient.invalidateQueries({ queryKey: ["answer-explanation", product_try_out_id, questionId] });
      queryClient.invalidateQueries({ queryKey: ["answer-explanation", product_try_out_id, questionId, answerExplanationId] });
    },
  });
};

// Get images of answer explanation
export const useGetAnswerExplanationImages = (product_try_out_id?: number | string, questionId?: number | string, answerExplanationId?: number | string) => {
  return useQuery<WebResponse<string[]>, Error>({
    queryKey: ["answer-explanation", product_try_out_id, questionId, answerExplanationId, "images"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/answer-explanation/${answerExplanationId}/images`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && questionId && answerExplanationId),
    retry: false,
  });
};
