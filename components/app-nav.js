"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  PieChart,
  Repeat,
  FileSpreadsheet,
  Settings,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/transactions/add", label: "Add", icon: ArrowLeftRight },
  { href: "/dashboard/budgets", label: "Budgets", icon: Wallet },
  { href: "/dashboard/insights", label: "Insights", icon: PieChart },
  { href: "/dashboard/recurring", label: "Recurring", icon: Repeat },
  { href: "/dashboard/data", label: "CSV", icon: FileSpreadsheet },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function AppNav() {
  const path = usePathname();

  return (
    <nav className="mt-4 flex gap-1 overflow-x-auto pb-1">
      {links.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/dashboard"
            ? path === "/dashboard"
            : path === href || path.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-sm transition ${
              active
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
