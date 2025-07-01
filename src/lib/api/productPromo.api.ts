import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { ProductPromoResponse, updateProductPromoRequest } from "@/model/productPromo.model";

// Get all product promos (protected)
export const useGetAllProductPromos = () => {
  return useQuery<WebResponse<ProductPromoResponse[]>, Error>({
    queryKey: ["products", "promo"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/promo`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};

// Get all product promos for home (public)
export const useGetAllProductPromosForHome = () => {
  return useQuery<WebResponse<ProductPromoResponse[]>, Error>({
    queryKey: ["products", "promo", "home"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/promo/home`);
      return res.data;
    },
    retry: false,
  });
};

// Get product promo by ID (protected)
export const useGetProductPromoById = (product_promo_id: number) => {
  return useQuery<WebResponse<ProductPromoResponse>, Error>({
    queryKey: ["products", "promo", product_promo_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/promo/${product_promo_id}/user`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_promo_id),
    retry: false,
  });
};

// Get product promo by ID for admin (protected)
export const useGetProductPromoByIdForAdmin = (product_promo_id: number) => {
  return useQuery<WebResponse<ProductPromoResponse>, Error>({
    queryKey: ["products", "promo", product_promo_id, "admin"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/promo/${product_promo_id}/admin`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_promo_id),
    retry: false,
  });
};

// Create new product promo
export const useCreateProductPromo = (): UseMutationResult<WebResponse<ProductPromoResponse>, Error, { data: string; banner_image: File }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, banner_image }) => {
      const formData = new FormData();
      formData.append("data", data);
      formData.append("banner_image", banner_image); // Assuming banner_image is a file

      const res = await axios.post(`${API_BASE_URL}/api/products/promo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "promo"] });
      queryClient.invalidateQueries({ queryKey: ["products", "promo", "home"] });
    },
  });
};

// Update product promo
export const useUpdateProductPromo = (): UseMutationResult<WebResponse<ProductPromoResponse>, Error, { product_promo_id: number; data: updateProductPromoRequest; banner_image: File | null }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_promo_id, data, banner_image }) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (banner_image) formData.append("banner_image", banner_image);

      const res = await axios.patch(`${API_BASE_URL}/api/products/promo/${product_promo_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      return res.data;
    },
    onSuccess: (_, { product_promo_id }) => {
      queryClient.invalidateQueries({ queryKey: ["products", "promo"] });
      queryClient.invalidateQueries({ queryKey: ["products", "promo", product_promo_id] });
    },
  });
};

// Delete all product promos
export const useDeleteAllProductPromos = (): UseMutationResult<WebResponse<string>, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/promo`, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "promo"] });
      queryClient.invalidateQueries({ queryKey: ["products", "promo", "home"] });
    },
  });
};

// Delete product promo by ID
export const useDeleteProductPromoById = (): UseMutationResult<WebResponse<string>, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product_promo_id: number) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/promo/${product_promo_id}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, product_promo_id) => {
      queryClient.invalidateQueries({ queryKey: ["products", "promo"] });
      queryClient.invalidateQueries({ queryKey: ["products", "promo", product_promo_id] });
    },
  });
};

// Get product promo image by ID
export const useGetProductPromoImageById = (product_promo_id: number) => {
  return useQuery<WebResponse<string>, Error>({
    queryKey: ["products", "promo", "image", product_promo_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/promo/${product_promo_id}/image`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_promo_id),
    retry: false,
  });
};
