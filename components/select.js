import { forwardRef } from "react";

export default forwardRef(function Select(props,ref) {
    return <select ref={ref} {...props} className="w-full rounded-md shadow-sm px-1.5 py-1 border"
    style={{
      backgroundColor: 'var(--bg-input)',
      borderColor: 'var(--bg-input-border)'
    }}></select>
})
