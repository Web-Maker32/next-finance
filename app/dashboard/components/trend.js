import TrendComponent from '@/components/trend'
import { createClient } from '@/libs/supabase/server'

export const dynamic = 'force-dynamic'

export default async function Trend({type, range}) {
 const supabase = await createClient()
 let { data, error } = await supabase
  .rpc('calculate_total', {
    range_arg: range,
    type_arg: type
  })
 if (error) throw new Error('Could not fetch trend data')

 const amounts = data[0]

  return <TrendComponent type={type} amount={amounts.current_amount} prevAmount={amounts.previous_amount} />
}
