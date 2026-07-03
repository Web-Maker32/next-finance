import Link from "next/link";
import Header from "@/components/header";

export const metadata = {
  title: "Home",
};

export default function page() {
  return (
    <div className=" min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="space-x-4 mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <section className="space-y-8  rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/30">
          <Header className="mb-8" />
          <p className="text-xl text-sky-600 dark:text-sky-400">Finance made simple</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Track your money with confidence
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Next Finance helps you manage transactions, track spending, and reach your financial goals with one polished dashboard.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-6 py-3 text-base font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200 sm:w-auto"
            >
              Get started
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold">Quick insights</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                View recent transactions, spending categories, and balance activity at a glance.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold">Secure access</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                Sign in securely and keep your data private with built-in authentication.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

