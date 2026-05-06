import TransactionItem from "@/components/transaction-item"
import TransactionItemsSummary from "@/components/transation-items-summary"
import Saprator from "@/components/saprator"
import { createClient } from "@/libs/supabase/server"

const groupAndSumTransactionsByDate = (transactions) => {
  const grouped = {}
  for (const transaction of transactions) {
const date = transaction.created_at ? transaction.created_at.split("T")[0] : 'unknown-date';
    if(!grouped[date]) {
      grouped[date] = {transactions: [], amount: 0}
    }
    grouped[date].transactions.push(transaction)
    const amount = transaction.type === 'Expense' ? -transaction.amount : transaction.amount
    grouped[date].amount += amount
  }
  return grouped
}

export default async function TransactionList() {
  const supabase = await createClient()
  const { data: transactions } = await supabase.from('active_transactions').select('*').order('created_at', { ascending: true })
  const grouped = groupAndSumTransactionsByDate(transactions)
  
  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, data]) => (
        <div key={date} className="space-y-2">
     
          <TransactionItemsSummary 
            date={date === 'unknown-date' ? 'No Date' : new Date(date).toLocaleDateString()} 
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
    </div>
  )
}