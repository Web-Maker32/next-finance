import Header from "@/components/header";

export const metadata = {
  title: "Home",
};

export default function page() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/30">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">Finance made simple</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Track your money with confidence.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Next Finance helps you manage transactions, monitor spending trends, and stay on top of your financial goals in one polished dashboard.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold">Quick insights</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">See recent transactions, spending categories, and balance trends at a glance.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold">Secure access</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">Sign in securely, manage your profile, and keep your data private with user authentication.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

