"use client";

import TransactionItem from "@/components/transaction-item";
import TransactionItemsSummary from "@/components/transation-items-summary";
import Saprator from "@/components/saprator";
import { groupAndSumTransactionsByDate } from "@/libs/utils";
import { useState } from "react";
import  Button from "@/components/button";
import { fetchTransactions } from "@/libs/action";
import { LoaderCircle } from "lucide-react";

export default function TransactionList({ range, initialTransactions }) {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [buttonHidden, setButtonHidden] = useState(initialTransactions.
  length === 0)
  const [loading, setLoading] = useState(false)
  const grouped = groupAndSumTransactionsByDate(transactions)
 
  const handleClick = async (e) => {
    setLoading(true)
    let nextTransactions = null
    try {
    nextTransactions = await fetchTransactions(range, transactions.length, 10 )
    setButtonHidden(nextTransactions.length === 0)
    setTransactions(prevTransactions => [...prevTransactions, ...nextTransactions])

    } finally {
      setLoading(false)
    }
  }

    const handleRemove = (id) => () => {
       setTransactions(prev => [...prev].filter(t => t.id !== id))
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
                  id={transaction.id}
                  type={transaction.type}
                  category={transaction.category}
                  description={transaction.description}
                  amount={transaction.amount}
                  onRemoved={handleRemove(transaction.id)}
                  />
              </div>
            ))}
          </div>
        </div>
      ))}
      {transactions.length === 0 && <div className="text-center 
      text-gray-400 dark:text-gray-500">No transactions found</div>}
      {!buttonHidden && <div className="flex justify-center">
        <Button variant="ghost" onClick={handleClick} disabled={loading}>
         <div className="flex items-center space-x-1">
          {loading && <LoaderCircle className="animate-spin"/>}
          <div>Load More</div>
         </div>
        </Button>
      </div>}
    </div>
  );
}
