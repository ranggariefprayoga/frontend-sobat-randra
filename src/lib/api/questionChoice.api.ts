import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { CreateQuestionChoiceRequest, QuestionChoiceResponse, UpdateQuestionChoiceRequest } from "@/model/questionChoice.model";

type QuestionChoicePayload = {
  product_try_out_id: number;
  questionId: number;
  data?: CreateQuestionChoiceRequest | UpdateQuestionChoiceRequest;
  files?: File[];
  questionChoiceId?: number;
};

// Get all choices
export const useGetAllQuestionChoices = (product_try_out_id?: number, questionId?: number) => {
  return useQuery<WebResponse<QuestionChoiceResponse[]>, Error>({
    queryKey: ["question-choice", product_try_out_id, questionId],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/choice`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && questionId),
    retry: false,
  });
};

// Get choice by ID
export const useGetQuestionChoiceById = (product_try_out_id?: number, questionId?: number, questionChoiceId?: number) => {
  return useQuery<WebResponse<QuestionChoiceResponse>, Error>({
    queryKey: ["question-choice", product_try_out_id, questionId, questionChoiceId],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/choice/${questionChoiceId}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && questionId && questionChoiceId),
    retry: false,
  });
};

// Create choice
export const useCreateQuestionChoice = (): UseMutationResult<WebResponse<QuestionChoiceResponse>, Error, QuestionChoicePayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, questionId, data, files }: QuestionChoicePayload) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (files) files.forEach((file) => formData.append("question_choice_images", file));

      const res = await axios.post(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/choice`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["question-choice", variables.product_try_out_id, variables.questionId] });
    },
  });
};

// Update choice
export const useUpdateQuestionChoice = (): UseMutationResult<WebResponse<QuestionChoiceResponse>, Error, QuestionChoicePayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, questionId, questionChoiceId, data, files }) => {
      const formData = new FormData();
      if (data) formData.append("data", JSON.stringify(data));
      if (files) files.forEach((file) => formData.append("question_choice_images", file));

      const res = await axios.patch(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/choice/${questionChoiceId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["question-choice", variables.product_try_out_id, variables.questionId] });
      if (variables.questionChoiceId) {
        queryClient.invalidateQueries({
          queryKey: ["question-choice", variables.product_try_out_id, variables.questionId, variables.questionChoiceId],
        });
      }
    },
  });
};

// Delete all choices in a question
export const useDeleteAllQuestionChoices = (): UseMutationResult<WebResponse<string>, Error, { product_try_out_id: number; questionId: number }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, questionId }) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/choice`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, { product_try_out_id, questionId }) => {
      queryClient.invalidateQueries({ queryKey: ["question-choice", product_try_out_id, questionId] });
    },
  });
};

// Delete choice by ID
export const useDeleteQuestionChoiceById = (): UseMutationResult<WebResponse<string>, Error, { product_try_out_id: number; questionId: number; questionChoiceId: number }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, questionId, questionChoiceId }) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/choice/${questionChoiceId}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, { product_try_out_id, questionId, questionChoiceId }) => {
      queryClient.invalidateQueries({ queryKey: ["question-choice", product_try_out_id, questionId] });
      queryClient.invalidateQueries({ queryKey: ["question-choice", product_try_out_id, questionId, questionChoiceId] });
    },
  });
};

// Get choice images
export const useGetQuestionChoiceImages = (product_try_out_id?: number, questionId?: number, questionChoiceId?: number) => {
  return useQuery<WebResponse<string[]>, Error>({
    queryKey: ["question-choice", product_try_out_id, questionId, questionChoiceId, "images"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/choice/${questionChoiceId}/images`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && questionId && questionChoiceId),
    retry: false,
  });
};
