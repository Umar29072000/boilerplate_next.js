export type TransactionStatus =
  | "completed"
  | "pending"
  | "failed"
  | "refunded";

export type PaymentMethod =
  | "qris"
  | "bank_transfer"
  | "e_wallet"
  | "credit_card";

export interface Transaction {
  id: string;
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  fee: number;
  status: TransactionStatus;
  method: PaymentMethod;
  createdAt: string;
}

export interface MetricItem {
  key: string;
  label: string;
  value: number;
  change: number;
  format: "currency" | "number" | "percentage";
  period: string;
}

export interface DashboardMetrics {
  revenue: MetricItem;
  transactions: MetricItem;
  activeUsers: MetricItem;
  successRate: MetricItem;
}

export interface ChartDataPoint {
  date: string;
  volume: number;
  revenue: number;
}
