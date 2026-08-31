import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/libs/supabase/server";
import Range from "./components/range";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";
import TransactionListWarper from "./components/transaction-list-warper";
import TransactionListFallback from "./components/transaction-listfallback";
import DashboardMotion from "./components/dashboard-motion";

export const metadata = {
  title: "Dashboard",
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const defaultView = data?.user?.user_metadata?.defaultView ?? "last30days";
  const range = params?.range ?? defaultView;

  return (
    <DashboardMotion>
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Summary
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Income, expenses, and recent activity
          </p>
        </div>
        <Range defaultView={defaultView} />
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["Income", "Expense", "Saving", "Investment"].map((type) => (
          <div
            key={type}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0b1120]/80"
          >
            <Suspense fallback={<TrendFallback />}>
              <Trend type={type} range={range} />
            </Suspense>
          </div>
        ))}
      </section>

      <section className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Transactions
        </h2>
        <Link
          href="/dashboard/transactions/add"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          <Plus className="h-4 w-4" />
          Add
        </Link>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0b1120]/80 sm:p-6">
        <Suspense fallback={<TransactionListFallback />}>
          <TransactionListWarper range={range} />
        </Suspense>
      </section>
    </DashboardMotion>
  );
}