import { Suspense } from "react";
import TransactionListFallback from "./components/transaction-listfallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { sizes, variants } from "@/libs/veriant";
import { ErrorBoundary } from "react-error-boundary";
import { types } from "@/libs/consts";
import Range from "./components/range";
import TransactionListWarper from "./components/transaction-list-warper";

export const dynamic = 'force-dynamic'

export default async function page({ searchParams }) {
  const params = await searchParams
  const range = params?.range ?? 'last30days'
  return (
    <div className="space-y-8">
      <section className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Summary</h1>
        <aside>
          <Range />
        </aside>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {types.map((type) => (
          <ErrorBoundary
            key={type}
            fallback={
              <div className="text-red-500">cannot fetch {type} trend data</div>
            }
          >
            <Suspense fallback={<TrendFallback />}>
              <Trend type={type} range={range} />
            </Suspense>
          </ErrorBoundary>
        ))}
      </section>

      <section className="flex justify-between items-center">
        <h1 className="text-2xl">Transactions</h1>
        <Link
          href="./dashboard/transactions/add"
          className={`flex items-center space-x-1 ${variants["outline"]} ${sizes["sm"]}`}
        >
          <PlusCircle className="w-4 h-4" />
          <div>Add</div>
        </Link>
      </section>

      <Suspense fallback={<TransactionListFallback />}>
        <TransactionListWarper range={range} />
      </Suspense>
    </div>
  );
}
