"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import Button from "@/components/button";
import { deleteTransaction } from "@/libs/action";

export default function TransactionItem({
  id,
  type,
  category,
  description,
  amount,
  onRemoved,
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef(null);
  const expense = type === "Expense";

  const confirmDelete = async () => {
    setBusy(true);
    setError("");
    try {
      await deleteTransaction(id);
      onRemoved?.();
      setOpen(false);
    } catch {
      setError("Could not delete this transaction. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !busy) setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, busy]);

  return (
    <>
      <div className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-slate-50 dark:hover:bg-white/5">
        <div className="min-w-0 grow">
          <p className="truncate font-medium text-slate-900 dark:text-white">
            {description}
          </p>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {type}
            {category ? ` · ${category}` : ""}
          </p>
        </div>

        <p
            className={`min-w-[78px] text-right text-sm font-medium tabular-nums sm:min-w-[90px] sm:text-base ${
            expense ? "text-slate-900 dark:text-white" : "text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {expense ? "-" : "+"}${Number(amount).toFixed(2)}
        </p>

        <div className="flex shrink-0">
          <Link
            href={`/dashboard/transactions/${id}/edit`}
            className="inline-flex size-11 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label={`Edit ${description}`}
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
            aria-label={`Delete ${description}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onMouseDown={() => !busy && setOpen(false)}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`delete-title-${id}`}
            aria-describedby={`delete-description-${id}`}
            tabIndex={-1}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 outline-none dark:border-white/10 dark:bg-[#0b1120]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h2 id={`delete-title-${id}`} className="text-lg font-semibold text-slate-900 dark:text-white">
              Delete this transaction?
            </h2>
            <p id={`delete-description-${id}`} className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              “{description}” will be removed. This cannot be undone.
            </p>
            {error && <p className="mt-3 text-sm text-rose-500" role="alert">{error}</p>}
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)} disabled={busy}>
                Cancel
              </Button>
              <Button onClick={confirmDelete} disabled={busy}>
                {busy ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}