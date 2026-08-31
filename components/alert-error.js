import { CircleX } from "lucide-react";
import Alert from "@/components/alert";

export default function AlertError({ children }) {
  return (
    <Alert
      icon={<CircleX className="h-5 w-5 text-rose-600 dark:text-rose-400" />}
      title={<span className="text-rose-700 dark:text-rose-400">Error</span>}
    >
      <span className="text-rose-700 dark:text-rose-400">{children}</span>
    </Alert>
  );
}