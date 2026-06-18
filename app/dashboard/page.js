import { Suspense } from "react";
import TransactionListFallback from "./components/transaction-listfallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { sizes, variants } from "@/libs/veriant";
import { ErrorBoundary } from "react-error-boundary";
import { defaultRange, types } from "@/libs/consts";
import Range from "./components/range";
import TransactionListWarper from "./components/transaction-list-warper";
import { createClient } from "@/libs/supabase/server";

export const dynamic = 'force-dynamic'

export default async function page({ searchParams }) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const userRange = user?.user_metadata?.range ?? defaultRange
  const range = params?.range ?? userRange
  return (
    <div className="space-y-8">
      <section className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Summary</h1>
        <aside>
          <Range defaultValue={userRange} />
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
