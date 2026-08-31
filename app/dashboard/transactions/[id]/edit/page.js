import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import TransactionForm from "@/app/dashboard/components/transaction-form";

export const metadata = {
  title: "Edit Transaction",
};

export default async function Page({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: transaction, error } = await supabase
    .from("active_transactions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) notFound();

  return (
    <div className="space-y-6 pb-10">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>

      <div>
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Next Finance
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Edit transaction
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Update the details, then save to return to your dashboard.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0b1120]/80 sm:p-6">
        <TransactionForm initialData={transaction} />
      </div>
    </div>
  );
}