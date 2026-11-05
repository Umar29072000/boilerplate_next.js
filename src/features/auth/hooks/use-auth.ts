"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";
import { authService } from "../services/auth.service";
import { QUERY_KEYS } from "@/lib/constants";

export function useAuth() {
  const { user, token, isAuthenticated, setUser, clearAuth } = useAuthStore();

  const query = useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: async () => {
      const res = await authService.getMe();
      if (res.data) {
        setUser(res.data);
      }
      return res.data;
    },
    enabled: Boolean(token),
    retry: false,
  });

  return {
    user,
    token,
    isAuthenticated,
    isLoading: query.isLoading,
    isError: query.isError,
    logout: clearAuth,
    refetchUser: query.refetch,
  };
}
