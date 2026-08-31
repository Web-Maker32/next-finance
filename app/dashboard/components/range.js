"use client";

import DateRangeSelect from "@/components/date-range-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Range({ defaultView }) {
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const range = searchparams.get("range") ?? defaultView ?? "last30days";

  const handleChange = (e) => {
    const params = new URLSearchParams(searchparams);
    params.set("range", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full min-w-[240px] sm:w-72">
      <DateRangeSelect
        value={range}
        onChange={handleChange}
        className="h-11 w-full min-w-[240px] rounded-xl"
      />
    </div>
  );
}