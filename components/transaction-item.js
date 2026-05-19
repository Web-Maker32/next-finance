import { useFormatCurrency } from "@/hooks/use-format-currency"
import { HandCoins, Wallet, Vault, Landmark } from "lucide-react"
import TransactionItemRemoveButton from "./transaction-item-remove-button"

export default function TransactionItem({ onRemoved, id,type,category,amount,description}) {
   
  
  const typesMap = {
    'Income': {
      icon: HandCoins,
      colors: 'text-green-500 dark:text-green-400'
    },
    'Expense': {
      icon: Wallet,
      colors: 'text-red-500 dark:text-red-400'
    },
    'Savings': {
       icon: Vault,
      colors: 'text-yellow-500 dark:text-yellow-400'
    },
    'Investment': {
      icon: Landmark,
      colors: 'text-indigo-500 dark:text-indigo-400'
    }
  }
  const IconComponent = typesMap[type].icon
  const colors = typesMap[type].colors

    const formattedAmount = useFormatCurrency(amount)

    return (<div className="w-full flex items-center">

      <div className="flex items-center mr-4 grow">
        <IconComponent className={`${colors} mr-2 w-5 h-5 hidden sm:block`} />
        {description}
      </div>

      <div className="min-w-[150px] items-center hidden md:flex">
        {category && 
        <div className="bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-gray-700 px-2 py-0.5 rounded">
          {category}
          </div>}
      </div>

      <div className="min-w-[70px] text-right">
        {formattedAmount}
      </div>

      <div className="min-w-[100px] flex justify-end">
        <TransactionItemRemoveButton id={id} onRemoved={onRemoved} />
      </div>
    </div>)
}

