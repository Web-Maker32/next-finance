'use client';

import { forwardRef, useState } from "react";

const inputClassName = "disabled:opacity-75 px-1.5 py-1 w-full rounded-md shadow-sm border focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
const selectClassName = "w-full rounded-md shadow-sm border border-gray-300 bg-white px-2 py-1.5 pr-8 disabled:opacity-75 tracking-wide appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.20em_1.20em] bg-[right_0.5rem_center] bg-no-repeat dark:border-gray-700 dark:bg-gray-950 dark:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%239ca3af%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]";

export default forwardRef(function Input(props, ref) {
  const { className, type, ...restProps } = props;

  return (
    <input
      ref={ref}
      {...restProps}
      type={type}
      className={`${inputClassName} ${className || ""}`}
      style={{
        backgroundColor: "var(--bg-input)",
        borderColor: "var(--bg-input-border)",
      }}
    />
  );
});

export function Label(props) {
  return (
    <label
      {...props}
      className={`block text-gray-700 dark:text-gray-300 ${props.className || ""}`}
    />
  );
}

export const Select = forwardRef(function Select(props, ref) {
  const { className, ...restProps } = props;

  return (
    <select
      ref={ref}
      {...restProps}
      className={`${selectClassName} ${className || ""}`}
    />
  );
});

export function Checkbox({ checked = false, onChange, className = "", ...props }) {
  const [isChecked, setIsChecked] = useState(checked);

  const updateChecked = (newChecked, event) => {
    setIsChecked(newChecked);
    if (onChange) {
      onChange(event ?? { target: { checked: newChecked } });
    }
  };

  const handleChange = (event) => {
    updateChecked(event.target.checked, event);
  };

  const toggleChecked = () => {
    updateChecked(!isChecked);
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <div
        tabIndex={0}
        className="w-4 h-4 border rounded cursor-pointer transition-colors flex items-center justify-center outline-none disabled:opacity-75"
        style={{
          backgroundColor: isChecked ? "var(--bg-checkbox-checked)" : "var(--bg-checkbox)",
          borderColor: isChecked ? "var(--bg-checkbox-checked)" : "var(--border-checkbox)",
        }}
        onClick={toggleChecked}
        onKeyDown={(event) => {
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            toggleChecked();
          }
        }}
      >
        {isChecked && (
          <svg
            className="w-3 h-3 shrink-0"
            style={{ color: "var(--text-checkbox)" }}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
