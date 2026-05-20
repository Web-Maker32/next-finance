import { createClient } from "@/libs/supabase/server";
import TransactionForm from "@/app/dashboard/components/transaction-form";
import { notFound } from "next/navigation";


export const metadata = {
  title: "Edit Transaction",
};

export default async function page({params}) {
    const { id } = await params
    const supabase = await createClient();
    const { data: transaction, error } = await supabase
        .from('active_transactions')
        .select('*')
        .eq('id', id)
        .single()

        if (error) notFound()

    return (
        <>
          <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
          <TransactionForm initialData={transaction}/>
        </>
      );
}