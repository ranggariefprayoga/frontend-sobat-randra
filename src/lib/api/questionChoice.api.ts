import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { CreateQuestionChoiceRequest, QuestionChoiceResponse, UpdateQuestionChoiceRequest } from "@/model/questionChoice.model";

type QuestionChoicePayload = {
  productId: number | string;
  questionId: number | string;
  data?: CreateQuestionChoiceRequest | UpdateQuestionChoiceRequest;
  files?: File[];
  questionChoiceId?: number | string;
};

// Get all choices
export const useGetAllQuestionChoices = (productId?: number | string, questionId?: number | string) => {
  return useQuery<WebResponse<QuestionChoiceResponse[]>, Error>({
    queryKey: ["question-choice", productId, questionId],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${productId}/questions/${questionId}/choice`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(productId && questionId),
    retry: false,
  });
};

// Get choice by ID
export const useGetQuestionChoiceById = (productId?: number | string, questionId?: number | string, questionChoiceId?: number | string) => {
  return useQuery<WebResponse<QuestionChoiceResponse>, Error>({
    queryKey: ["question-choice", productId, questionId, questionChoiceId],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${productId}/questions/${questionId}/choice/${questionChoiceId}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(productId && questionId && questionChoiceId),
    retry: false,
  });
};

// Create choice
export const useCreateQuestionChoice = (): UseMutationResult<WebResponse<QuestionChoiceResponse>, Error, QuestionChoicePayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, questionId, data, files }) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (files) files.forEach((file) => formData.append("question_choice_images", file));

      const res = await axios.post(`${API_BASE_URL}/api/products/tryout/${productId}/questions/${questionId}/choice`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["question-choice", variables.productId, variables.questionId] });
    },
  });
};

// Update choice
export const useUpdateQuestionChoice = (): UseMutationResult<WebResponse<QuestionChoiceResponse>, Error, QuestionChoicePayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, questionId, questionChoiceId, data, files }) => {
      const formData = new FormData();
      if (data) formData.append("data", JSON.stringify(data));
      if (files) files.forEach((file) => formData.append("question_choice_images", file));

      const res = await axios.patch(`${API_BASE_URL}/api/products/tryout/${productId}/questions/${questionId}/choice/${questionChoiceId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["question-choice", variables.productId, variables.questionId] });
      if (variables.questionChoiceId) {
        queryClient.invalidateQueries({
          queryKey: ["question-choice", variables.productId, variables.questionId, variables.questionChoiceId],
        });
      }
    },
  });
};

// Delete all choices in a question
export const useDeleteAllQuestionChoices = (): UseMutationResult<WebResponse<string>, Error, { productId: number; questionId: number }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, questionId }) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout/${productId}/questions/${questionId}/choice`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, { productId, questionId }) => {
      queryClient.invalidateQueries({ queryKey: ["question-choice", productId, questionId] });
    },
  });
};

// Delete choice by ID
export const useDeleteQuestionChoiceById = (): UseMutationResult<WebResponse<string>, Error, { productId: number; questionId: number; questionChoiceId: number }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, questionId, questionChoiceId }) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout/${productId}/questions/${questionId}/choice/${questionChoiceId}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, { productId, questionId, questionChoiceId }) => {
      queryClient.invalidateQueries({ queryKey: ["question-choice", productId, questionId] });
      queryClient.invalidateQueries({ queryKey: ["question-choice", productId, questionId, questionChoiceId] });
    },
  });
};

// Get choice images
export const useGetQuestionChoiceImages = (productId?: number | string, questionId?: number | string, questionChoiceId?: number | string) => {
  return useQuery<WebResponse<string[]>, Error>({
    queryKey: ["question-choice", productId, questionId, questionChoiceId, "images"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${productId}/questions/${questionId}/choice/${questionChoiceId}/images`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(productId && questionId && questionChoiceId),
    retry: false,
  });
};
