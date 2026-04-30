import Link from "next/link";
import DarkModeToggle from "./darkmodetoggle";
import getServerTheme from "@/hooks/use-server-dark-mode";

export default async function Header({className}) {
  
  const theme = await getServerTheme()
  
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link href="/dashboard" className="text-xl hover:underline underline-offset-8 decoration-2">Next Finance</Link>
    
    <div className="flex items-center space-x-4">
     <DarkModeToggle />
    <div>user dropdown</div>    
    </div>
    
    
    </header>
  )
}