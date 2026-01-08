"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { TransactionUI } from "@/features/transactions/model/types";

export type RangePreset = "month" | "30d";

function startOfThisMonthISO() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
}

function last30DaysISO() {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString();
}

function toYYYYMM(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function useDashboardData(preset: RangePreset) {
  const [transactions, setTransactions] = useState<TransactionUI[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const fromISO =
      preset === "month" ? startOfThisMonthISO() : last30DaysISO();
    const toISO = new Date().toISOString();

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
  }, [preset]);

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
