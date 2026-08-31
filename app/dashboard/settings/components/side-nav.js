"use client";

import { Camera, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/settings/avatar", label: "Avatar", icon: Camera },
  { href: "/dashboard/settings/profile", label: "Profile", icon: User },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="rounded-2xl border border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-[#0b1120]/80">
      <ul className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-slate-100 font-medium text-slate-900 dark:bg-white/10 dark:text-white"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}