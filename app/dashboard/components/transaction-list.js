"use client";

import TransactionItem from "@/components/transaction-item";
import TransactionItemsSummary from "@/components/transation-items-summary";
import Saprator from "@/components/saprator";
import { groupAndSumTransactionsByDate } from "@/libs/utils";
import { useState } from "react";
import  Button from "@/components/button";
import { fetchTransactions } from "@/libs/action";

export default function TransactionList({ range, initialTransactions }) {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [offset, setOffset] = useState(initialTransactions.length)
  const grouped = groupAndSumTransactionsByDate(transactions)
 
  const handleClick = async (e) => {
    const nextTransaction = await fetchTransactions(range, offset, 10 )
    setOffset(prevValue => prevValue + 10)
    setTransactions(prevTransactions => [...prevTransactions, ...nextTransaction])
  }

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, data]) => (
        <div key={date} className="space-y-2">
          <TransactionItemsSummary
            date={
              date === "unknown-date"
                ? "No Date"
                : new Date(date).toLocaleDateString()
            }
            amount={data.amount}
          />
          <Saprator />
          <div className="space-y-2">
            {data.transactions.map((transaction) => (
              <div key={transaction.id}>
                <TransactionItem
                  type={transaction.type}
                  category={transaction.category}
                  description={transaction.description}
                  amount={transaction.amount}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      {transactions.length === 0 && <div className="text-center 
      text-gray-300 dark:text-gray-500">No transactions found</div>}
      <div className="flex justify-center">
        <Button variant="ghost" onClick={handleClick}>
          Load More
        </Button>
      </div>
    </div>
  );
}
