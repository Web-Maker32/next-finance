import { CircleX } from "lucide-react";
import Alert from "@/components/alert";

export default function AlertError({ children }) {
    return <Alert icon={<div><CircleX className="text-red-700
         dark:text-red-400 w-6 h-6"/></div>} title={<span className="text-red-700
         dark:text-red-400">Error</span>}><span className="text-red-700
         dark:text-red-400">{children}</span></Alert>
}