import { fetchAllTransactions } from "@/libs/action";
import CsvClient from "./csv-client";

export const metadata = { title: "CSV" };

export default async function Page() {
  let rows = [];
  let error = "";
  try {
    rows = await fetchAllTransactions();
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-semibold">CSV</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          A CSV is a spreadsheet file. Download your data or upload a bank statement.
        </p>
      </div>
      {error && (
        <p className="rounded-xl border border-amber-300/40 bg-amber-50 p-3 text-sm dark:bg-amber-400/10">
          {error}
        </p>
      )}
      <CsvClient rows={rows} />
    </div>
  );
}
