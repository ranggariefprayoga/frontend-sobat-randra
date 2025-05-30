import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { createTryOutResponse, updateTryOutRequest, updateTryOutResponse } from "@/model/product.model";

type UpdateProductPayload = {
  product_try_out_id: number | string;
  data: updateTryOutRequest;
  file?: File | null;
};

// Get all tryout products (protected)
export const useGetAllActiveTryOutProducts = () => {
  return useQuery<WebResponse<createTryOutResponse[]>, Error>({
    queryKey: ["products", "tryout"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};

export const useGetAllTryOutProducts = () => {
  return useQuery<WebResponse<createTryOutResponse[]>, Error>({
    queryKey: ["products", "tryout"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/all`, { withCredentials: true });
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
export const useGetTryOutProductById = (product_try_out_id: number) => {
  return useQuery<WebResponse<createTryOutResponse>, Error>({
    queryKey: ["products", "tryout", product_try_out_id],
    queryFn: async () => {
      if (!product_try_out_id) throw new Error("product_try_out_id is required");
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id),
    retry: false,
  });
};

export const useGetTryOutProductByIdForAdmin = (product_try_out_id: number) => {
  return useQuery<WebResponse<createTryOutResponse>, Error>({
    queryKey: ["products", "tryout", product_try_out_id],
    queryFn: async () => {
      if (!product_try_out_id) throw new Error("product_try_out_id is required");
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/admin`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id),
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
    mutationFn: async ({ product_try_out_id, data, file }) => {
      const formData = new FormData();
      if (data) formData.append("data", JSON.stringify(data));
      if (file) formData.append("banner_image", file);

      const res = await axios.patch(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products", "tryout"] });
      queryClient.invalidateQueries({ queryKey: ["products", "tryout", "home"] });
      queryClient.invalidateQueries({ queryKey: ["products", "tryout", variables.product_try_out_id] });
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
    mutationFn: async (product_try_out_id: number) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, product_try_out_id) => {
      queryClient.invalidateQueries({ queryKey: ["products", "tryout"] });
      queryClient.invalidateQueries({ queryKey: ["products", "tryout", "home"] });
      queryClient.invalidateQueries({ queryKey: ["products", "tryout", product_try_out_id] });
    },
  });
};

// Get product image by ID
export const useGetTryOutProductImageById = (product_try_out_id?: number | string | null) => {
  return useQuery<WebResponse<string>, Error>({
    queryKey: ["products", "tryout", "image", "home", product_try_out_id],
    queryFn: async () => {
      if (!product_try_out_id) throw new Error("product_try_out_id is required");
      const res = await axios.get(`${API_BASE_URL}/api/products/tryout/${product_try_out_id}/image`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_try_out_id),
    retry: false,
  });
};
