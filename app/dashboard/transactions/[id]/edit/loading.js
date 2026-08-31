import Skeleton from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 pb-10">
      <Skeleton className="h-5 w-20" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0b1120]/80 sm:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12 md:col-span-2" />
        </div>
      </div>
    </div>
  );
}