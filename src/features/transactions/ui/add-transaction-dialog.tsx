"use client";

import { useEffect, useState } from "react";
import type { CategoryUI } from "@/features/transactions/model/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddTransactionDialog(props: { onCreated: () => void }) {
  const [categories, setCategories] = useState<CategoryUI[]>([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [categoryId, setCategoryId] = useState<string>("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    (async () => {
      const res = await fetch("/api/categories", { cache: "no-store" });
      const json = await res.json();
      setCategories(json);
    })();
  }, [open]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const amountNumber = Number(amount.replace(",", "."));
    if (!amountNumber || amountNumber <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!categoryId) {
      setError("Please select a category.");
      return;
    }

    setSaving(true);
    try {
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountCents: Math.round(amountNumber * 100),
          date,
          categoryId: categoryId,
          description: description.trim() ? description.trim() : null,
        }),
      });

      props.onCreated();
      setOpen(false);
      setAmount("");
      setDescription("");
      setCategoryId("");
      setDate(new Date().toISOString().slice(0, 10));
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-logoGreen text-black hover:brightness-110">
          + Add transaction
        </Button>
      </DialogTrigger>

      <DialogContent className="border-white/10 bg-slate-950 text-white w-[90vw] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Add transaction <span className="text-logoGreen">.</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-slate-200">Amount (PLN)</Label>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 49.99"
                className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-white/10 bg-white/5 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-200">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="border-white/10 bg-white/5 text-white">
                <SelectValue placeholder="Select a category…" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-slate-950 text-white">
                {categories.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-200">Description (optional)</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Groceries"
              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            type="submit"
            disabled={saving}
            className="w-full bg-logoGreen text-black hover:brightness-110 disabled:opacity-70"
          >
            {saving ? "Saving…" : "Add transaction"}
          </Button>

          <p className="text-xs text-slate-400">
            MVP note: saved with userId=1 (replace later with auth).
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
