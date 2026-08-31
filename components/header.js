import Link from "next/link";
import DarkModeToggle from "./darkmodetoggle";
import getServerTheme from "@/hooks/use-server-dark-mode";
import { createClient } from "@/libs/supabase/server";
import { LogIn } from "lucide-react";
import { sizes, variants } from "@/libs/veriant";
import { SignOutButton } from "@/components/signout";
import Avatar from "@/components/avatar";

export default async function Header({ className = "" }) {
  const theme = getServerTheme();
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  const displayName = user?.user_metadata?.name ?? user?.email ?? "Account";

  return (
    <header className={`flex items-center justify-between gap-4 ${className}`}>
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
            <Link
              href="/dashboard/settings"
              className={`${variants["ghost"]} ${sizes["sm"]} flex max-w-[180px] items-center gap-2 truncate sm:max-w-none`}
            >
              <Avatar />
              <span className="hidden truncate text-sm sm:inline">
                {displayName}
              </span>
            </Link>
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
    </header>
  );
}