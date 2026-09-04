import { createClient } from "@/libs/supabase/server";
import { categories, types } from "@/libs/consts";
import RecurringClient from "./recurring-client";

export const metadata = { title: "Recurring" };

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recurring_transactions")
    .select("*")
    .order("next_date");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Recurring</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Subscriptions, salary, and bills.
        </p>
      </div>
      {error && (
        <p className="rounded-xl border border-amber-300/40 bg-amber-50 p-3 text-sm dark:bg-amber-400/10">
          Run sql/upgrades.sql in Supabase if this table is missing.
        </p>
      )}
      <RecurringClient items={data || []} categories={categories} types={types} />
    </div>
  );
}
