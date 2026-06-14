
import { CircleCheck } from "lucide-react";
import Alert from "@/components/alert";

export default function AlertSuccess({ children }) {
  return <Alert icon={<div><CircleCheck className="text-green-700
           dark:text-green-400 w-6 h-6"/></div>} title={<span className="text-green-700
           dark:text-green-400">Success</span>}><span className="text-green-700
           dark:text-green-400">{children}</span></Alert>
}
