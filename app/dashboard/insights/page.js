import { createClient } from "@/libs/supabase/server";
import InsightsView from "./insights-view";

export const metadata = { title: "Insights" };

function monthRange(offset = 0) {
  const d = new Date();
  const from = new Date(d.getFullYear(), d.getMonth() + offset, 1);
  const to = new Date(d.getFullYear(), d.getMonth() + offset + 1, 0);
  const iso = (x) => x.toISOString().slice(0, 10);
  return { from: iso(from), to: iso(to) };
}

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const now = monthRange(0);
  const from = params?.from || now.from;
  const to = params?.to || now.to;
  const prev = monthRange(-1);

  const supabase = await createClient();
  const [{ data: current }, { data: previous }] = await Promise.all([
    supabase
      .from("active_transactions")
      .select("amount, type, category")
      .gte("created_at", from)
      .lte("created_at", `${to}T23:59:59`),
    supabase
      .from("active_transactions")
      .select("amount, type")
      .gte("created_at", prev.from)
      .lte("created_at", `${prev.to}T23:59:59`),
  ]);

  const sum = (rows, type) =>
    (rows || [])
      .filter((r) => r.type === type)
      .reduce((s, r) => s + Number(r.amount || 0), 0);

  const expenseNow = sum(current, "Expense");
  const expensePrev = sum(previous, "Expense");
  const incomeNow = sum(current, "Income");
  const change =
    expensePrev === 0 ? 0 : Math.round(((expenseNow - expensePrev) / expensePrev) * 100);

  const byCategory = {};
  for (const row of current || []) {
    if (row.type !== "Expense") continue;
    const key = row.category || "Other";
    byCategory[key] = (byCategory[key] || 0) + Number(row.amount || 0);
  }

  return (
    <InsightsView
      from={from}
      to={to}
      incomeNow={incomeNow}
      expenseNow={expenseNow}
      change={change}
      byCategory={byCategory}
    />
  );
}
