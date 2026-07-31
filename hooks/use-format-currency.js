import { useMemo } from "react"

const currencyLocaleMap = {
  PKR: 'en-PK'
}

export const useFormatCurrency = (amount) =>{
    const currency = typeof window !== 'undefined' ? (localStorage.getItem('currency') || 'EUR') : 'EUR'
    const locale = typeof window !== 'undefined'
      ? currencyLocaleMap[currency] || navigator.language || 'en-US'
      : 'en-US'
    const formatCurrency = (amount) =>
      new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)

    return useMemo(() => formatCurrency(amount), [amount, currency, locale])
}
