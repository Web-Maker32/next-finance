import TrendComponent from '@/components/trend'
import { createClient } from '@/libs/supabase/server'

export default async function Trend({type}) {
 const supabase = await createClient()
 let { data, error } = await supabase
  .rpc('calculate_total', {
    type_arg: type
  })
 if (error) throw new Error('Could not fetch trend data')

 const amount = data ?? 0

    return <TrendComponent type={type} amount={amount} prevAmount={amount - 500} />
}
