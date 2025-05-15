import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { AuthResponse, GetUsersParams, LoginRequest, RegisterUserRequest, UpdateUserRequest, UserResponse, WebPaginatedResponse } from "@/model/user.model";
import { WebResponse } from "@/model/web-reponse.model";

type UpdatePasswordPayload = {
  userId: number | string;
  data: UpdateUserRequest;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/api/user/login`, data, { withCredentials: true });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, Error, RegisterUserRequest>({
    mutationFn: async (data) => {
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/api/user/register`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      await axios.delete(`${API_BASE_URL}/api/user/logout/${userId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/api/user/me`, {
        withCredentials: true,
      });
      return response.data;
    },
    retry: false,
  });
};

export const useGetUserDetail = (user_id?: string | number | null) => {
  return useQuery({
    queryKey: ["user", user_id],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/api/user/${user_id}`, {
        withCredentials: true,
      });
      return response.data;
    },
    enabled: Boolean(user_id),
    retry: false,
  });
};

export const useGetJumlahuser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/api/user/jumlah-user`, {
        withCredentials: true,
      });
      return response.data;
    },

    retry: false,
  });
};

export const useUpdateName = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, Error, UpdateUserRequest>({
    mutationFn: async (data) => {
      const response = await axios.patch<AuthResponse>(`${API_BASE_URL}/api/user/${userId}/name`, data, { withCredentials: true });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useUpdatePassword = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, Error, UpdateUserRequest>({
    mutationFn: async (data) => {
      const response = await axios.patch<AuthResponse>(`${API_BASE_URL}/api/user/${userId}/password`, data, { withCredentials: true });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useGetUsersByAdmin = ({ page = 1, limit = 10, search = "" }: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", page, limit, search],
    queryFn: async () => {
      const response = await axios.get<WebPaginatedResponse<UserResponse[]>>(`${API_BASE_URL}/api/user`, {
        params: { page, limit, search },
        withCredentials: true,
      });
      return response.data;
    },
    retry: false,
  });
};

export const useUpdatePasswordByAdmin = (): UseMutationResult<WebResponse<UserResponse>, Error, UpdatePasswordPayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: UpdatePasswordPayload) => {
      const response = await axios.patch<WebResponse<UserResponse>>(`${API_BASE_URL}/api/user/${userId}/admin/password`, data, { withCredentials: true });
      return response.data;
    },
    onSuccess: (_, variables) => {
      // variables is UpdatePasswordPayload
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUserByAdmin = (): UseMutationResult<WebResponse<string>, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      const response = await axios.delete<WebResponse<string>>(`${API_BASE_URL}/api/user/${userId}`, { withCredentials: true });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
