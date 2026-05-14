import TransactionItem from "@/components/transaction-item"
import TransactionItemsSummary from "@/components/transation-items-summary"
import Saprator from "@/components/saprator"
import { createClient } from "@/libs/supabase/server"
import { groupAndSumTransactionsByDate } from "@/libs/utils"

export default async function TransactionList({ range }) {
  const supabase = await createClient()
  let { data: active_transactions, error } = await supabase
    .rpc('fetch_transactions', {
    //limit_arg, 
    //offset_arg, 
    range_arg: range
  })
if (error) throw new Error("We can't fetch transactions")

  const grouped = groupAndSumTransactionsByDate(active_transactions)
  
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