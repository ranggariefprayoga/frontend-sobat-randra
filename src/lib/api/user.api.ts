import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";
import { AuthResponse, LoginRequest, RegisterUserRequest } from "@/model/user.model";

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
