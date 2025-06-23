import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { ProductSmartbookResponse, updateProductSmartbookRequest } from "@/model/productSmartbook.model";

// Get all smartbook products (protected)
export const useGetAllSmartbookProducts = () => {
  return useQuery<WebResponse<ProductSmartbookResponse[]>, Error>({
    queryKey: ["products", "smartbook"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/smartbook`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};

// Get smartbook products for home (public)
export const useGetSmartbookProductsForHome = () => {
  return useQuery<WebResponse<ProductSmartbookResponse[]>, Error>({
    queryKey: ["products", "smartbook", "home"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/smartbook/home`);
      return res.data;
    },
    retry: false,
  });
};

// Get smartbook product by ID (protected)
export const useGetSmartbookProductByIdForUser = (product_smartbook_id: number) => {
  return useQuery<WebResponse<ProductSmartbookResponse>, Error>({
    queryKey: ["products", "smartbook", product_smartbook_id],
    queryFn: async () => {
      if (!product_smartbook_id) throw new Error("product_smartbook_id is required");
      const res = await axios.get(`${API_BASE_URL}/api/products/smartbook/${product_smartbook_id}/user`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_smartbook_id),
    retry: false,
  });
};

export const useGetSmartbookProductByIdForAdmin = (product_smartbook_id: number) => {
  return useQuery<WebResponse<ProductSmartbookResponse>, Error>({
    queryKey: ["products", "smartbook", product_smartbook_id],
    queryFn: async () => {
      if (!product_smartbook_id) throw new Error("product_smartbook_id is required");
      const res = await axios.get(`${API_BASE_URL}/api/products/smartbook/${product_smartbook_id}/admin`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_smartbook_id),
    retry: false,
  });
};

// Create new smartbook product
export const useCreateSmartbookProduct = (): UseMutationResult<WebResponse<ProductSmartbookResponse>, Error, { data: string; banner_image: File }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, banner_image }) => {
      const formData = new FormData();
      formData.append("data", data);
      formData.append("banner_image", banner_image);

      const res = await axios.post(`${API_BASE_URL}/api/products/smartbook`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "smartbook"] });
      queryClient.invalidateQueries({ queryKey: ["products", "smartbook", "home"] });
    },
  });
};

// Update smartbook product
export const useUpdateSmartbookProduct = (): UseMutationResult<WebResponse<ProductSmartbookResponse>, Error, { product_smartbook_id: number; data: updateProductSmartbookRequest; banner_image: File | null }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_smartbook_id, data, banner_image }) => {
      const formData = new FormData();
      if (data) formData.append("data", JSON.stringify(data));
      if (banner_image) formData.append("banner_image", banner_image);

      const res = await axios.patch(`${API_BASE_URL}/api/products/smartbook/${product_smartbook_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products", "smartbook"] });
      queryClient.invalidateQueries({ queryKey: ["products", "smartbook", "home"] });
      queryClient.invalidateQueries({ queryKey: ["products", "smartbook", variables.product_smartbook_id] });
    },
  });
};

// Delete all smartbook products
export const useDeleteAllSmartbookProducts = (): UseMutationResult<WebResponse<string>, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/smartbook`, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "smartbook"] });
      queryClient.invalidateQueries({ queryKey: ["products", "smartbook", "home"] });
    },
  });
};

// Delete smartbook product by ID
export const useDeleteSmartbookProductById = (): UseMutationResult<WebResponse<string>, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product_smartbook_id: number) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/smartbook/${product_smartbook_id}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, product_smartbook_id) => {
      queryClient.invalidateQueries({ queryKey: ["products", "smartbook"] });
      queryClient.invalidateQueries({ queryKey: ["products", "smartbook", "home"] });
      queryClient.invalidateQueries({ queryKey: ["products", "smartbook", product_smartbook_id] });
    },
  });
};

// Get product image by ID
export const useGetSmartbookProductImageById = (product_smartbook_id: number) => {
  return useQuery<WebResponse<string>, Error>({
    queryKey: ["products", "smartbook", "image", product_smartbook_id],
    queryFn: async () => {
      if (!product_smartbook_id) throw new Error("product_smartbook_id is required");
      const res = await axios.get(`${API_BASE_URL}/api/products/smartbook/${product_smartbook_id}/image`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_smartbook_id),
    retry: false,
  });
};
