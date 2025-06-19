import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { ProductVideoBelajarResponse, updateProductVideoBelajarRequest } from "@/model/productVideoBelajar.model";

// Get all video-belajar products (protected)
export const useGetAllVideoBelajarProducts = () => {
  return useQuery<WebResponse<ProductVideoBelajarResponse[]>, Error>({
    queryKey: ["products", "video-belajar"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/video-belajar`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};

// Get video-belajar products for home (public)
export const useGetVideoBelajarProductsForHome = () => {
  return useQuery<WebResponse<ProductVideoBelajarResponse[]>, Error>({
    queryKey: ["products", "video-belajar", "home"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/video-belajar/home`);
      return res.data;
    },
    retry: false,
  });
};

// Get video-belajar product by ID (protected)
export const useGetVideoBelajarProductByIdForUser = (product_video_belajar_id: number) => {
  return useQuery<WebResponse<ProductVideoBelajarResponse>, Error>({
    queryKey: ["products", "video-belajar", product_video_belajar_id],
    queryFn: async () => {
      if (!product_video_belajar_id) throw new Error("product_video_belajar_id is required");
      const res = await axios.get(`${API_BASE_URL}/api/products/video-belajar/${product_video_belajar_id}/user`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_video_belajar_id),
    retry: false,
  });
};

export const useGetVideoBelajarProductByIdForAdmin = (product_video_belajar_id: number) => {
  return useQuery<WebResponse<ProductVideoBelajarResponse>, Error>({
    queryKey: ["products", "video-belajar", product_video_belajar_id],
    queryFn: async () => {
      if (!product_video_belajar_id) throw new Error("product_video_belajar_id is required");
      const res = await axios.get(`${API_BASE_URL}/api/products/video-belajar/${product_video_belajar_id}/admin`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_video_belajar_id),
    retry: false,
  });
};

// Create new video-belajar product
export const useCreateVideoBelajarProduct = (): UseMutationResult<WebResponse<ProductVideoBelajarResponse>, Error, { data: string; banner_image: File }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, banner_image }) => {
      const formData = new FormData();
      formData.append("data", data);
      formData.append("banner_image", banner_image);

      const res = await axios.post(`${API_BASE_URL}/api/products/video-belajar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "video-belajar"] });
      queryClient.invalidateQueries({ queryKey: ["products", "video-belajar", "home"] });
    },
  });
};

// Update video-belajar product
export const useUpdateVideoBelajarProduct = (): UseMutationResult<WebResponse<ProductVideoBelajarResponse>, Error, { product_video_belajar_id: number; data: updateProductVideoBelajarRequest; file: File | null }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_video_belajar_id, data, file }) => {
      const formData = new FormData();
      if (data) formData.append("data", JSON.stringify(data));
      if (file) formData.append("banner_image", file);

      const res = await axios.patch(`${API_BASE_URL}/api/products/video-belajar/${product_video_belajar_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products", "video-belajar"] });
      queryClient.invalidateQueries({ queryKey: ["products", "video-belajar", "home"] });
      queryClient.invalidateQueries({ queryKey: ["products", "video-belajar", variables.product_video_belajar_id] });
    },
  });
};

// Delete all video-belajar products
export const useDeleteAllVideoBelajarProducts = (): UseMutationResult<WebResponse<string>, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/video-belajar`, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "video-belajar"] });
      queryClient.invalidateQueries({ queryKey: ["products", "video-belajar", "home"] });
    },
  });
};

// Delete video-belajar product by ID
export const useDeleteVideoBelajarProductById = (): UseMutationResult<WebResponse<string>, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product_video_belajar_id: number) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/video-belajar/${product_video_belajar_id}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, product_video_belajar_id) => {
      queryClient.invalidateQueries({ queryKey: ["products", "video-belajar"] });
      queryClient.invalidateQueries({ queryKey: ["products", "video-belajar", "home"] });
      queryClient.invalidateQueries({ queryKey: ["products", "video-belajar", product_video_belajar_id] });
    },
  });
};

// Get product image by ID
export const useGetVideoBelajarProductImageById = (product_video_belajar_id: number) => {
  return useQuery<WebResponse<string>, Error>({
    queryKey: ["products", "video-belajar", "image", product_video_belajar_id],
    queryFn: async () => {
      if (!product_video_belajar_id) throw new Error("product_video_belajar_id is required");
      const res = await axios.get(`${API_BASE_URL}/api/products/video-belajar/${product_video_belajar_id}/image`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_video_belajar_id),
    retry: false,
  });
};
