import Skeleton from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-16 w-16 rounded-full" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
    </div>
  );
}
