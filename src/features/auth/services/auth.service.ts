import { http } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "../types";

export const authService = {
  login: async (payload: LoginPayload): Promise<ApiResponse<AuthResponse>> => {
    return http.post<AuthResponse>("/auth/login", payload);
  },

  register: async (
    payload: RegisterPayload
  ): Promise<ApiResponse<AuthResponse>> => {
    return http.post<AuthResponse>("/auth/register", payload);
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    return http.get<User>("/auth/me");
  },

  logout: async (): Promise<ApiResponse<null>> => {
    return http.post<null>("/auth/logout");
  },
};
