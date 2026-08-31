import Skeleton from "@/components/skeleton";

export default function TrendFallback() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-4 w-28" />
    </div>
  );
}