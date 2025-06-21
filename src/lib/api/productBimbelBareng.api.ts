import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { WebResponse } from "@/model/web-reponse.model";
import { bimbelBarengResponse, updateBimbelBarengRequest } from "@/model/productBimbelBareng.model";

// Get all bimbel bareng products (protected)
export const useGetAllBimbelBarengProducts = () => {
  return useQuery<WebResponse<bimbelBarengResponse[]>, Error>({
    queryKey: ["products", "bimbel-bareng"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/bimbel-bareng`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};

// Get all bimbel bareng products for home (public)
export const useGetAllBimbelBarengForHome = () => {
  return useQuery<WebResponse<bimbelBarengResponse[]>, Error>({
    queryKey: ["products", "bimbel-bareng", "home"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/bimbel-bareng/home`);
      return res.data;
    },
    retry: false,
  });
};

// Get bimbel bareng product by ID (protected)
export const useGetBimbelBarengProductById = (product_bimbel_bareng_id: number) => {
  return useQuery<WebResponse<bimbelBarengResponse>, Error>({
    queryKey: ["products", "bimbel-bareng", product_bimbel_bareng_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_bimbel_bareng_id),
    retry: false,
  });
};

// Get bimbel bareng product by ID for admin (protected)
export const useGetBimbelBarengProductByIdForAdmin = (product_bimbel_bareng_id: number) => {
  return useQuery<WebResponse<bimbelBarengResponse>, Error>({
    queryKey: ["products", "bimbel-bareng", product_bimbel_bareng_id, "admin"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}/admin`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_bimbel_bareng_id),
    retry: false,
  });
};

// Create new bimbel bareng product
export const useCreateBimbelBarengProduct = (): UseMutationResult<WebResponse<bimbelBarengResponse>, Error, { data: string; banner_image: File; jadwal_bimbel_image: File }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, banner_image, jadwal_bimbel_image }) => {
      const formData = new FormData();
      formData.append("data", data);
      formData.append("banner_image", banner_image);
      formData.append("jadwal_bimbel_image", jadwal_bimbel_image);

      const res = await axios.post(`${API_BASE_URL}/api/products/bimbel-bareng`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "bimbel-bareng"] });
      queryClient.invalidateQueries({ queryKey: ["products", "bimbel-bareng", "home"] });
    },
  });
};

// Update bimbel bareng product
export const useUpdateBimbelBarengProduct = (): UseMutationResult<
  WebResponse<bimbelBarengResponse>,
  Error,
  { product_bimbel_bareng_id: number; data: updateBimbelBarengRequest; banner_image: File | null; jadwal_bimbel_image: File | null }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_bimbel_bareng_id, data, banner_image, jadwal_bimbel_image }) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (banner_image) formData.append("banner_image", banner_image);
      if (jadwal_bimbel_image) formData.append("jadwal_bimbel_image", jadwal_bimbel_image);

      const res = await axios.patch(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      return res.data;
    },
    onSuccess: (_, { product_bimbel_bareng_id }) => {
      queryClient.invalidateQueries({ queryKey: ["products", "bimbel-bareng"] });
      queryClient.invalidateQueries({ queryKey: ["products", "bimbel-bareng", product_bimbel_bareng_id] });
    },
  });
};

// Delete all bimbel bareng products
export const useDeleteAllBimbelBarengProducts = (): UseMutationResult<WebResponse<string>, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/bimbel-bareng`, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "bimbel-bareng"] });
      queryClient.invalidateQueries({ queryKey: ["products", "bimbel-bareng", "home"] });
    },
  });
};

// Delete bimbel bareng product by ID
export const useDeleteBimbelBarengProductById = (): UseMutationResult<WebResponse<string>, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product_bimbel_bareng_id: number) => {
      const res = await axios.delete(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, product_bimbel_bareng_id) => {
      queryClient.invalidateQueries({ queryKey: ["products", "bimbel-bareng"] });
      queryClient.invalidateQueries({ queryKey: ["products", "bimbel-bareng", product_bimbel_bareng_id] });
    },
  });
};

// Get product banner image by ID
export const useGetBimbelBarengProductImageById = (product_bimbel_bareng_id: number) => {
  return useQuery<WebResponse<string>, Error>({
    queryKey: ["products", "bimbel-bareng", "image", product_bimbel_bareng_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}/image/banner`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_bimbel_bareng_id),
    retry: false,
  });
};

// Get product jadwal bimbel image by ID
export const useGetBimbelBarengJadwalImageById = (product_bimbel_bareng_id: number) => {
  return useQuery<WebResponse<string>, Error>({
    queryKey: ["products", "bimbel-bareng", "image", product_bimbel_bareng_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/products/bimbel-bareng/${product_bimbel_bareng_id}/image/jadwal-bimbel`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(product_bimbel_bareng_id),
    retry: false,
  });
};
