"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteRecurring, saveRecurring } from "@/libs/action";
import { formatCurrency, getStoredCurrency } from "@/hooks/use-format-currency";
import Button from "@/components/button";
import Input from "@/components/input";
import Select from "@/components/select";

export default function RecurringClient({ items, categories, types }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const format = (n) => formatCurrency(n, getStoredCurrency());
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      <form
        className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0b1120]/80 sm:grid-cols-2 lg:grid-cols-3"
        action={(formData) => {
          start(async () => {
            await saveRecurring(formData);
            router.refresh();
          });
        }}
      >
        <Input name="description" placeholder="Netflix, rent, salary" required />
        <Input name="amount" type="number" min="1" step="1" placeholder="Amount" required />
        <Select name="type" defaultValue="Expense">
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
        <Select name="category" defaultValue="Other">
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
        <Select name="interval" defaultValue="monthly">
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Select>
        <Input name="next_date" type="date" defaultValue={today} required />
        <Button disabled={pending}>Add recurring</Button>
      </form>

      <ul className="space-y-2">
        {items.length === 0 && <li className="text-sm text-slate-500">None yet.</li>}
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-[#0b1120]/80"
          >
            <div>
              <p className="font-medium">{item.description}</p>
              <p className="text-slate-500">
                {item.type} · {item.interval} · next {item.next_date}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span>{format(Number(item.amount))}</span>
              <button
                type="button"
                className="text-xs text-slate-400 hover:text-rose-400"
                onClick={() =>
                  start(async () => {
                    await deleteRecurring(item.id);
                    router.refresh();
                  })
                }
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
