"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { downloadCsv, parseCsv, toCsv } from "@/libs/csv";
import { importTransactions } from "@/libs/action";
import Button from "@/components/button";

export default function CsvClient({ rows }) {
  const router = useRouter();
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0b1120]/80">
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={() => downloadCsv("transactions.csv", toCsv(rows))}
        >
          Download my data
        </Button>
        <label className="inline-flex cursor-pointer items-center rounded-xl border border-slate-200 px-4 py-2 text-sm dark:border-white/15">
          Upload CSV
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              const parsed = parseCsv(await file.text());
              if (!parsed.length) {
                setError("No valid rows. Use columns: date, description, amount, type, category.");
                setPreview([]);
                return;
              }
              setError("");
              setPreview(parsed);
            }}
          />
        </label>
      </div>

      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}

      {preview.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="text-sm">{preview.length} rows ready to import</p>
          <Button
            disabled={pending}
            onClick={() =>
              start(async () => {
                try {
                  await importTransactions(preview);
                  setPreview([]);
                  router.refresh();
                } catch (err) {
                  setError(err.message);
                }
              })
            }
          >
            Import these rows
          </Button>
        </div>
      )}
    </section>
  );
}
