"use client";

import { useRouter } from "next/navigation";
import { formatCurrency, getStoredCurrency } from "@/hooks/use-format-currency";

const colors = ["#38bdf8", "#34d399", "#fbbf24", "#f87171", "#a78bfa", "#fb7185"];

export default function InsightsView({
  from,
  to,
  incomeNow,
  expenseNow,
  change,
  byCategory,
}) {
  const router = useRouter();
  const format = (n) => formatCurrency(n, getStoredCurrency());
  const entries = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, n]) => s + n, 0) || 1;
  const slices = entries.reduce((result, [label, value], i) => {
    const next = (value / total) * 360;
    const start = result.at(-1)?.start + result.at(-1)?.next || 0;
    result.push({ label, value, color: colors[i % colors.length], start, next });
    return result;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Insights</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Custom dates stay in the URL.
          </p>
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            router.push(
              `/dashboard/insights?from=${data.get("from")}&to=${data.get("to")}`
            );
          }}
        >
          <input
            type="date"
            name="from"
            defaultValue={from}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-white/10 dark:bg-[#0b1120]"
          />
          <input
            type="date"
            name="to"
            defaultValue={to}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-white/10 dark:bg-[#0b1120]"
          />
          <button className="h-11 rounded-xl bg-slate-900 px-4 text-sm text-white dark:bg-white dark:text-slate-900">
            Apply
          </button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Income" value={format(incomeNow)} />
        <Stat label="Spending" value={format(expenseNow)} />
        <Stat
          label="vs last month spending"
          value={`${change > 0 ? "+" : ""}${change}%`}
        />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0b1120]/80">
        <h2 className="font-medium">Category breakdown</h2>
        {entries.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No expenses in this range.</p>
        ) : (
          <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row">
            <svg viewBox="0 0 32 32" className="h-40 w-40 -rotate-90">
              {slices.map((s) => {
                const r = 16;
                const circ = 2 * Math.PI * 10;
                const dash = (s.next / 360) * circ;
                const offset = -((s.start / 360) * circ);
                return (
                  <circle
                    key={s.label}
                    cx="16"
                    cy="16"
                    r="10"
                    fill="transparent"
                    stroke={s.color}
                    strokeWidth="6"
                    strokeDasharray={`${dash} ${circ}`}
                    strokeDashoffset={offset}
                  />
                );
              })}
            </svg>
            <ul className="w-full space-y-2 text-sm">
              {slices.map((s) => (
                <li key={s.label} className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <i className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </span>
                  <span>{format(s.value)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0b1120]/80">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
