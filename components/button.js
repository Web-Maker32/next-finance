import { sizes, variants } from "@/libs/veriant";

export default function Button({ variant = 'default', size = 'base', className = '', children, ...props }) {
  return (
    <button
      {...props}
      className={`${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}