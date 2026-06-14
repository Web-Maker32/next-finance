import Link from "next/link";
import DarkModeToggle from "./darkmodetoggle";
import getServerTheme from "@/hooks/use-server-dark-mode";
import { createClient } from "@/libs/supabase/server";
import { LogIn } from "lucide-react";
import { sizes, variants } from "@/libs/veriant";
import { SignOutButton } from "@/components/signout";
import Avatar from "@/components/avatar";

export default async function Header({className}) {
  
  const theme = getServerTheme()
  const supabase = await createClient()
  const {data:{user}, error} = await supabase.auth.getUser()
  
  
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link href="/dashboard" className="text-xl hover:underline underline-offset-8 decoration-2">Next Finance</Link>
    
    <div className="flex items-center">
     <DarkModeToggle />
     {user && <Link href='dashboard/settings' className={`flex items-center space-x-1 ${variants['ghost']} ${sizes['sm']}`}>
      <Avatar />
      <span>{user?.email}</span>
     </Link>}  
     {user && <SignOutButton />}
     {!user && <Link href="/login" className={`${variants['ghost']} ${sizes['sm']}`}><LogIn/></Link>}  
    </div>
    
    
    </header>
  )
}