export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`h-4 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-800 ${className}`}
    />
  );
}