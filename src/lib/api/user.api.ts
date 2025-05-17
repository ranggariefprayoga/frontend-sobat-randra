import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { AuthResponse, GetUsersParams, LoginRequest, RegisterUserRequest, UpdateUserRequest, UserResponse, WebPaginatedResponse } from "@/model/user.model";
import { WebResponse } from "@/model/web-reponse.model";

type UpdatePasswordPayload = {
  userId: number | string;
  data: UpdateUserRequest;
};

// LOGIN
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      const res = await axios.post(`${API_BASE_URL}/api/user/login`, data, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// REGISTER
export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, Error, RegisterUserRequest>({
    mutationFn: async (data) => {
      const res = await axios.post(`${API_BASE_URL}/api/user/register`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// LOGOUT
export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      await axios.delete(`${API_BASE_URL}/api/user/logout/${userId}`, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// GET CURRENT USER
export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/user/me`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};

// GET USER BY ID
export const useGetUserDetail = (user_id?: string | number | null) => {
  return useQuery({
    queryKey: ["user", user_id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/user/${user_id}`, { withCredentials: true });
      return res.data;
    },
    enabled: Boolean(user_id),
    retry: false,
  });
};

// GET JUMLAH USER
export const useGetJumlahuser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/api/user/jumlah-user`, { withCredentials: true });
      return res.data;
    },
    retry: false,
  });
};

// UPDATE NAME
export const useUpdateName = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, Error, UpdateUserRequest>({
    mutationFn: async (data) => {
      const res = await axios.patch(`${API_BASE_URL}/api/user/${userId}/name`, data, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// UPDATE PASSWORD
export const useUpdatePassword = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, Error, UpdateUserRequest>({
    mutationFn: async (data) => {
      const res = await axios.patch(`${API_BASE_URL}/api/user/${userId}/password`, data, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// GET ALL USERS (ADMIN)
export const useGetUsersByAdmin = ({ page = 1, limit = 10, search = "" }: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", page, limit, search],
    queryFn: async () => {
      const res = await axios.get<WebPaginatedResponse<UserResponse[]>>(`${API_BASE_URL}/api/user`, {
        params: { page, limit, search },
        withCredentials: true,
      });
      return res.data;
    },
    retry: false,
  });
};

// UPDATE PASSWORD BY ADMIN
export const useUpdatePasswordByAdmin = (): UseMutationResult<WebResponse<UserResponse>, Error, UpdatePasswordPayload> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, data }) => {
      const res = await axios.patch(`${API_BASE_URL}/api/user/${userId}/admin/password`, data, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// DELETE USER
export const useDeleteUserByAdmin = (): UseMutationResult<WebResponse<string>, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: number) => {
      const res = await axios.delete(`${API_BASE_URL}/api/user/${userId}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
