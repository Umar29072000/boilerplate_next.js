import { http } from "@/lib/api-client";
import type { PaginatedResponse, ApiResponse } from "@/types/api";
import type {
  DashboardMetrics,
  Transaction,
  ChartDataPoint,
} from "../types";

export const dashboardService = {
  getMetrics: async (): Promise<ApiResponse<DashboardMetrics>> => {
    try {
      return await http.get<DashboardMetrics>("/dashboard/metrics");
    } catch {
      // Fallback data for seamless prototyping & offline dev
      return {
        success: true,
        message: "Metrics loaded (mock)",
        data: {
          revenue: {
            key: "revenue",
            label: "Total Revenue",
            value: 124850000,
            change: 14.2,
            format: "currency",
            period: "vs last month",
          },
          transactions: {
            key: "transactions",
            label: "Total Transactions",
            value: 8420,
            change: 8.4,
            format: "number",
            period: "vs last month",
          },
          activeUsers: {
            key: "activeUsers",
            label: "Active Accounts",
            value: 2315,
            change: 12.1,
            format: "number",
            period: "vs last month",
          },
          successRate: {
            key: "successRate",
            label: "Payment Success Rate",
            value: 99.4,
            change: 0.3,
            format: "percentage",
            period: "vs last month",
          },
        },
      };
    }
  },

  getTransactions: async (params?: {
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<PaginatedResponse<Transaction>> => {
    try {
      const query = new URLSearchParams();
      if (params?.page) query.append("page", String(params.page));
      if (params?.pageSize) query.append("pageSize", String(params.pageSize));
      if (params?.search) query.append("search", params.search);

      const qs = query.toString() ? `?${query.toString()}` : "";
      const res = await http.get<PaginatedResponse<Transaction>>(`/dashboard/transactions${qs}`);
      return (res as unknown) as PaginatedResponse<Transaction>;
    } catch {
      // Realistic transaction mocks
      const mockTransactions: Transaction[] = [
        {
          id: "trx_94812",
          referenceNumber: "INV-2026-03-001",
          customerName: "PT Sentosa Solusi",
          customerEmail: "finance@sentosa.co.id",
          amount: 14500000,
          fee: 2500,
          status: "completed",
          method: "bank_transfer",
          createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
        },
        {
          id: "trx_94811",
          referenceNumber: "INV-2026-03-002",
          customerName: "Budi Pratama",
          customerEmail: "budi.p@gmail.com",
          amount: 450000,
          fee: 750,
          status: "completed",
          method: "qris",
          createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        },
        {
          id: "trx_94810",
          referenceNumber: "INV-2026-03-003",
          customerName: "Mega Digital Corp",
          customerEmail: "billing@megadigital.id",
          amount: 8750000,
          fee: 1500,
          status: "pending",
          method: "bank_transfer",
          createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        },
        {
          id: "trx_94809",
          referenceNumber: "INV-2026-03-004",
          customerName: "Dewi Lestari",
          customerEmail: "dewi.lestari@yahoo.com",
          amount: 120000,
          fee: 500,
          status: "failed",
          method: "e_wallet",
          createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
        },
        {
          id: "trx_94808",
          referenceNumber: "INV-2026-03-005",
          customerName: "Ahmad Dahlan",
          customerEmail: "ahmad.d@outlook.com",
          amount: 1250000,
          fee: 1000,
          status: "completed",
          method: "credit_card",
          createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        },
      ];

      return {
        success: true,
        message: "Transactions loaded (mock)",
        data: mockTransactions,
        meta: {
          page: params?.page ?? 1,
          pageSize: params?.pageSize ?? 5,
          totalRecords: 245,
          totalPages: 49,
          hasNextPage: true,
          hasPrevPage: false,
        },
      };
    }
  },

  getChartData: async (): Promise<ApiResponse<ChartDataPoint[]>> => {
    try {
      return await http.get<ChartDataPoint[]>("/dashboard/charts");
    } catch {
      return {
        success: true,
        message: "Chart data loaded (mock)",
        data: [
          { date: "01 Mar", volume: 180, revenue: 14200000 },
          { date: "02 Mar", volume: 220, revenue: 16800000 },
          { date: "03 Mar", volume: 310, revenue: 21500000 },
          { date: "04 Mar", volume: 290, revenue: 19400000 },
          { date: "05 Mar", volume: 380, revenue: 26800000 },
          { date: "06 Mar", volume: 420, revenue: 29100000 },
          { date: "07 Mar", volume: 460, revenue: 32500000 },
        ],
      };
    }
  },
};
