"use client";

import { useState } from "react";

export default function Checkbox({ checked = false, onChange, className = "", ...props }) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggle = (next) => {
    setIsChecked(next);
    onChange?.({ target: { checked: next } });
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      onClick={() => toggle(!isChecked)}
      className={`inline-flex h-5 w-5 items-center justify-center rounded-md border transition ${
        isChecked
          ? "border-sky-600 bg-sky-600 text-white"
          : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-950"
      } ${className}`}
      {...props}
    >
      {isChecked ? (
        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : null}
    </button>
  );
}