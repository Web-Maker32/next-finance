export default function Button({ variant = 'default', size = 'base', className = '', children, ...props }) {
    
   const variants = {
    default: "bg-slate-900 text-white rounded-md dark:bg-white dark:text-slate-900",
    outline: "border border-slate-300 rounded-md dark:border-slate-700",
    ghost: 'rounded-md bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-500'
    }
   
   const sizes = {
        xs: "text-xs px-2 py-1",
        sm: "text-sm px-3 py-1.5",
        base: "text-base px-4 py-2",
        lg: "text-lg px-4 py-2",
   }
   
    return (
        <button 
            {...props} 
            className={`${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    )
}