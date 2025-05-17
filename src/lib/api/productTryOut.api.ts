import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { createTryOutResponse, updateTryOutRequest, updateTryOutResponse } from "@/model/product.model";

type UpdateProductPayload = {
  productId: number | string;
  data: updateTryOutRequest;
  file?: File | null;
};

// Get all tryout products (protected)
export const useGetAllTryOutProducts = () => {
  return useQuery<WebResponse<createTryOutResponse[]>, Error>({
    queryKey: ["products", "tryout"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};

// Get tryout products for home (public)
export const useGetTryOutProductsForHome = () => {
  return useQuery<WebResponse<createTryOutResponse[]>, Error>({
    queryKey: ["products", "tryout", "home"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/home`);
      return res.data;
    },
    retry: false,
  });
};

// Get tryout product by ID (protected)
export const useGetTryOutProductById = (productId?: string | number | null) => {
  return useQuery<WebResponse<createTryOutResponse>, Error>({
    queryKey: ["products", "tryout", productId],
    queryFn: async () => {
      if (!productId) throw new Error("productId is required");
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${productId}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(productId),
    retry: false,
  });
};

export const useGetTryOutProductByIdForAdmin = (productId?: string | number | null) => {
  return useQuery<WebResponse<createTryOutResponse>, Error>({
    queryKey: ["products", "tryout", productId],
    queryFn: async () => {
      if (!productId) throw new Error("productId is required");
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${productId}/admin`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(productId),
    retry: false,
  });
};

// Create new tryout product
export const useCreateTryOutProduct = (): UseMutationResult<WebResponse<createTryOutResponse>, Error, { data: string; banner_image: File }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, banner_image }) => {
      const formData = new FormData();
      formData.append("data", data);
      formData.append("banner_image", banner_image);

      const res = await axios.post(`${API_BASE_URL}/api/products/tryout`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "tryout"] });
      queryClient.invalidateQueries({ queryKey: ["products", "tryout", "home"] });
    },
  });
};

// Update tryout product
export const useUpdateTryOutProduct = (): UseMutationResult<WebResponse<updateTryOutResponse>, Error, UpdateProductPayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, data, file }) => {
      const formData = new FormData();
      if (data) formData.append("data", JSON.stringify(data));
      if (file) formData.append("banner_image", file);

      const res = await axios.patch(`${API_BASE_URL}/api/products/tryout/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products", "tryout"] });
      queryClient.invalidateQueries({ queryKey: ["products", "tryout", "home"] });
      queryClient.invalidateQueries({ queryKey: ["products", "tryout", variables.productId] });
    },
  });
};

// Delete all tryout products
export const useDeleteAllTryOutProducts = (): UseMutationResult<WebResponse<string>, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout`, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "tryout"] });
      queryClient.invalidateQueries({ queryKey: ["products", "tryout", "home"] });
    },
  });
};

// Delete tryout product by ID
export const useDeleteTryOutProductById = (): UseMutationResult<WebResponse<string>, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout/${productId}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ["products", "tryout"] });
      queryClient.invalidateQueries({ queryKey: ["products", "tryout", "home"] });
      queryClient.invalidateQueries({ queryKey: ["products", "tryout", productId] });
    },
  });
};

// Get product image by ID
export const useGetTryOutProductImageById = (productId?: number | string | null) => {
  return useQuery<WebResponse<string>, Error>({
    queryKey: ["products", "tryout", "image", "home", productId],
    queryFn: async () => {
      if (!productId) throw new Error("productId is required");
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${productId}/image`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(productId),
    retry: false,
  });
};
