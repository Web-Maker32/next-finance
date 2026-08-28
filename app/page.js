import Footer from "@/components/footer";
import Header from "@/components/header";
import HomeContent from "@/components/home-content";

export const metadata = {
  title: "Home | Next Finance",
  description: "Track your money with confidence.",
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1120]/80 dark:shadow-black/40 sm:p-8 lg:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

          <Header />
          <HomeContent />
        </section>

        <section className="mt-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Three simple steps to take control of your money
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create your account",
                desc: "Sign up in seconds with email or magic link.",
              },
              {
                step: "02",
                title: "Add your transactions",
                desc: "Manually or connect your accounts later.",
              },
              {
                step: "03",
                title: "Track & grow",
                desc: "Watch insights appear and hit your goals.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1120]/60"
              >
                <div className="text-sm font-medium text-sky-600 dark:text-sky-400">
                  {s.step}
                </div>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-slate-500 dark:text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 flex flex-col items-center justify-center gap-6 rounded-2xl border border-slate-200 bg-white/70 px-6 py-8 text-sm text-slate-500 dark:border-white/10 dark:bg-[#0b1120]/50 dark:text-slate-400 sm:flex-row sm:gap-12">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">🔒</span>
            End-to-end encrypted
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sky-500">🛡</span>
            Private by default
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-500">⚡</span>
            Fast & lightweight
          </div>
        </div>

       <Footer/>
      </main>
    </div>
  );
}