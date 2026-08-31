import Skeleton from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
      <Skeleton className="h-11 w-40" />
    </div>
  );
}