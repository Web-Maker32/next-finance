export default function Label({ className = "", children, ...props }) {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-slate-700 dark:text-slate-300 ${className}`}
    >
      {children}
    </label>
  );
}