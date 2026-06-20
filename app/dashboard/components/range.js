
"use client";


import DateRangeSelect from "@/components/date-range-select";
import Select from "@/components/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Range({ defaultView }) {
    const searchparams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const range = searchparams.get("range") ?? defaultView ?? 'last30days'


    const handleChange = (e) => {
        const params = new URLSearchParams(searchparams);
        params.set("range", e.target.value);
        router.push(`${pathname}?${params.toString()}`);
    }

    return <DateRangeSelect value={range} onChange={handleChange} />
}