import TransactionList from "./transaction-list";
import { fetchTransactions } from "@/libs/action";

export default async function TransactionListWarper({ range }) {
  const transactions = await fetchTransactions(range)
  return <TransactionList initialTransactions={transactions} key={range} range={range} />
}