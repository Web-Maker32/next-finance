export function FormError({ error }) {
  if (!error) return null;
  return <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">{error}</p>;
}