"use client";

import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, CreditCard, Calendar } from "lucide-react";

import {
  useDashboardData,
  type DashboardRange,
  type CustomDateRange,
} from "@/features/dashboard/lib/use-dashboard-data";
import { ExportPdfDialog } from "@/features/dashboard/ui/export-pdf-dialog";
import { CategoriesPieChart } from "@/features/dashboard/ui/charts/categories-pie-chart";
import { MonthlyLineChart } from "@/features/dashboard/ui/charts/monthly-line-chart";
import { TransactionsTable } from "@/features/transactions/ui/transactions-table";
import { AddTransactionDialog } from "@/features/transactions/ui/add-transaction-dialog";
import { AddCategoryDialog } from "@/features/categories/ui/add-category-dialog";
import { formatMoneyCents } from "@lib/formatters";
import { cn } from "@lib/utils";

function toDateInputValue(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseDateInputValue(value: string): Date | null {
  const [y, m, d] = value.split("-").map(Number);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d))
    return null;
  const date = new Date(y, m - 1, d);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function startOfThisMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export default function DashboardPage() {
  const [range, setRange] = useState<DashboardRange>("year");
  const pieChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);
  const isCustom =
    typeof range === "object" && "from" in range && "to" in range;
  const customFrom = isCustom ? range.from : startOfThisMonth();
  const customTo = isCustom ? range.to : new Date();

  const { transactions, loading, summary, refetch } = useDashboardData(range);

  const applyCustomRange = (from: Date, to: Date) => {
    if (from > to) return;
    setRange({ from, to } satisfies CustomDateRange);
  };

  const pieLabels = summary.pie.map((x) => x.name);
  const pieValues = summary.pie.map((x) => x.cents / 100);
  const pieColors = summary.pie.map((x) => x.color);

  const lineLabels = summary.monthly.map((x) => x.month);
  const lineValues = summary.monthly.map((x) => x.cents / 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-logoGreen selection:text-black">
      <div className="" />

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
            <div className="mt-4">
              <ExportPdfDialog />
            </div>
          </div>

          <div className="flex min-w-0 flex-1 justify-end">
            <div className="inline-flex flex-col items-end gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex w-[320px] shrink-0 bg-white/5 border border-white/10 rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRange("year")}
                    className={
                      range === "year"
                        ? "flex-1 bg-logoGreen text-black font-semibold shadow-sm hover:brightness-110 px-3 py-2 text-xs"
                        : "flex-1 text-slate-400 hover:text-white hover:bg-white/10 px-3 py-2 text-xs transition-colors"
                    }
                  >
                    Year
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRange("month")}
                    className={
                      range === "month"
                        ? "flex-1 bg-logoGreen text-black font-semibold shadow-sm hover:brightness-110 px-3 py-2 text-xs"
                        : "flex-1 text-slate-400 hover:text-white hover:bg-white/10 px-3 py-2 text-xs transition-colors"
                    }
                  >
                    Month
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRange("30d")}
                    className={
                      range === "30d"
                        ? "flex-1 bg-logoGreen text-black font-semibold shadow-sm hover:brightness-110 px-3 py-2 text-xs"
                        : "flex-1 text-slate-400 hover:text-white hover:bg-white/10 px-3 py-2 text-xs transition-colors"
                    }
                  >
                    30 days
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setRange({
                        from: startOfThisMonth(),
                        to: new Date(),
                      })
                    }
                    className={
                      isCustom
                        ? "flex-1 bg-logoGreen text-black font-semibold shadow-sm hover:brightness-110 px-3 py-2 text-xs"
                        : "flex-1 text-slate-400 hover:text-white hover:bg-white/10 px-3 py-2 text-xs transition-colors"
                    }
                  >
                    <Calendar className="mr-1.5 h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">Custom</span>
                  </Button>
                </div>
                <div className="h-6 w-px shrink-0 bg-white/10 hidden sm:block" />
                <div className="flex shrink-0 gap-1.5">
                  <AddCategoryDialog onCreated={refetch} />
                  <AddTransactionDialog onCreated={refetch} />
                </div>
              </div>
              <div
                className={cn(
                  "grid w-full min-w-0 overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out",
                  isCustom
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="flex min-h-0 w-full justify-start">
                  <div className="flex w-[320px] flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5">
                    <label className="flex min-w-0 flex-1 basis-0 items-center gap-1.5 text-xs text-slate-400">
                      From
                      <Input
                        type="date"
                        value={toDateInputValue(customFrom)}
                        onChange={(e) => {
                          const d = parseDateInputValue(e.target.value);
                          if (d) applyCustomRange(d, customTo);
                        }}
                        onClick={(e) =>
                          (e.currentTarget as HTMLInputElement).showPicker?.()
                        }
                        onFocus={(e) => {
                          const el = e.currentTarget as HTMLInputElement;
                          el.showPicker?.();
                          setTimeout(
                            () =>
                              el.setSelectionRange?.(
                                el.value.length,
                                el.value.length,
                              ),
                            0,
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey)
                            e.preventDefault();
                        }}
                        className="h-7 min-w-0 flex-1 cursor-pointer select-none border-white/10 bg-black/20 text-slate-200 text-xs [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70"
                      />
                    </label>
                    <label className="flex min-w-0 flex-1 basis-0 items-center gap-1.5 text-xs text-slate-400">
                      To
                      <Input
                        type="date"
                        value={toDateInputValue(customTo)}
                        onChange={(e) => {
                          const d = parseDateInputValue(e.target.value);
                          if (d) applyCustomRange(customFrom, d);
                        }}
                        onClick={(e) =>
                          (e.currentTarget as HTMLInputElement).showPicker?.()
                        }
                        onFocus={(e) => {
                          const el = e.currentTarget as HTMLInputElement;
                          el.showPicker?.();
                          setTimeout(
                            () =>
                              el.setSelectionRange?.(
                                el.value.length,
                                el.value.length,
                              ),
                            0,
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey)
                            e.preventDefault();
                        }}
                        className="h-7 min-w-0 flex-1 cursor-pointer select-none border-white/10 bg-black/20 text-slate-200 text-xs [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70"
                      />
                    </label>
                  </div>
                </div>
              </div>
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
                <div ref={pieChartRef}>
                  <CategoriesPieChart
                    labels={pieLabels}
                    values={pieValues}
                    colors={pieColors}
                  />
                </div>
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
                <div ref={lineChartRef}>
                  <MonthlyLineChart labels={lineLabels} values={lineValues} />
                </div>
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
