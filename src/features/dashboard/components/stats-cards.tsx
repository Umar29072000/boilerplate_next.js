"use client";

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { DashboardMetrics, MetricItem } from "../types";

interface StatsCardsProps {
  metrics?: DashboardMetrics;
  isLoading?: boolean;
}

const metricIcons = {
  revenue: DollarSign,
  transactions: Activity,
  activeUsers: Users,
  successRate: CheckCircle2,
};

export function StatsCards({ metrics, isLoading }: StatsCardsProps) {
  if (isLoading || !metrics) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
              <Skeleton className="mt-4 h-7 w-32" />
              <Skeleton className="mt-2 h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const items: MetricItem[] = [
    metrics.revenue,
    metrics.transactions,
    metrics.activeUsers,
    metrics.successRate,
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = metricIcons[item.key as keyof typeof metricIcons] || Activity;
        const isPositive = item.change >= 0;

        let formattedValue = "";
        if (item.format === "currency") {
          formattedValue = formatCurrency(item.value);
        } else if (item.format === "percentage") {
          formattedValue = `${item.value}%`;
        } else {
          formattedValue = formatNumber(item.value);
        }

        return (
          <Card key={item.key} className="border-border transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {item.label}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-3">
                <div className="font-mono text-2xl font-bold tracking-tight text-foreground tabular-nums">
                  {formattedValue}
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-1.5 text-xs">
                <div
                  className={`flex items-center font-mono font-medium tabular-nums ${
                    isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="mr-1 h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="mr-1 h-3.5 w-3.5" />
                  )}
                  {isPositive ? "+" : ""}
                  {item.change}%
                </div>
                <span className="text-muted-foreground">{item.period}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
