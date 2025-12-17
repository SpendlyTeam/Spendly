"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddCategoryDialog(props: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#7ed957");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter a category name.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed, color }),
      });

      if (!res.ok) {
        setError("Something went wrong. Try again.");
        return;
      }

      props.onCreated();
      setOpen(false);
      setName("");
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
          + Add category
        </Button>
      </DialogTrigger>

      <DialogContent className="border-white/10 bg-slate-950 text-white">
        <DialogHeader>
          <DialogTitle>
            Add category <span className="text-logoGreen">.</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-200">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Groceries"
              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-200">Color (optional)</Label>
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 border-white/10 bg-white/5 p-1"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            type="submit"
            disabled={saving}
            className="w-full bg-logoGreen text-black hover:brightness-110 disabled:opacity-70"
          >
            {saving ? "Saving…" : "Create category"}
          </Button>

          <p className="text-xs text-slate-400">
            Slug is generated automatically from the name.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}