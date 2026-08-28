import { variants, sizes } from "@/libs/veriant";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Layout({ children }) {
  return (
    <main className="relative min-h-screen">
      <div className="absolute left-6 top-6 z-10 sm:left-8 sm:top-8">
        <Link
          href="/"
          className={`${variants["ghost"]} ${sizes["base"]} inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
      </div>

      <div className="flex min-h-screen items-center justify-center">
        {children}
      </div>
    </main>
  );
}