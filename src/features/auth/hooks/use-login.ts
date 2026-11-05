"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authService } from "../services/auth.service";
import { useAuthStore } from "@/stores/auth-store";
import type { LoginPayload } from "../types";
import type { ApiError } from "@/types/api";
import { ROUTES } from "@/lib/constants";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      try {
        return await authService.login(payload);
      } catch (err) {
        // Dev fallback helper: If backend is offline during prototyping with admin@apex.local
        if (
          process.env.NODE_ENV === "development" &&
          payload.email === "admin@apex.local" &&
          payload.password === "admin123"
        ) {
          return {
            success: true,
            message: "Development mock login successful",
            data: {
              user: {
                id: "usr_mock_admin_01",
                name: "Lead System Admin",
                email: "admin@apex.local",
                role: "superadmin" as const,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              tokens: {
                accessToken: "mock_jwt_access_token_dev_apex_superadmin",
                refreshToken: "mock_jwt_refresh_token_dev_apex_superadmin",
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
      toast.success("Welcome back!", {
        description: `Signed in as ${user.email}`,
      });

      const redirect = searchParams.get("redirect") || ROUTES.DASHBOARD;
      router.push(redirect);
    },
    onError: (error: ApiError) => {
      toast.error("Sign in failed", {
        description: error.message || "Please check your email and password.",
      });
    },
  });
}
