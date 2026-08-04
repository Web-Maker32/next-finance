import { useEffect, useMemo, useState } from "react"

const currencyLocaleMap = {
  PKR: 'en-PK'
}

const getStoredCurrency = () => {
  if (typeof window === 'undefined') return 'EUR'
  return localStorage.getItem('currency') || 'EUR'
}

export const useFormatCurrency = (amount) =>{
    const [currency, setCurrency] = useState(getStoredCurrency)

    useEffect(() => {
      if (typeof window === 'undefined') return

      const syncCurrency = () => setCurrency(getStoredCurrency())
      const handleStorage = (event) => {
        if (event.key === 'currency') {
          syncCurrency()
        }
      }

      syncCurrency()
      window.addEventListener('currency-updated', syncCurrency)
      window.addEventListener('storage', handleStorage)

      return () => {
        window.removeEventListener('currency-updated', syncCurrency)
        window.removeEventListener('storage', handleStorage)
      }
    }, [])

    const locale = typeof window !== 'undefined'
      ? currencyLocaleMap[currency] || navigator.language || 'en-US'
      : 'en-US'

    return useMemo(() => {
      const formatCurrency = (amount) =>
        new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)

      return formatCurrency(amount)
    }, [amount, currency, locale])
}
