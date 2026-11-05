"use client";

import { PageHeader } from "@/components/common/page-header";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { StatsCards } from "@/features/dashboard/components/stats-cards";
import { MetricsChart } from "@/features/dashboard/components/metrics-chart";
import { RecentTransactionsTable } from "@/features/dashboard/components/recent-transactions-table";
import {
  useDashboardMetrics,
  useDashboardCharts,
  useRecentTransactions,
} from "@/features/dashboard/hooks/use-dashboard";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { data: metrics, isLoading: isMetricsLoading } = useDashboardMetrics();
  const { data: chartData, isLoading: isChartLoading } = useDashboardCharts();
  const { data: transactionsData, isLoading: isTrxLoading } =
    useRecentTransactions({ page: 1, pageSize: 5 });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operational Dashboard"
        description="Real-time transaction settlement, active sessions, and gateway metrics."
        action={
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:inline-flex font-mono text-[11px]">
              Region: ap-southeast-1
            </Badge>
            <QuickActions />
          </div>
        }
      />

      {/* Top 4 KPI Metric Cards */}
      <StatsCards metrics={metrics} isLoading={isMetricsLoading} />

      {/* Chart Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MetricsChart data={chartData} isLoading={isChartLoading} />
        </div>

        {/* Quick Gateway Health Status */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Gateway Health
            </span>
            <Badge variant="success" className="text-[10px]">
              99.98% SLA
            </Badge>
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">QRIS Settlement (ASPI)</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                120ms • Healthy
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Virtual Account (BCA/Mandiri)</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                95ms • Healthy
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">E-Wallet Webhook Queue</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                0 queued
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">External Worker Pods</span>
              <span className="font-mono text-foreground">
                3 / 3 Active
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-md bg-muted/40 p-3 text-[11px] text-muted-foreground">
            <span className="font-medium text-foreground">Next reconciliation job:</span>{" "}
            <span className="font-mono">Tonight at 23:59:59 WIB</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <RecentTransactionsTable
        transactions={transactionsData?.data}
        isLoading={isTrxLoading}
      />
    </div>
  );
}
