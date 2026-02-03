"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { TransactionUI } from "@/features/transactions/model/types";

export type RangePreset = "month" | "7d" | "year";

export type CustomDateRange = {
  from: Date;
  to: Date;
};

export type DashboardRange = RangePreset | CustomDateRange;

function isCustomRange(range: DashboardRange): range is CustomDateRange {
  return typeof range === "object" && "from" in range && "to" in range;
}

function startOfThisMonthISO() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
}

function last12MonthsISO() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toISOString();
}

function last7DaysISO() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString();
}

function startOfDayISO(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.toISOString();
}

function endOfDayISO(d: Date) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x.toISOString();
}

function toYYYYMM(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export type SummaryFromTransactions = {
  totalCents: number;
  count: number;
  top3: { name: string; cents: number; color: string }[];
  monthly: { month: string; cents: number }[];
  pie: { name: string; cents: number; color: string }[];
};

export function computeSummaryFromTransactions(
  transactions: TransactionUI[],
): SummaryFromTransactions {
  const totalCents = transactions.reduce((a, t) => a + t.amountCents, 0);
  const byCategory = new Map<
    string,
    { name: string; cents: number; color: string }
  >();
  for (const t of transactions) {
    const key = t.category.slug;
    const prev = byCategory.get(key);
    byCategory.set(key, {
      name: t.category.name,
      cents: (prev?.cents ?? 0) + t.amountCents,
      color: t.category.color ?? "#94a3b8",
    });
  }
  const top3 = [...byCategory.values()]
    .sort((a, b) => b.cents - a.cents)
    .slice(0, 3);
  const byMonth = new Map<string, number>();
  for (const t of transactions) {
    const ym = toYYYYMM(new Date(t.date));
    byMonth.set(ym, (byMonth.get(ym) ?? 0) + t.amountCents);
  }
  const months = [...byMonth.keys()].sort();
  const monthly = months.map((m) => ({ month: m, cents: byMonth.get(m)! }));
  const pie = [...byCategory.values()].sort((a, b) => b.cents - a.cents);
  return { totalCents, count: transactions.length, top3, monthly, pie };
}

export function useDashboardData(range: DashboardRange) {
  const [transactions, setTransactions] = useState<TransactionUI[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    let fromISO: string;
    let toISO: string;
    if (isCustomRange(range)) {
      fromISO = startOfDayISO(range.from);
      toISO = endOfDayISO(range.to);
    } else {
      if (range === "year") {
        fromISO = last12MonthsISO();
      } else {
        fromISO = range === "month" ? startOfThisMonthISO() : last7DaysISO();
      }
      toISO = new Date().toISOString();
    }

    setLoading(true);
    try {
      const url = `/api/transactions?from=${encodeURIComponent(fromISO)}&to=${encodeURIComponent(toISO)}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const json = (await res.json()) as TransactionUI[];
      setTransactions(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!alive) return;
      await fetchData();
    })();
    return () => {
      alive = false;
    };
  }, [fetchData]);

  const summary = useMemo(() => {
    const totalCents = transactions.reduce((a, t) => a + t.amountCents, 0);

    const byCategory = new Map<
      string,
      { name: string; cents: number; color: string }
    >();
    for (const t of transactions) {
      const key = t.category.slug;
      const prev = byCategory.get(key);
      byCategory.set(key, {
        name: t.category.name,
        cents: (prev?.cents ?? 0) + t.amountCents,
        color: t.category.color ?? "#94a3b8",
      });
    }

    const top3 = [...byCategory.values()]
      .sort((a, b) => b.cents - a.cents)
      .slice(0, 3);

    const byMonth = new Map<string, number>();
    for (const t of transactions) {
      const ym = toYYYYMM(new Date(t.date));
      byMonth.set(ym, (byMonth.get(ym) ?? 0) + t.amountCents);
    }
    const months = [...byMonth.keys()].sort();
    const monthly = months.map((m) => ({ month: m, cents: byMonth.get(m)! }));

    const pie = [...byCategory.values()].sort((a, b) => b.cents - a.cents);

    return { totalCents, count: transactions.length, top3, monthly, pie };
  }, [transactions]);

  return { transactions, loading, summary, refetch: fetchData };
}
