import Link from "next/link";
import DarkModeToggle from "./darkmodetoggle";
import getServerTheme from "@/hooks/use-server-dark-mode";
import { createClient } from "@/libs/supabase/server";
import Button from "./button";
import { CircleUser } from "lucide-react";
import { KeyRound } from "lucide-react";
import { sizes, variants } from "@/libs/veriant";

export default async function Header({className}) {
  
  const theme = getServerTheme()
  const supabase = await createClient()
  const {data:{user}, error} = await supabase.auth.getUser()

  
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link href="/dashboard" className="text-xl hover:underline underline-offset-8 decoration-2">Next Finance</Link>
    
    <div className="flex items-center">
     <DarkModeToggle />
     {user && <Button variant="ghost" size="sm" className="flex items-center space-x-1">
      <CircleUser className="w-6 h-6 "/>
      <span>{user?.email}</span>
     </Button>}  
     {!user && <Link href="/login" className={`${variants['ghost']} ${sizes['sm']}`}><KeyRound/></Link>}  
    </div>
    
    
    </header>
  )
}