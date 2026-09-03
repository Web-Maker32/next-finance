import Link from "next/link";
import DarkModeToggle from "./darkmodetoggle";
import getServerTheme from "@/hooks/use-server-dark-mode";
import { createClient } from "@/libs/supabase/server";
import { LogIn } from "lucide-react";
import { sizes, variants } from "@/libs/veriant";
import { SignOutButton } from "@/components/signout";
import Avatar from "@/components/avatar";
import HoverCard from "@/components/hover-card";
import AppNav from "@/components/app-nav";

export default async function Header({ className = "", showNav = false }) {
  const theme = getServerTheme();
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  const displayName = user?.user_metadata?.name ?? user?.email ?? "Account";

  return (
    <header className={className}>
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/dashboard"
          className="text-lg font-semibold tracking-tight text-slate-900 transition hover:text-sky-600 dark:text-white dark:hover:text-sky-400 sm:text-xl"
        >
          Next Finance
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <DarkModeToggle defaultMode={theme} />

          {user ? (
            <>
              <HoverCard
                trigger={
                  <Link
                    href="/dashboard/settings"
                    className={`${variants["ghost"]} ${sizes["sm"]} flex max-w-[180px] items-center gap-2 truncate sm:max-w-none`}
                  >
                    <Avatar />
                    <span className="hidden truncate text-sm sm:inline">
                      {displayName}
                    </span>
                  </Link>
                }
              >
                <div className="flex items-center gap-3">
                  <Avatar size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  Open settings to change name, currency, or avatar.
                </p>
              </HoverCard>
              <SignOutButton />
            </>
          ) : (
            <Link
              href="/login"
              className={`${variants["ghost"]} ${sizes["sm"]} flex items-center gap-2`}
              aria-label="Sign in"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Sign in</span>
            </Link>
          )}
        </div>
      </div>
      {showNav && user ? <AppNav /> : null}
    </header>
  );
}
