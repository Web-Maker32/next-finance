import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, Camera, Mail, User } from "lucide-react";
import { createClient } from "@/libs/supabase/server";
import Avatar from "@/components/avatar";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (!user) redirect("/login");

  const metadata = user.user_metadata ?? {};
  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          How your account appears in Next Finance.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1120]/80">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="relative shrink-0">
            <Avatar width={96} height={96} />
            <Link
              href="/dashboard/settings/avatar"
              className="absolute -bottom-1 -right-1 rounded-full border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 dark:border-white/15 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-white/10"
              aria-label="Change avatar"
            >
              <Camera className="h-4 w-4" />
            </Link>
          </div>
          <div className="min-w-0 text-center sm:text-left">
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">
              {metadata.name ?? "No name set"}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#0b1120]/80">
        <div className="px-6 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Account
          </h2>
        </div>
        <dl className="divide-y divide-slate-200 dark:divide-white/10">
          <Row icon={User} label="Display name" value={metadata.name ?? "—"} />
          <Row icon={Mail} label="Email address" value={user.email ?? "—"} />
          <Row icon={CalendarDays} label="Member since" value={memberSince} />
        </dl>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <Icon className="h-5 w-5 shrink-0 text-slate-400" />
      <div className="min-w-0 grow">
        <dt className="text-sm text-slate-500 dark:text-slate-400">{label}</dt>
        <dd className="truncate font-medium text-slate-900 dark:text-white">{value}</dd>
      </div>
    </div>
  );
}