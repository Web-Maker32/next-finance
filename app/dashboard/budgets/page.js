import { createClient } from "@/libs/supabase/server";
import { categories } from "@/libs/consts";
import BudgetClient from "./budget-client";

export const metadata = { title: "Budgets" };

export default async function Page() {
  const supabase = await createClient();
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const [{ data: budgets }, { data: spentRows }] = await Promise.all([
    supabase.from("budgets").select("*").order("category"),
    supabase
      .from("active_transactions")
      .select("category, amount, type")
      .eq("type", "Expense")
      .gte("created_at", start.toISOString()),
  ]);

  const spent = {};
  for (const row of spentRows || []) {
    const key = row.category || "Other";
    spent[key] = (spent[key] || 0) + Number(row.amount || 0);
  }

  const items = (budgets || []).map((b) => ({
    ...b,
    spent: spent[b.category] || 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Budgets</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Monthly category limits. Badge at 80% and when over.
        </p>
      </div>
      <BudgetClient items={items} categories={categories} />
    </div>
  );
}
