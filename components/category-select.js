"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CategorySelect({
  name,
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  required = false,
  placeholder = "Select a category",
}) {
  const containerRef = useRef(null);
  const optionRefs = useRef([]);
  const [open, setOpen] = useState(false);
  const selected = value ?? defaultValue ?? "";
  const selectedLabel = selected || placeholder;

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const selectOption = (option) => {
    onChange?.(option);
    setOpen(false);
  };

  const handleKeyDown = (event) => {
    if (disabled) return;
    const currentIndex = Math.max(0, options.indexOf(selected));

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      const nextIndex = event.key === "ArrowDown"
        ? Math.min(options.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);
      optionRefs.current[nextIndex]?.focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((isOpen) => !isOpen);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {name && (
        <input type="hidden" name={name} value={selected} required={required} readOnly />
      )}
      <button
        type="button"
        className={`flex h-11 w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-3 text-left text-sm tracking-wide text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 ${!selected ? "text-slate-500 dark:text-slate-400" : ""}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => setOpen((isOpen) => !isOpen)}
        onKeyDown={handleKeyDown}
      >
        <span>{selectedLabel}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      {open && (
        <div
          className="absolute left-0 top-[calc(100%+0.35rem)] z-30 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-950"
          role="listbox"
          aria-label={name}
        >
          {options.map((option, index) => (
            <button
              key={option}
              ref={(element) => { optionRefs.current[index] = element; }}
              type="button"
              role="option"
              aria-selected={option === selected}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-sky-50 focus:bg-sky-50 focus:outline-none dark:hover:bg-sky-500/10 dark:focus:bg-sky-500/10 ${option === selected ? "bg-sky-50 font-medium text-sky-700 dark:bg-sky-500/10 dark:text-sky-300" : "text-slate-700 dark:text-slate-200"}`}
              onClick={() => selectOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
