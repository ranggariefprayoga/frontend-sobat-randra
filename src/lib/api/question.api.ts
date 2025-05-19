import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { CreateQuestionRequest, QuestionResponse, UpdateQuestionRequest } from "@/model/question.model";

type QuestionPayload = {
  productId: number | string;
  questionId?: number | string;
  data?: CreateQuestionRequest | UpdateQuestionRequest;
  files?: File[];
};

export interface CreateQuestionArgs {
  productId: string | number;
  data: CreateQuestionRequest;
  files?: File[];
}

// Check if all questions are fulfilled
export const useCheckAllQuestionsWasFullfiled = (product_try_out_id?: number | string, question_id?: number | string, answer_explanation_id?: number | string) => {
  return useQuery<WebResponse<boolean>, Error>({
    queryKey: ["questions", product_try_out_id, question_id, answer_explanation_id, "fullfilled-check"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/fullfilled/admin`, {
        params: { product_try_out_id, question_id, answer_explanation_id },
        withCredentials: true,
      });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && question_id && answer_explanation_id),
    retry: false,
  });
};

// Get all valid questions for admin
export const useGetValidQuestionsAdmin = (productId?: number | string) => {
  return useQuery<WebResponse<QuestionResponse[]>, Error>({
    queryKey: ["questions", productId, "valid", "admin"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${productId}/questions/valid-questions/admin`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(productId),
    retry: false,
  });
};

// Get all valid questions for user
export const useGetValidQuestionsUser = (productId?: number | string) => {
  return useQuery<WebResponse<QuestionResponse[]>, Error>({
    queryKey: ["questions", productId, "valid", "user"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${productId}/questions/valid-questions/user`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(productId),
    retry: false,
  });
};

// Get all questions in a product
export const useGetAllQuestionsInProduct = (productId?: number | string) => {
  return useQuery<WebResponse<QuestionResponse[]>, Error>({
    queryKey: ["questions", productId],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${productId}/questions`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: Boolean(productId),
    retry: false,
  });
};

export const useGetQuestionByNumber = (productId?: number, number?: number) => {
  return useQuery<WebResponse<QuestionResponse>, Error>({
    queryKey: ["question", productId, number],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${productId}/questions/number/${number}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(productId && number),
    retry: false,
  });
};

// Get question detail
export const useGetQuestionById = (productId?: number | string, questionId?: number | string) => {
  return useQuery<WebResponse<QuestionResponse>, Error>({
    queryKey: ["questions", productId, questionId],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${productId}/questions/${questionId}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(productId && questionId),
    retry: false,
  });
};

// Create question
export const useCreateQuestion = (): UseMutationResult<WebResponse<QuestionResponse>, Error, CreateQuestionArgs> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, data, files }) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (files) files.forEach((file) => formData.append("question_images", file));

      const res = await axios.post(`${API_BASE_URL}/api/products/tryout/${productId}/questions`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      if (!variables) return;
      const productId = variables.productId;
      // Refresh all questions list for this product
      queryClient.invalidateQueries({ queryKey: ["questions", productId] });
      // Refresh valid questions for admin as well
      queryClient.invalidateQueries({ queryKey: ["questions", productId, "valid", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["questions", productId, "valid", "user"] });
    },
  });
};

// Update question
export const useUpdateQuestion = (): UseMutationResult<WebResponse<QuestionResponse>, Error, QuestionPayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, questionId, data, files }) => {
      const formData = new FormData();
      if (data) formData.append("data", JSON.stringify(data));
      if (files) files.forEach((file) => formData.append("question_images", file));

      const res = await axios.patch(`${API_BASE_URL}/api/products/tryout/${productId}/questions/${questionId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      if (!variables) return;
      const productId = variables.productId;
      const questionId = variables.questionId;
      // Refresh all questions list for this product
      queryClient.invalidateQueries({ queryKey: ["questions", productId] });
      // Refresh question detail
      if (questionId) queryClient.invalidateQueries({ queryKey: ["questions", productId, questionId] });
      // Refresh valid questions
      queryClient.invalidateQueries({ queryKey: ["questions", productId, "valid", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["questions", productId, "valid", "user"] });
    },
  });
};

// Delete all questions in a product
export const useDeleteAllQuestions = (): UseMutationResult<WebResponse<string>, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout/${productId}/questions`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ["questions", productId] });
      queryClient.invalidateQueries({ queryKey: ["questions", productId, "valid", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["questions", productId, "valid", "user"] });
    },
  });
};

// Delete question by ID
export const useDeleteQuestionById = (): UseMutationResult<WebResponse<string>, Error, { productId: number; questionId: number }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, questionId }) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout/${productId}/questions/${questionId}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, { productId, questionId }) => {
      queryClient.invalidateQueries({ queryKey: ["questions", productId] });
      queryClient.invalidateQueries({ queryKey: ["questions", productId, questionId] });
      queryClient.invalidateQueries({ queryKey: ["questions", productId, "valid", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["questions", productId, "valid", "user"] });
    },
  });
};

// Get question image
export const useGetQuestionImages = (productId?: number | string, questionId?: number | string) => {
  return useQuery<WebResponse<string[]>, Error>({
    queryKey: ["questions", productId, questionId, "images"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${productId}/questions/${questionId}/images`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: Boolean(productId && questionId),
    retry: false,
  });
};
