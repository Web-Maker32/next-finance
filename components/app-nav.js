"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Plus,
  Wallet,
  PieChart,
  Repeat,
  FileSpreadsheet,
  Settings,
  MoreHorizontal,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/transactions/add", label: "Add", icon: Plus },
  { href: "/dashboard/budgets", label: "Budgets", icon: Wallet },
  { href: "/dashboard/insights", label: "Insights", icon: PieChart },
  { href: "/dashboard/recurring", label: "Recurring", icon: Repeat },
  { href: "/dashboard/data", label: "CSV", icon: FileSpreadsheet },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function AppNav() {
  const path = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const primaryLinks = links.slice(0, 4);
  const secondaryLinks = links.slice(4);

  const renderLink = ({ href, label, icon: Icon }) => {
    const active =
      href === "/dashboard"
        ? path === "/dashboard"
        : path === href || path.startsWith(`${href}/`);

    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        onClick={() => setMoreOpen(false)}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#05070f] ${
          active
            ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
            : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </Link>
    );
  };

  return (
    <nav aria-label="Main navigation" className="relative mt-4">
      <div className="hidden gap-1 md:flex">
        {links.map(renderLink)}
      </div>

      <div className="flex items-center gap-1 md:hidden">
        {primaryLinks.map(renderLink)}
        <button
          type="button"
          aria-expanded={moreOpen}
          aria-controls="mobile-more-menu"
          onClick={() => setMoreOpen((open) => !open)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200/70 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
          More
        </button>
      </div>

      {moreOpen ? (
        <div
          id="mobile-more-menu"
          className="absolute right-0 top-full z-10 mt-2 flex min-w-44 flex-col gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-white/10 dark:bg-[#0b1120]"
        >
          {secondaryLinks.map(renderLink)}
        </div>
      ) : null}
    </nav>
  );
}
