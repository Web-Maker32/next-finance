"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatCurrency, getStoredCurrency } from "@/hooks/use-format-currency";

const colors = {
  Income: {
    label: "text-emerald-700 dark:text-emerald-400",
    chip: "bg-emerald-500/10",
  },
  Expense: {
    label: "text-rose-700 dark:text-rose-400",
    chip: "bg-rose-500/10",
  },
  Savings: {
    label: "text-sky-700 dark:text-sky-400",
    chip: "bg-sky-500/10",
  },
  Investment: {
    label: "text-violet-700 dark:text-violet-400",
    chip: "bg-violet-500/10",
  },
};

export default function Trend({ type, amount, prevAmount }) {
  const tone = colors[type] ?? {
    label: "text-slate-600 dark:text-slate-300",
    chip: "bg-slate-500/10",
  };

  const percentageChange = useMemo(() => {
    if (!prevAmount || !amount) return 0;
    return ((amount - prevAmount) / prevAmount) * 100;
  }, [amount, prevAmount]);

  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    const syncCurrency = () => setCurrency(getStoredCurrency());
    syncCurrency();
    window.addEventListener("currency-updated", syncCurrency);
    return () => window.removeEventListener("currency-updated", syncCurrency);
  }, []);

  const up = percentageChange > 0;

  return (
    <div>
      <span
        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${tone.chip} ${tone.label}`}
      >
        {type}
      </span>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {formatCurrency(amount ?? 0, currency)}
      </p>
      <p className="mt-2 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
        {up ? (
          <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <ArrowDownLeft className="h-4 w-4 text-rose-600 dark:text-rose-400" />
        )}
        <span className={up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
          {Math.abs(percentageChange).toFixed(0)}%
        </span>
        vs last period
      </p>
    </div>
  );
}