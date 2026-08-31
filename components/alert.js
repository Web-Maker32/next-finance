export default function Alert({ title, icon, children }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5">
      <div className="shrink-0">{icon}</div>
      <div className="space-y-1">
        <h5 className="text-sm font-semibold">{title}</h5>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}