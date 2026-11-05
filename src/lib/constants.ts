export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data",
  THEME: "theme_preference",
  SIDEBAR_COLLAPSED: "sidebar_collapsed",
} as const;

export const COOKIE_KEYS = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export const QUERY_KEYS = {
  AUTH: {
    ME: ["auth", "me"] as const,
  },
  DASHBOARD: {
    METRICS: ["dashboard", "metrics"] as const,
    TRANSACTIONS: (params?: Record<string, unknown>) =>
      ["dashboard", "transactions", params] as const,
    CHARTS: ["dashboard", "charts"] as const,
  },
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ANALYTICS: "/dashboard/analytics",
  SETTINGS: "/dashboard/settings",
  HEALTH: "/api/health",
} as const;
