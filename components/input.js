import { forwardRef } from "react";

export default forwardRef(function Input({ className = "", type, ...props }, ref) {
  const base =
    type === "file"
      ? "file:border-0 file:bg-transparent file:text-sm file:font-medium file:dark:text-slate-400 disabled:opacity-50"
      : "h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100";

  return <input ref={ref} type={type} className={`${base} ${className}`} {...props} />;
});