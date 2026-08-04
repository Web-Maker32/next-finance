const currencyLocaleMap = {
  PKR: 'en-PK'
}

export const formatCurrency = (amount, currency = 'EUR', locale = 'en-US') => {
  const resolvedCurrency = currency || 'EUR'
  const resolvedLocale = currencyLocaleMap[resolvedCurrency] || locale || 'en-US'

  return new Intl.NumberFormat(resolvedLocale, {
    style: 'currency',
    currency: resolvedCurrency,
  }).format(amount)
}

export const getStoredCurrency = () => {
  if (typeof window === 'undefined') return 'EUR'
  return localStorage.getItem('currency') || 'EUR'
}

export const getCurrencyLocale = (currency = 'EUR') => {
  return currencyLocaleMap[currency] || 'en-US'
}

