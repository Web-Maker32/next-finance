import Skeleton from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-40" />
      <div className="flex gap-6 rounded-2xl border border-slate-200 p-6 dark:border-white/10">
        <Skeleton className="h-24 w-24 shrink-0 rounded-full" />
        <div className="grow space-y-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
        <Skeleton className="h-12 rounded-none" />
        <Skeleton className="h-16 rounded-none" />
        <Skeleton className="h-16 rounded-none" />
        <Skeleton className="h-16 rounded-none" />
      </div>
    </div>
  );
}