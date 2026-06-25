import Link from "next/link";
import { createClient } from "@/libs/supabase/server";
import Avatar from "@/components/avatar";
import { Mail, CalendarDays, Camera, User } from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const metadata = user?.user_metadata ?? {};
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Profile</h1>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative shrink-0">
            <Avatar width={96} height={96} />
            <Link
              href="/dashboard/settings/avatar"
              className="absolute -bottom-1 -right-1 rounded-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Change avatar"
            >
              <Camera className="w-4 h-4" />
            </Link>
          </div>

          <div className="grow min-w-0 text-center sm:text-left">
            <p className="text-2xl font-semibold">{metadata.name ?? "No name set"}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Account
          </h2>
        </div>
        <dl className="divide-y divide-gray-200 dark:divide-gray-800">
          <div className="flex items-center gap-4 px-6 py-4">
            <User className="w-5 h-5 shrink-0 text-gray-400" />
            <div className="grow min-w-0">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Display name</dt>
              <dd className="font-medium">{metadata.name ?? "—"}</dd>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-4">
            <Mail className="w-5 h-5 shrink-0 text-gray-400" />
            <div className="grow min-w-0">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Email address</dt>
              <dd className="font-medium truncate">{user?.email ?? "—"}</dd>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-4">
            <CalendarDays className="w-5 h-5 shrink-0 text-gray-400" />
            <div className="grow min-w-0">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Member since</dt>
              <dd className="font-medium">{memberSince}</dd>
            </div>
          </div>
        </dl>
      </div>
    </>
  );
}
