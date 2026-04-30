import { Suspense } from "react";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transaction-listfallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";

export default function page() {
  return (
    <>
   
   <section className="mb-8">
    <h1 className="text-4xl font-semibold">Summary</h1>
   </section>

    <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
    <Suspense fallback={<TrendFallback />}>
     <Trend type="Income" />
    </Suspense>

    <Suspense fallback={<TrendFallback />}> 
      <Trend type="Expense" />
    </Suspense>

    <Suspense fallback={<TrendFallback />}> 
      <Trend type="Savings" />
    </Suspense>
    
    <Suspense fallback={<TrendFallback />}> 
      <Trend type="Investment" />
    </Suspense>
    </section>

<section className="flex justify-between items-center mb-8">
    <h1 class>Transactions</h1>
</section>


    <Suspense fallback={<TransactionListFallback />}>
      <TransactionList />
    </Suspense>
    </>
  );
}