"use client";

import { useEffect, useState } from "react";
import { formatCurrency, getStoredCurrency } from "@/hooks/use-format-currency";

export default function TransactionItemsSummary({ date, amount }) {
  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    const syncCurrency = () => setCurrency(getStoredCurrency());
    syncCurrency();
    window.addEventListener("currency-updated", syncCurrency);
    return () => window.removeEventListener("currency-updated", syncCurrency);
  }, []);

  return (
    <div className="flex items-baseline justify-between gap-3 px-2 text-sm font-medium text-slate-500 dark:text-slate-400">
      <div>{date}</div>
      <div className="tabular-nums">{formatCurrency(amount, currency)}</div>
    </div>
  );
}