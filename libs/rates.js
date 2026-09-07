export async function getRate(from, to) {
  if (!from || !to || from === to) return 1;

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    if (data.result !== "success" || data.rates?.[to] == null) return 1;
    return Number(data.rates[to]);
  } catch {
    return 1;
  }
}

export function convertAmount(amount, rate) {
  return Number(amount || 0) * Number(rate || 1);
}
