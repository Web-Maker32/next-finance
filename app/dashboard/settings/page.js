import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import SettingsForm from "./components/form-settings";

export const metadata = { title: "Settings" };

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (!user) redirect("/login");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Name, currency, and default dashboard range.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0b1120]/80 sm:p-6">
        <SettingsForm defaults={user.user_metadata ?? {}} />
      </div>
    </div>
  );
}