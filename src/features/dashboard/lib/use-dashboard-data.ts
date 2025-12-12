"use client";

import { useEffect, useMemo, useState } from "react";
import type { TransactionUI } from "@/features/transactions/model/types";

type RangePreset = "month" | "30d";

function startOfThisMonthISO() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), 1);
  return d.toISOString();
}

function last30DaysISO() {
  const now = new Date();
  const d = new Date(now);
  d.setDate(d.getDate() - 30);
  return d.toISOString();
}

function toYyyyMm(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function useDashboardData(preset: RangePreset) {
  const [transactions, setTransactions] = useState<TransactionUI[]>([]);
  const [loading, setLoading] = useState(true);

  const fromISO = preset === "month" ? startOfThisMonthISO() : last30DaysISO();
  const toISO = new Date().toISOString();

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const url = `/api/transactions?from=${encodeURIComponent(fromISO)}&to=${encodeURIComponent(toISO)}`;
      const res = await fetch(url);
      const json = (await res.json()) as TransactionUI[];
      if (!alive) return;
      setTransactions(json);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [fromISO, toISO]);

  const summary = useMemo(() => {
    const totalCents = transactions.reduce((acc, t) => acc + t.amountCents, 0);

    const byCategory = new Map<string, { name: string; cents: number }>();
    for (const t of transactions) {
      const key = t.category.slug;
      const prev = byCategory.get(key);
      byCategory.set(key, {
        name: t.category.name,
        cents: (prev?.cents ?? 0) + t.amountCents,
      });
    }

    const top3 = [...byCategory.entries()]
      .map(([slug, v]) => ({ slug, ...v }))
      .sort((a, b) => b.cents - a.cents)
      .slice(0, 3);

    const byMonth = new Map<string, number>();
    for (const t of transactions) {
      const ym = toYyyyMm(new Date(t.date));
      byMonth.set(ym, (byMonth.get(ym) ?? 0) + t.amountCents);
    }
    const monthsSorted = [...byMonth.keys()].sort();
    const monthly = monthsSorted.map((m) => ({
      month: m,
      cents: byMonth.get(m)!,
    }));

    const pie = [...byCategory.values()].sort((a, b) => b.cents - a.cents);

    return { totalCents, count: transactions.length, top3, monthly, pie };
  }, [transactions]);

  return { transactions, loading, summary, range: { fromISO, toISO } };
}
