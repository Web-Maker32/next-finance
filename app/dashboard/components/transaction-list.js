"use client";

import TransactionItem from "@/components/transaction-item";
import TransactionItemsSummary from "@/components/transation-items-summary";
import Saprator from "@/components/saprator";
import { groupAndSumTransactionsByDate } from "@/libs/utils";
import { useState } from "react";
import Button from "@/components/button";
import { fetchTransactions } from "@/libs/action";
import { LoaderCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function TransactionList({ range, initialTransactions }) {
  const reduce = useReducedMotion();
  const [transactions, setTransactions] = useState(initialTransactions);
  const [buttonHidden, setButtonHidden] = useState(initialTransactions.length === 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const grouped = groupAndSumTransactionsByDate(transactions);

  const handleClick = async () => {
    setLoading(true);
    setError("");
    try {
      const next = await fetchTransactions(range, transactions.length, 10);
      setButtonHidden(next.length === 0);
      setTransactions((prev) => [...prev, ...next]);
    } catch {
      setError("Could not load more transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id) => () => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8">
      <AnimatePresence initial={false}>
        {Object.entries(grouped).map(([date, data]) => (
          <motion.div
            key={date}
            layout
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            <TransactionItemsSummary
              date={
                date === "unknown-date"
                  ? "No Date"
                  : new Date(date).toLocaleDateString()
              }
              amount={data.amount}
            />
            <Saprator />
            <div className="space-y-1">
              <AnimatePresence initial={false}>
                {data.transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    layout
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <TransactionItem
                      id={transaction.id}
                      type={transaction.type}
                      category={transaction.category}
                      description={transaction.description}
                      amount={transaction.amount}
                      onRemoved={handleRemove(transaction.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {transactions.length === 0 && (
        <div className="py-8 text-center text-slate-400 dark:text-slate-500">
          No transactions found
        </div>
      )}

      {!buttonHidden && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={handleClick} disabled={loading}>
            <div className="flex items-center space-x-1">
              {loading && <LoaderCircle className="animate-spin" />}
              <div>Load More</div>
            </div>
          </Button>
        </div>
      )}
      {error && <p className="text-center text-sm text-rose-500" role="alert">{error}</p>}
    </div>
  );
}