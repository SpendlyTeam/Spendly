"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard } from "lucide-react";

import {
  useDashboardData,
  type RangePreset,
} from "@/features/dashboard/lib/use-dashboard-data";
import { CategoriesPieChart } from "@/features/dashboard/ui/charts/categories-pie-chart";
import { MonthlyLineChart } from "@/features/dashboard/ui/charts/monthly-line-chart";
import { TransactionsTable } from "@/features/transactions/ui/transactions-table";
import { AddTransactionDialog } from "@/features/transactions/ui/add-transaction-dialog";
import { AddCategoryDialog } from "@/features/categories/ui/add-category-dialog";
import { formatMoneyCents } from "@lib/formatters";

export default function DashboardPage() {
  const [preset, setPreset] = useState<RangePreset>("month");
  const { transactions, loading, summary, refetch } = useDashboardData(preset);

  const pieLabels = summary.pie.map((x) => x.name);
  const pieValues = summary.pie.map((x) => x.cents / 100);
  const pieColors = summary.pie.map((x) => x.color);

  const lineLabels = summary.monthly.map((x) => x.month);
  const lineValues = summary.monthly.map((x) => x.cents / 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-logoGreen selection:text-black">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-[100%] bg-logoGreen/20 opacity-20 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 pt-32 pb-12 space-y-8 relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-logoGreen/20 bg-logoGreen/10 px-3 py-1 text-xs font-medium text-logoGreen">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-logoGreen opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-logoGreen"></span>
              </span>
              Live Dashboard
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Overview<span className="text-logoGreen">.</span>
            </h1>
            <p className="mt-2 text-base text-slate-400 max-w-md">
              Your financial health at a glance. Track spending, analyze trends,
              and stay on budget.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreset("month")}
                className={
                  preset === "month"
                    ? "bg-logoGreen text-black font-semibold shadow-sm hover:bg-logoGreen/90 hover:text-black"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }
              >
                This month
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreset("30d")}
                className={
                  preset === "30d"
                    ? "bg-logoGreen text-black font-semibold shadow-sm hover:bg-logoGreen/90 hover:text-black"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }
              >
                Last 30 days
              </Button>
            </div>

            <div className="h-8 w-px bg-white/10 mx-1 hidden sm:block" />

            <div className="flex gap-2">
              <AddCategoryDialog onCreated={refetch} />
              <AddTransactionDialog onCreated={refetch} />
            </div>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-logoGreen/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                Total Spend
              </CardTitle>
              <Wallet className="h-4 w-4 text-logoGreen opacity-75 group-hover:opacity-100 transition-opacity" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight text-white mb-1">
                {loading ? (
                  <div className="h-9 w-32 animate-pulse bg-white/10 rounded" />
                ) : (
                  formatMoneyCents(summary.totalCents)
                )}
              </div>
              <p className="text-xs text-slate-400">In the selected period</p>
            </CardContent>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-logoGreen/0 via-logoGreen/20 to-logoGreen/0 opacity-0 transition-opacity group-hover:opacity-100" />
          </Card>

          <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-logoGreen/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                Transactions
              </CardTitle>
              <CreditCard className="h-4 w-4 text-logoGreen opacity-75 group-hover:opacity-100 transition-opacity" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight text-white mb-1">
                {loading ? (
                  <div className="h-9 w-16 animate-pulse bg-white/10 rounded" />
                ) : (
                  summary.count
                )}
              </div>
              <p className="text-xs text-slate-400">
                Total transactions recorded
              </p>
            </CardContent>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-logoGreen/0 via-logoGreen/20 to-logoGreen/0 opacity-0 transition-opacity group-hover:opacity-100" />
          </Card>

          <Card className="group relative border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                Top Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-8 w-full animate-pulse bg-white/10 rounded-lg" />
                  <div className="h-8 w-full animate-pulse bg-white/10 rounded-lg" />
                </div>
              ) : summary.top3.length === 0 ? (
                <div className="text-sm text-slate-500 italic">
                  No data available.
                </div>
              ) : (
                summary.top3.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 transition-colors hover:bg-white/10 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full shadow-[0_0_8px]"
                        style={{
                          backgroundColor: c.color || "#7ed957",
                          boxShadow: `0 0 8px ${c.color || "#7ed957"}`,
                        }}
                      />
                      <span className="text-sm font-medium text-slate-200">
                        {c.name}
                      </span>
                    </div>
                    <span className="text-sm font-mono font-semibold text-slate-50">
                      {formatMoneyCents(c.cents)}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-200">Category share</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[340px]">
              {loading ? (
                <div className="text-sm text-slate-400">Loading chart…</div>
              ) : summary.pie.length === 0 ? (
                <div className="text-sm text-slate-400">No data.</div>
              ) : (
                <CategoriesPieChart
                  labels={pieLabels}
                  values={pieValues}
                  colors={pieColors}
                />
              )}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-slate-200">Monthly spending</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[340px]">
              {loading ? (
                <div className="text-sm text-slate-400">Loading chart…</div>
              ) : summary.monthly.length === 0 ? (
                <div className="text-sm text-slate-400">No data.</div>
              ) : (
                <MonthlyLineChart labels={lineLabels} values={lineValues} />
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-slate-200">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-sm text-slate-400">Loading…</div>
            ) : (
              <TransactionsTable items={transactions} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
