'use client';

import { useState } from 'react';

export default function Checkbox({ checked = false, onChange, className = '', ...props }) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    if (onChange) {
      onChange(e);
    }
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
        className="w-4 h-4 border rounded cursor-pointer transition-colors flex items-center justify-center outline-none"
        style={{
          backgroundColor: isChecked ? 'var(--bg-checkbox-checked)' : 'var(--bg-checkbox)',
          borderColor: isChecked ? 'var(--bg-checkbox-checked)' : 'var(--border-checkbox)'
        }}
        onClick={() => {
          const newChecked = !isChecked;
          setIsChecked(newChecked);
          if (onChange) {
            onChange({ target: { checked: newChecked } });
          }
        }}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            const newChecked = !isChecked;
            setIsChecked(newChecked);
            if (onChange) {
              onChange({ target: { checked: newChecked } });
            }
          }
        }}
      >
        {isChecked && (
          <svg
            className="w-3 h-3 shrink-0"
            style={{ color: 'var(--text-checkbox)' }}
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