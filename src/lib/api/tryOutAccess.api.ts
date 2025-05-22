import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { CreateProductAccessTryOut, ProductAccessTryOutResponse, UpdateProductAccessTryOut } from "@/model/productAccess.model";
import { WebPaginatedResponse } from "@/model/user.model";

// GET all accesses for a tryout with pagination & search
export const useGetTryOutAccesses = (product_try_out_id?: number, page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["tryout-access", product_try_out_id, page, limit, search],
    queryFn: async () => {
      if (!product_try_out_id) throw new Error("product_try_out_id required");

      const res = await axios.get<WebPaginatedResponse<ProductAccessTryOutResponse[]>>(`${API_BASE_URL}/api/products/${product_try_out_id}/access`, {
        params: { page, limit, search },
        withCredentials: true,
      });
      return res.data;
    },
    enabled: Boolean(product_try_out_id),
    retry: false,
  });
};

// CREATE tryout access
export const useCreateTryOutAccess = (): UseMutationResult<WebResponse<ProductAccessTryOutResponse>, Error, CreateProductAccessTryOut> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateProductAccessTryOut) => {
      const res = await axios.post(`${API_BASE_URL}/api/products/${data.product_try_out_id}/access`, data, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tryout-access", variables.product_try_out_id],
      });
    },
  });
};

// UPDATE tryout access by ID
export const useUpdateTryOutAccess = (): UseMutationResult<WebResponse<ProductAccessTryOutResponse>, Error, { id: number; data: UpdateProductAccessTryOut; product_try_out_id: number }> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data, product_try_out_id }) => {
      const res = await axios.patch(`${API_BASE_URL}/api/products/${product_try_out_id}/access/${id}`, data, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tryout-access", variables.product_try_out_id],
      });
    },
  });
};

// DELETE tryout access by ID
export const useDeleteTryOutAccess = (): UseMutationResult<WebResponse<ProductAccessTryOutResponse>, Error, { id: number; product_try_out_id: number }> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, product_try_out_id }) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/${product_try_out_id}/access/${id}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tryout-access", variables.product_try_out_id],
      });
    },
  });
};

// DELETE all accesses by product_try_out_id
export const useDeleteAllTryOutAccesses = (): UseMutationResult<WebResponse<{ deletedCount: string }>, Error, { product_try_out_id: number }> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ product_try_out_id }) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/${product_try_out_id}/access`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tryout-access", variables.product_try_out_id],
      });
    },
  });
};

// GET count of accesses for a tryout
export const useCountTryOutAccess = (product_try_out_id?: number) => {
  return useQuery({
    queryKey: ["tryout-access-count", product_try_out_id],
    queryFn: async () => {
      if (!product_try_out_id) throw new Error("product_try_out_id is required");
      const res = await axios.get<WebResponse<number>>(`${API_BASE_URL}/api/products/${product_try_out_id}/access/count`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!product_try_out_id,
    retry: false,
  });
};

// GET tryout access by ID
export const useGetTryOutAccessById = (product_try_out_id?: number, try_out_access_id?: number) => {
  return useQuery({
    queryKey: ["tryout-access", product_try_out_id, try_out_access_id],
    queryFn: async () => {
      if (!product_try_out_id || !try_out_access_id) throw new Error("product_try_out_id and try_out_access_id are required");
      const res = await axios.get<WebResponse<ProductAccessTryOutResponse>>(`${API_BASE_URL}/api/products/${product_try_out_id}/access/${try_out_access_id}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id && try_out_access_id),
    retry: false,
  });
};
