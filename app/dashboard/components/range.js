
"use client";


import Select from "@/components/select";
import { defaultRange, ranges } from "@/libs/consts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Range({ defaultValue = defaultRange }) {
    const searchparams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const range = searchparams.get("range") ?? defaultValue


    const handleChange = (e) => {
        const params = new URLSearchParams(searchparams);
        params.set("range", e.target.value);
        router.push(`${pathname}?${params.toString()}`);
    }

    return <Select value={range} onChange={handleChange}>
        {ranges.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
        ))}
    </Select>
}