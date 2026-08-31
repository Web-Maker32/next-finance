import { CircleCheck } from "lucide-react";
import Alert from "@/components/alert";

export default function AlertSuccess({ children }) {
  return (
    <Alert
      icon={<CircleCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
      title={<span className="text-emerald-700 dark:text-emerald-400">Success</span>}
    >
      <span className="text-emerald-700 dark:text-emerald-400">{children}</span>
    </Alert>
  );
}