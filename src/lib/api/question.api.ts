import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { CreateQuestionRequest, QuestionResponse, UpdateQuestionRequest } from "@/model/question.model";

export type QuestionPayload = {
  product_try_out_id: number;
  questionId?: number;
  data: CreateQuestionRequest | UpdateQuestionRequest;
  files?: File[];
};

export interface CreateQuestionArgs {
  product_try_out_id: number;
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
export const useGetValidQuestionsAdmin = (product_try_out_id?: number | string) => {
  return useQuery<WebResponse<QuestionResponse[]>, Error>({
    queryKey: ["questions", product_try_out_id, "valid", "admin"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/valid-questions/admin`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id),
    retry: false,
  });
};

// Get all valid questions for user
export const useGetValidQuestionsUser = (product_try_out_id?: number | string) => {
  return useQuery<WebResponse<QuestionResponse[]>, Error>({
    queryKey: ["questions", product_try_out_id, "valid", "user"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/valid-questions/user`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id),
    retry: false,
  });
};

// Get all questions in a product
export const useGetAllQuestionsInProduct = (product_try_out_id?: number | string) => {
  return useQuery<WebResponse<QuestionResponse[]>, Error>({
    queryKey: ["questions", product_try_out_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: Boolean(product_try_out_id),
    retry: false,
  });
};

export const useGetQuestionByNumber = (product_try_out_id?: number, number?: number) => {
  return useQuery<WebResponse<QuestionResponse>, Error>({
    queryKey: ["question", product_try_out_id, number],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/number/${number}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && number),
    retry: false,
  });
};

// Get question detail
export const useGetQuestionById = (product_try_out_id?: number | string, questionId?: number | string) => {
  return useQuery<WebResponse<QuestionResponse>, Error>({
    queryKey: ["questions", product_try_out_id, questionId],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && questionId),
    retry: false,
  });
};

// Create question
export const useCreateQuestion = (): UseMutationResult<WebResponse<QuestionResponse>, Error, CreateQuestionArgs> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, data, files }) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (files) files.forEach((file) => formData.append("question_images", file));

      const res = await axios.post(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      if (!variables) return;
      const product_try_out_id = variables.product_try_out_id;
      // Refresh all questions list for this product
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id] });
      // Refresh valid questions for admin as well
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id, "valid", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id, "valid", "user"] });
    },
  });
};

// Update question
export const useUpdateQuestion = (): UseMutationResult<WebResponse<QuestionResponse>, Error, QuestionPayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, questionId, data, files }) => {
      const formData = new FormData();
      if (data) formData.append("data", JSON.stringify(data));
      if (files) files.forEach((file) => formData.append("question_images", file));

      const res = await axios.patch(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      if (!variables) return;
      const product_try_out_id = variables.product_try_out_id;
      const questionId = variables.questionId;
      // Refresh all questions list for this product
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id] });
      // Refresh question detail
      if (questionId) queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id, questionId] });
      // Refresh valid questions
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id, "valid", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id, "valid", "user"] });
    },
  });
};

// Delete all questions in a product
export const useDeleteAllQuestions = (): UseMutationResult<WebResponse<string>, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product_try_out_id: number) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, product_try_out_id) => {
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id] });
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id, "valid", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id, "valid", "user"] });
    },
  });
};

// Delete question by ID
export const useDeleteQuestionById = (): UseMutationResult<WebResponse<string>, Error, { product_try_out_id: number; questionId: number }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_try_out_id, questionId }) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, { product_try_out_id, questionId }) => {
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id] });
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id, questionId] });
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id, "valid", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["questions", product_try_out_id, "valid", "user"] });
    },
  });
};

// Get question image
export const useGetQuestionImages = (product_try_out_id?: number | string, questionId?: number | string) => {
  return useQuery<WebResponse<string[]>, Error>({
    queryKey: ["questions", product_try_out_id, questionId, "images"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/questions/${questionId}/images`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && questionId),
    retry: false,
  });
};
