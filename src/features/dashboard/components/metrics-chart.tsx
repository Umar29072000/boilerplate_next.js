"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { ChartDataPoint } from "../types";

interface MetricsChartProps {
  data?: ChartDataPoint[];
  isLoading?: boolean;
}

export function MetricsChart({ data = [], isLoading }: MetricsChartProps) {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  if (isLoading || data.length === 0) {
    return (
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Revenue Trend</CardTitle>
          <CardDescription>Daily revenue volume across payment channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full animate-pulse rounded-md bg-muted/40" />
        </CardContent>
      </Card>
    );
  }

  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const minRevenue = Math.min(...data.map((d) => d.revenue));
  const height = 200;
  const width = 600;
  const paddingX = 40;
  const paddingY = 20;

  const points = data.map((d, i) => {
    const x = paddingX + (i * (width - paddingX * 2)) / (data.length - 1);
    const y =
      height -
      paddingY -
      ((d.revenue - minRevenue * 0.8) / (maxRevenue - minRevenue * 0.8 || 1)) *
        (height - paddingY * 2);
    return { x, y, data: d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  const activePoint = hoveredIdx !== null ? points[hoveredIdx] : points[points.length - 1];

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">Revenue Trend</CardTitle>
          <CardDescription>Daily gross settlement volume</CardDescription>
        </div>
        <div className="text-right">
          <div className="font-mono text-xs font-semibold tabular-nums text-foreground">
            {formatCurrency(activePoint.data.revenue)}
          </div>
          <div className="text-[10px] text-muted-foreground">
            {activePoint.data.date} • {formatNumber(activePoint.data.volume)} orders
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full overflow-visible"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" className="text-zinc-500/20 dark:text-zinc-100/20" />
                <stop offset="100%" stopColor="currentColor" className="text-zinc-500/0 dark:text-zinc-100/0" />
              </linearGradient>
            </defs>

            {/* Subtle grid lines */}
            <line
              x1={paddingX}
              y1={height - paddingY}
              x2={width - paddingX}
              y2={height - paddingY}
              className="stroke-border"
              strokeWidth="1"
            />
            <line
              x1={paddingX}
              y1={height / 2}
              x2={width - paddingX}
              y2={height / 2}
              className="stroke-border/40"
              strokeDasharray="4 4"
              strokeWidth="1"
            />

            {/* Area Fill */}
            <path d={areaD} fill="url(#revenueGradient)" />

            {/* Stroke Line */}
            <path
              d={pathD}
              fill="none"
              className="stroke-zinc-900 dark:stroke-zinc-100"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Data Points */}
            {points.map((p, i) => (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIdx === i ? "5" : "3"}
                  className={`transition-all ${
                    hoveredIdx === i
                      ? "fill-zinc-900 stroke-background dark:fill-zinc-100"
                      : "fill-zinc-500/80"
                  }`}
                  strokeWidth="2"
                />
                {/* Hit target */}
                <rect
                  x={p.x - 20}
                  y={0}
                  width="40"
                  height={height}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-2 flex justify-between px-2 text-[10px] font-mono text-muted-foreground">
          {data.map((d, i) => (
            <span key={i}>{d.date}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
