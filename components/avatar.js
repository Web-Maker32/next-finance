import { createClient } from "@/libs/supabase/server";
import { CircleUser } from "lucide-react";
import Image from "next/image";

export default async function Avatar({ width = 32, height = 32 }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  const avatarPath = user?.user_metadata?.avatar;

  if (!avatarPath) {
    return (
      <span
        className="inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-400 dark:bg-white/10 dark:text-slate-500"
        style={{ width, height }}
      >
        <CircleUser className="h-2/3 w-2/3" />
      </span>
    );
  }

  const { data: imageData, error } = await supabase.storage
    .from("avatar")
    .createSignedUrl(avatarPath, 60 * 5);

  if (error || !imageData?.signedUrl) {
    return (
      <span
        className="inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-400 dark:bg-white/10 dark:text-slate-500"
        style={{ width, height }}
      >
        <CircleUser className="h-2/3 w-2/3" />
      </span>
    );
  }

  return (
    <span
      className="relative inline-block overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
      style={{ width, height }}
    >
      <Image
        src={imageData.signedUrl}
        alt="User avatar"
        fill
        sizes={`${width}px`}
        className="object-cover"
      />
    </span>
  );
}