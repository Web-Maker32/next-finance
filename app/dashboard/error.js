"use client";

import StatusBanner from "@/components/status-banner";

export default function DashboardError({ error, reset }) {
  return (
    <div className="py-8">
      <StatusBanner error={error?.message || "Something went wrong"} onRetry={reset} />
    </div>
  );
}
