"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import type { Transaction, TransactionStatus } from "../types";

interface RecentTransactionsTableProps {
  transactions?: Transaction[];
  isLoading?: boolean;
}

const statusVariants: Record<
  TransactionStatus,
  "success" | "warning" | "destructive" | "secondary"
> = {
  completed: "success",
  pending: "warning",
  failed: "destructive",
  refunded: "secondary",
};

const methodLabels: Record<string, string> = {
  qris: "QRIS",
  bank_transfer: "Bank Transfer",
  e_wallet: "E-Wallet",
  credit_card: "Credit Card",
};

export function RecentTransactionsTable({
  transactions = [],
  isLoading,
}: RecentTransactionsTableProps) {
  if (isLoading) {
    return (
      <Card className="border-border">
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Recent Transactions
          </CardTitle>
          <CardDescription>Real-time transaction settlement log</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No transactions found"
            description="Transactions will automatically appear here once incoming orders are processed."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base font-semibold">
            Recent Transactions
          </CardTitle>
          <CardDescription>Latest processed transactions across channels</CardDescription>
        </div>
        <Badge variant="outline" className="font-mono text-[10px]">
          Live stream
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[140px]">Reference</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Settled At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((trx) => (
              <TableRow key={trx.id}>
                <TableCell className="font-mono text-xs font-medium text-foreground">
                  {trx.referenceNumber}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-foreground">
                      {trx.customerName}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {trx.customerEmail}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-muted-foreground">
                    {methodLabels[trx.method] || trx.method}
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs font-semibold tabular-nums text-foreground">
                  {formatCurrency(trx.amount)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={statusVariants[trx.status] || "secondary"}
                    className="capitalize text-[10px]"
                  >
                    {trx.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-[11px] text-muted-foreground tabular-nums">
                  {formatDateTime(trx.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
