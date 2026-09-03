"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteBudget, saveBudget } from "@/libs/action";
import { formatCurrency, getStoredCurrency } from "@/hooks/use-format-currency";
import Button from "@/components/button";
import Input from "@/components/input";
import Select from "@/components/select";

function tone(pct) {
  if (pct >= 100) return "bg-rose-500";
  if (pct >= 80) return "bg-amber-400";
  return "bg-emerald-400";
}

export default function BudgetClient({ items, categories }) {
  const router = useRouter();
  const format = (n) => formatCurrency(n, getStoredCurrency());
  const [pending, start] = useTransition();
  const [error, setError] = useState("");

  return (
    <div className="space-y-6">
      <form
        className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0b1120]/80 sm:grid-cols-3"
        action={(formData) => {
          setError("");
          start(async () => {
            try {
              await saveBudget(formData);
              router.refresh();
            } catch (err) {
              setError(err.message);
            }
          });
        }}
      >
        <Select name="category" defaultValue={categories[0]} required>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
        <Input name="monthly_limit" type="number" min="1" step="1" placeholder="Monthly limit" required />
        <Button disabled={pending}>Save budget</Button>
      </form>
      {error && <p className="text-sm text-rose-400">{error}</p>}

      <ul className="space-y-3">
        {items.length === 0 && (
          <li className="text-sm text-slate-500">No budgets yet.</li>
        )}
        {items.map((b) => {
          const pct = Math.min(100, Math.round((b.spent / b.monthly_limit) * 100));
          return (
            <li
              key={b.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0b1120]/80"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{b.category}</span>
                <span>
                  {format(b.spent)} / {format(b.monthly_limit)}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                <div className={`h-full ${tone(pct)}`} style={{ width: `${pct}%` }} />
              </div>
              {pct >= 80 && (
                <p className="mt-2 text-xs text-amber-600 dark:text-amber-300">
                  {pct >= 100 ? "Over budget" : "Over 80% of this month’s limit"}
                </p>
              )}
              <button
                type="button"
                className="mt-3 text-xs text-slate-400 hover:text-rose-400"
                onClick={() =>
                  start(async () => {
                    await deleteBudget(b.id);
                    router.refresh();
                  })
                }
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
