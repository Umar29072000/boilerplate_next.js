import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, AuthTokens } from "@/features/auth/types";
import { STORAGE_KEYS, COOKIE_KEYS } from "@/lib/constants";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (payload: { user: User; tokens: AuthTokens }) => void;
  setTokens: (tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function removeCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: ({ user, tokens }) => {
        setCookie(COOKIE_KEYS.AUTH_TOKEN, tokens.accessToken);
        if (tokens.refreshToken) {
          setCookie(COOKIE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
        }

        set({
          user,
          token: tokens.accessToken,
          refreshToken: tokens.refreshToken ?? null,
          isAuthenticated: true,
        });
      },

      setTokens: (tokens) => {
        setCookie(COOKIE_KEYS.AUTH_TOKEN, tokens.accessToken);
        if (tokens.refreshToken) {
          setCookie(COOKIE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
        }

        set((state) => ({
          ...state,
          token: tokens.accessToken,
          refreshToken: tokens.refreshToken ?? state.refreshToken,
        }));
      },

      setUser: (user) => {
        set((state) => ({
          ...state,
          user,
        }));
      },

      clearAuth: () => {
        removeCookie(COOKIE_KEYS.AUTH_TOKEN);
        removeCookie(COOKIE_KEYS.REFRESH_TOKEN);

        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: STORAGE_KEYS.AUTH_TOKEN,
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        }
      ),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
