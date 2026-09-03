"use client";

export default function StatusBanner({ error, onRetry }) {
  if (!error) return null;

  const paused = /fetch|network|timeout|paused|Failed to fetch|can't fetch/i.test(
    String(error)
  );

  return (
    <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-amber-300/40 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100">
      <p>
        {paused
          ? "Supabase may be waking up or offline. Wait a few seconds and retry."
          : String(error)}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white"
        >
          Retry
        </button>
      )}
    </div>
  );
}
