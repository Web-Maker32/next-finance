import Skeleton from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 flex gap-6">
        <Skeleton className="h-24 w-24 rounded-full shrink-0" />
        <div className="grow space-y-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <Skeleton className="h-12 w-full rounded-none" />
        <Skeleton className="h-16 w-full rounded-none" />
        <Skeleton className="h-16 w-full rounded-none" />
        <Skeleton className="h-16 w-full rounded-none" />
      </div>
    </div>
  );
}
