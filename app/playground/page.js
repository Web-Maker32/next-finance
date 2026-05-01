import Header from "@/components/header";
import Trend from "@/components/trend";
import Label from "@/components/label";
import TransactionItem from "@/components/transaction-item";
import TransactionItemsSummary from "@/components/transation-items-summary";
import Button from "@/components/button";
import Input from "@/components/input";
import Checkbox from "@/components/checkbox";
import Select from "@/components/select";
import Saprator from "@/components/saprator";
import Skeleton from "@/components/skeleton";

export const metadata = {
  title: "Playground",
};

export default function Page() {
   
  return (
    <main className="space-y-8 mb-44">
      <h1 className="text-4xl mt-8">Playground</h1>

      <div>
        <h2 className="mb-4 text-lg font-mono">Header</h2>
        <Saprator/>
        <div><Header /></div>
      </div>

       <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <Saprator/>
        <div className="flex space-x-8">
         <Trend type="Income" amount={1000} prevAmount={700} /> 
          <Trend type="Expense" amount={200} prevAmount={130} />
          <Trend type="Investment" amount={300} prevAmount={200} />
          <Trend type="Savings" amount={500} prevAmount={400} />     
        </div>
      </div>

        <div>
        <h2 className="mb-4 text-lg font-mono">TransactionItem</h2>
        <Saprator/>
        <div className="space-y-4">
         <TransactionItem type="Income" description="Salary" amount={900}/> 
         <TransactionItem type="Expense" description="Rent" amount={100}/> 
         <TransactionItem type="Investment" category="stocks" description="Apple shares" amount={300}/> 
         <TransactionItem type="Savings" description="savings" amount={500}/> 
       </div>
       </div>

       <div>        
        <h2 className="mb-4 text-lg font-mono">TransactionItemsSummary </h2>
        <Saprator/>
        <div className="space-y-4">
            <TransactionItemsSummary date="2025-10-04" amount={1500}/>
            <TransactionItem type="Income" description="Salary" amount={1500}/> 
            <TransactionItem type="Expense" description="Rent" amount={500}/> 
            <TransactionItem type="Investment" category="stocks" description="Apple shares" amount={300}/> 
            <TransactionItem type="Savings" description="savings" amount={700}/> 
        </div>
       </div>
       
       <div>       
        <h2 className="mb-4 text-lg font-mono">Button</h2>
        <Saprator/>
        <div className="space-x-4"> 
        <Button>hello</Button>
         <Button variant="outline">hello</Button>
          <Button variant="ghost">hello</Button>

          <Button size="sm">hello</Button>
          <Button size="base">hello</Button>
          <Button size="lg">hello</Button>
       </div>
       </div>

       <div>
               <h2 className="mb-4 text-lg font-mono">Forms</h2>
        <Saprator/>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Your name</Label>
          <Input type="text" placeholder='Type something in here'/>
          </div>

          <div>
            <Label>City</Label>
          <Select>
            <option>Islamabad</option>
            <option>Lahore</option>
            <option>Karachi</option>
          </Select>
          </div>

           <div className="flex items-center">

          <Checkbox id="terms"/>
          <Label className="ml-2" htmlFor="terms">Accept terms</Label>


          </div>
        </div>
       </div>

       <div>
               <h2 className="mb-4 text-lg font-mono">loading Skeleton</h2>
        <Saprator/>
        <div className="space-y-8">
          <div className="flex space-x-4" >
            <Skeleton/>
            <Skeleton/>
             <Skeleton/>
             </div>

              <div className="space-y-4" >
            <Skeleton/>
            <Skeleton/>
             <Skeleton/>
             </div>
        </div>
       </div>

    </main>
  )
}