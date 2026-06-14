import { forwardRef } from "react"

export default forwardRef(function Input(props, ref) {
  const styles = {
    'file': 'file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:opacity-50 file:dark:text-gray-400',
  'default': 'mt-2 w-full rounded-md px-3 py-2 shadow-sm border border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 disabled:opacity-75'
  }
  return <input ref={ref} {...props} className={`${styles[props.type] ?? styles['default']} ${props.className}`} />
})