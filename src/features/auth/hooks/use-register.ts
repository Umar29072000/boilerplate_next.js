"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "../services/auth.service";
import { useAuthStore } from "@/stores/auth-store";
import type { RegisterPayload } from "../types";
import type { ApiError } from "@/types/api";
import { ROUTES } from "@/lib/constants";

export function useRegister() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      try {
        return await authService.register(payload);
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          return {
            success: true,
            message: "Development mock registration successful",
            data: {
              user: {
                id: `usr_${Date.now()}`,
                name: payload.name,
                email: payload.email,
                role: "user" as const,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              tokens: {
                accessToken: "mock_jwt_access_token_dev",
                refreshToken: "mock_jwt_refresh_token_dev",
                expiresIn: 3600,
              },
            },
          };
        }
        throw err;
      }
    },
    onSuccess: (response) => {
      const { user, tokens } = response.data;
      setAuth({ user, tokens });
      toast.success("Account created successfully", {
        description: `Welcome aboard, ${user.name}!`,
      });
      router.push(ROUTES.DASHBOARD);
    },
    onError: (error: ApiError) => {
      toast.error("Registration failed", {
        description: error.message || "Failed to create account. Please try again.",
      });
    },
  });
}
