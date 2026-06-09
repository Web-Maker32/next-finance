
"use client";

import { Select } from "@/components/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Range() {
    const searchparams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const range = searchparams.get("range") ?? 'last30days'


    const handleChange = (e) => {
        const params = new URLSearchParams(searchparams);
        params.set("range", e.target.value);
        router.push(`${pathname}?${params.toString()}`);
    }

    return <Select value={range} onChange={handleChange}>
        <option value="last24hours">Last 24 hours</option>
        <option value="last7days">Last 7 days</option>
        <option value="last30days">Last 30 days</option>
        <option value="last12months">Last 12 months</option>
    </Select>
}