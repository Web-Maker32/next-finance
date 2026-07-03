import TransactionForm from "../../components/transaction-form";

export const metadata = {
  title: "Add Transaction",
};

export default function Page() {
  return (
    <>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">Add Transaction</h1>
      <TransactionForm />
    </>
  );
}
