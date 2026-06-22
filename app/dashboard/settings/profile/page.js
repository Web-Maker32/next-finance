import Link from "next/link";
import { createClient } from "@/libs/supabase/server";
import Avatar from "@/components/avatar";
import ProfileForm from "../components/form-profile";
import { variants, sizes } from "@/libs/veriant";

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

      <section className="mb-8 flex items-center gap-4">
        <Avatar width={64} height={64} />
        <div>
          <p className="font-medium">{metadata.name ?? "No name set"}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
          <Link
            href="/dashboard/settings/avatar"
            className={`mt-2 inline-flex ${variants.outline} ${sizes.sm}`}
          >
            Change avatar
          </Link>
        </div>
      </section>

      <section className="mb-8 space-y-2 text-sm">
        <div className="flex justify-between max-w-md">
          <span className="text-gray-500 dark:text-gray-400">Email</span>
          <span>{user?.email ?? "—"}</span>
        </div>
        <div className="flex justify-between max-w-md">
          <span className="text-gray-500 dark:text-gray-400">Member since</span>
          <span>{memberSince}</span>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Edit profile</h2>
        <ProfileForm defaults={metadata} />
      </section>
    </>
  );
}
