"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileDown, Calendar } from "lucide-react";
import type { TransactionUI } from "@/features/transactions/model/types";
import {
  type CustomDateRange,
  type DashboardRange,
  computeSummaryFromTransactions,
} from "@/features/dashboard/lib/use-dashboard-data";
import { generateDashboardPdf } from "@/features/dashboard/lib/generate-dashboard-pdf";

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

function getRangeFromToISO(range: DashboardRange): {
  fromISO: string;
  toISO: string;
} {
  if (range === "month") {
    const from = new Date();
    from.setDate(1);
    from.setHours(0, 0, 0, 0);
    return { fromISO: from.toISOString(), toISO: new Date().toISOString() };
  }
  if (range === "7d") {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 7);
    return { fromISO: from.toISOString(), toISO: to.toISOString() };
  }
  if (range === "year") {
    const now = new Date();
    const from = new Date();
    from.setFullYear(now.getFullYear() - 1);
    return { fromISO: from.toISOString(), toISO: now.toISOString() };
  }
  const from = new Date(range.from);
  from.setHours(0, 0, 0, 0);
  const to = new Date(range.to);
  to.setHours(23, 59, 59, 999);
  return { fromISO: from.toISOString(), toISO: to.toISOString() };
}

function formatPeriodLabel(range: DashboardRange): string {
  if (range === "month") {
    const now = new Date();
    return new Intl.DateTimeFormat("en-GB", {
      month: "long",
      year: "numeric",
    }).format(now);
  }
  if (range === "7d") return "Last 7 days";
  if (range === "year") return "Last 12 months";
  const from = range.from;
  const to = range.to;
  return `${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(from)} – ${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(to)}`;
}

export function ExportPdfDialog() {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DashboardRange>("year");
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  const isCustom =
    typeof range === "object" && "from" in range && "to" in range;
  const effectiveFrom = isCustom ? range.from : startOfThisMonth();
  const effectiveTo = isCustom ? range.to : new Date();

  const applyCustom = (from: Date, to: Date) => {
    if (from > to) return;
    setRange({ from, to } satisfies CustomDateRange);
  };

  async function handleExport() {
    setError("");
    setExporting(true);
    try {
      const { fromISO, toISO } = getRangeFromToISO(range);
      const res = await fetch(
        `/api/transactions?from=${encodeURIComponent(fromISO)}&to=${encodeURIComponent(toISO)}`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const transactions = (await res.json()) as TransactionUI[];
      const summary = computeSummaryFromTransactions(transactions);
      const periodLabel = formatPeriodLabel(range);
      generateDashboardPdf({
        periodLabel,
        summary: {
          totalCents: summary.totalCents,
          count: summary.count,
          top3: summary.top3.map((c) => ({ ...c, color: c.color })),
          monthly: summary.monthly,
          pie: summary.pie.map((c) => ({ ...c, color: c.color })),
        },
        transactions: transactions.map((t) => ({
          date: t.date,
          description: t.description ?? null,
          categoryName: t.category.name,
          amountCents: t.amountCents,
        })),
      });
      setOpen(false);
    } catch (e) {
      console.error(e);
      setError("Failed to export. Try again.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white border border-white/10">
          <FileDown className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="border-white/10 bg-slate-950 text-white w-[90vw] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Export PDF <span className="text-logoGreen">.</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-200">Date range</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRange("year")}
                className={
                  range === "year"
                    ? "bg-logoGreen text-black hover:brightness-110"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }
              >
                Year
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRange("month")}
                className={
                  range === "month"
                    ? "bg-logoGreen text-black hover:brightness-110"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }
              >
                Month
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRange("7d")}
                className={
                  range === "7d"
                    ? "bg-logoGreen text-black hover:brightness-110"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }
              >
                7 days
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  setRange({ from: startOfThisMonth(), to: new Date() })
                }
                className={
                  isCustom
                    ? "bg-logoGreen text-black hover:brightness-110"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }
              >
                <Calendar className="mr-1.5 h-3.5 w-3.5" />
                Custom
              </Button>
            </div>
          </div>
          {isCustom && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs">From</Label>
                <Input
                  type="date"
                  value={toDateInputValue(effectiveFrom)}
                  onChange={(e) => {
                    const d = parseDateInputValue(e.target.value);
                    if (d) applyCustom(d, effectiveTo);
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
                  className="cursor-pointer select-none border-white/10 bg-white/5 text-white pr-2 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs">To</Label>
                <Input
                  type="date"
                  value={toDateInputValue(effectiveTo)}
                  onChange={(e) => {
                    const d = parseDateInputValue(e.target.value);
                    if (d) applyCustom(effectiveFrom, d);
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
                  className="cursor-pointer select-none border-white/10 bg-white/5 text-white pr-2 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
              </div>
            </div>
          )}
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="w-full bg-logoGreen text-black hover:brightness-110 disabled:opacity-70"
          >
            {exporting ? "Exporting…" : "Export PDF"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
