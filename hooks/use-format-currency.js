import { useMemo } from "react"

export const useFormatCurrency = (amount) =>{
    const currency = typeof window !== 'undefined' ? (localStorage.getItem('currency') || 'EUR') : 'EUR'
    const locale = typeof window !== 'undefined' ? (navigator.language || 'en-US') : 'en-US'
    const formatCurrency = (amount) =>
    new Intl.NumberFormat(locale, {style: 'currency', currency}).format(amount)

    return useMemo(() => formatCurrency(amount), [amount, currency, locale])} 
