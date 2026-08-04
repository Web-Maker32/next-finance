"use client";

import { useEffect, useState } from "react"
import { formatCurrency, getStoredCurrency } from "@/hooks/use-format-currency"

export default function TransactionItemsSummary({date,amount}) {
    const [currency, setCurrency] = useState('EUR')

    useEffect(() => {
        const syncCurrency = () => setCurrency(getStoredCurrency())

        syncCurrency()
        window.addEventListener('currency-updated', syncCurrency)

        return () => window.removeEventListener('currency-updated', syncCurrency)
    }, [])

    const formattedAmount = formatCurrency(amount, currency)
    
    return (
        <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
           <div className="grow">
            {date}
           </div>
           <div className="min-w-[50px] text-right font-semibold">
            {formattedAmount}
           </div>
           <div className="min-w-[100px]">
            
           </div>
        </div>
    )
}