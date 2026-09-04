import { sizes, variants } from "@/libs/veriant";

export default function Button({ variant = 'default', size = 'base', className = '', children, ...props }) {
  return (
    <button
      {...props}
      className={`${variants[variant]} ${sizes[size]} transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  )
}