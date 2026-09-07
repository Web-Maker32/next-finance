export const formatCurrency = (amount, currency = "PKR") => {
  const code = currency || "PKR";
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: code,
    }).format(Number(amount || 0));
  } catch {
    return `${Number(amount || 0).toLocaleString("en")} ${code}`;
  }
};

export const getStoredCurrency = () => {
  if (typeof window === "undefined") return "PKR";
  return localStorage.getItem("currency") || "PKR";
};

export const getCurrencyLocale = () => "en";