"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import { QUERY_KEYS } from "@/lib/constants";

export function useDashboardMetrics() {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.METRICS,
    queryFn: async () => {
      const res = await dashboardService.getMetrics();
      return res.data;
    },
  });
}

export function useRecentTransactions(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.TRANSACTIONS(params),
    queryFn: async () => {
      const res = await dashboardService.getTransactions(params);
      return res;
    },
  });
}

export function useDashboardCharts() {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.CHARTS,
    queryFn: async () => {
      const res = await dashboardService.getChartData();
      return res.data;
    },
  });
}
