import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 pb-10">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        Transaction not found
      </h1>
      <p className="max-w-lg text-slate-500 dark:text-slate-400">
        The transaction could not be found or could not be fetched.
      </p>
      <Link
        href="/dashboard"
        className="inline-flex text-sm font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
      >
        Back to dashboard
      </Link>
    </div>
  );
}