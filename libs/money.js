import { convertAmount } from "@/libs/rates";
import { formatCurrency } from "@/hooks/use-format-currency";

export function money(amount, rate, currency) {
  return formatCurrency(convertAmount(amount, rate), currency);
}