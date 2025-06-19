import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { BimbelBarengAccessResponse, CreateBimbelBarengAccessRequest, UpdateBimbelBarengAccessRequest } from "@/model/productBimbelBarengAccess";

// Get all bimbel bareng access (protected)
export const useGetAllBimbelBarengAccess = (product_bimbel_bareng_id: number) => {
  return useQuery<WebResponse<BimbelBarengAccessResponse[]>, Error>({
    queryKey: ["bimbel-bareng", "access", product_bimbel_bareng_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}/access`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};
export const useGetCountBimbelBarengAccess = (product_bimbel_bareng_id: number) => {
  return useQuery<WebResponse<number>, Error>({
    queryKey: ["bimbel-bareng", "access", product_bimbel_bareng_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}/access/count`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};

// Get bimbel bareng access by ID (protected)
export const useGetBimbelBarengAccessById = (product_bimbel_bareng_id: number, bimbel_bareng_access_id: number) => {
  return useQuery<WebResponse<BimbelBarengAccessResponse>, Error>({
    queryKey: ["bimbel-bareng", "access", product_bimbel_bareng_id, bimbel_bareng_access_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}/access/${bimbel_bareng_access_id}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_bimbel_bareng_id && bimbel_bareng_access_id),
    retry: false,
  });
};

// Create bimbel bareng access
export const useCreateBimbelBarengAccess = (): UseMutationResult<WebResponse<BimbelBarengAccessResponse>, Error, { product_bimbel_bareng_id: number; data: CreateBimbelBarengAccessRequest }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_bimbel_bareng_id, data }) => {
      const res = await axios.post(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}/access`, data, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bimbel-bareng", "access"] });
    },
  });
};

// Update bimbel bareng access
export const useUpdateBimbelBarengAccess = (): UseMutationResult<WebResponse<BimbelBarengAccessResponse>, Error, { product_bimbel_bareng_id: number; bimbel_bareng_access_id: number; data: UpdateBimbelBarengAccessRequest }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_bimbel_bareng_id, bimbel_bareng_access_id, data }) => {
      const res = await axios.patch(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}/access/${bimbel_bareng_access_id}`, data, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, { product_bimbel_bareng_id, bimbel_bareng_access_id }) => {
      queryClient.invalidateQueries({ queryKey: ["bimbel-bareng", "access", product_bimbel_bareng_id, bimbel_bareng_access_id] });
    },
  });
};

// Delete bimbel bareng access by ID
export const useDeleteBimbelBarengAccessById = (): UseMutationResult<WebResponse<string>, Error, { product_bimbel_bareng_id: number; bimbel_bareng_access_id: number }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_bimbel_bareng_id, bimbel_bareng_access_id }) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}/access/${bimbel_bareng_access_id}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, { product_bimbel_bareng_id }) => {
      queryClient.invalidateQueries({ queryKey: ["bimbel-bareng", "access", product_bimbel_bareng_id] });
    },
  });
};

// Delete all bimbel bareng access for a product
export const useDeleteAllBimbelBarengAccess = (): UseMutationResult<WebResponse<{ deletedCount: string }>, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product_bimbel_bareng_id: number) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}/access`, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bimbel-bareng", "access"] });
    },
  });
};

export const useCheckAvailableBimbelBareng = (product_bimbel_bareng_id?: number, user_email?: string) => {
  return useQuery<WebResponse<boolean>, Error>({
    queryKey: ["bimbel-bareng", "access", product_bimbel_bareng_id, user_email],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}/access/check-available/${user_email}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_bimbel_bareng_id && user_email),
    retry: false,
  });
};
