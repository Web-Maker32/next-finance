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
  const primaryLinks = links.slice(0, 5);
  const secondaryActive = links.slice(1).some(({ href }) =>
    path === href || path.startsWith(`${href}/`)
  );

  const renderLink = ({ href, label, icon: Icon }, className = "") => {
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
        className={`${className} inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#05070f] ${active
            ? "bg-slate-900 text-white shadow-xs dark:bg-white dark:text-slate-900"
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
        {links.map((link) => renderLink(link))}
      </div>

      <div className="flex max-w-full items-center gap-1 md:hidden">
        <div className="flex min-w-0 flex-1 gap-1">
          {primaryLinks.map((link, index) => {
            const visibility = [
              "",
              "max-[360px]:hidden",
              "max-[430px]:hidden",
              "max-[500px]:hidden",
              "max-[640px]:hidden",
            ][index];
            return renderLink(link, visibility);
          })}
        </div>

        <button
          type="button"
          aria-expanded={moreOpen}
          aria-controls="mobile-more-menu"
          onClick={() => setMoreOpen((open) => !open)}
          className={`relative z-10 inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${secondaryActive
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              : "bg-slate-50 text-slate-600 hover:bg-slate-200/70 dark:bg-[#05070f] dark:text-slate-300 dark:hover:bg-white/10"
            }`}
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
          <div className="hidden flex-col gap-1 max-[359px]:flex">
            {links.slice(1).map((link) => renderLink(link))}
          </div>
          <div className="hidden flex-col gap-1 min-[360px]:max-[429px]:flex">
            {links.slice(2).map((link) => renderLink(link))}
          </div>
          <div className="hidden flex-col gap-1 min-[430px]:max-[499px]:flex">
            {links.slice(3).map((link) => renderLink(link))}
          </div>
          <div className="hidden flex-col gap-1 min-[500px]:max-[639px]:flex">
            {links.slice(4).map((link) => renderLink(link))}
          </div>
          <div className="hidden flex-col gap-1 min-[640px]:max-md:flex">
            {links.slice(5).map((link) => renderLink(link))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
