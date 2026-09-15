"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export default function CurrencySelect({
  name,
  options,
  value,
  onChange,
  id,
  customValue = "CUSTOM",
}) {
  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.trim().toLowerCase())
  );

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const selectOption = (option) => {
    onChange(option);
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
    if (event.key === "Enter" && filteredOptions.length === 1) {
      event.preventDefault();
      selectOption(filteredOptions[0]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} readOnly />
      <button
        id={id}
        type="button"
        className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-3 text-left text-sm tracking-wide text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((isOpen) => !isOpen)}
        onKeyDown={handleKeyDown}
      >
        <span>{value === customValue ? "Add your currency" : value}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+0.35rem)] z-30 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-950">
          <div className="border-b border-slate-200 p-2 dark:border-slate-700">
            <div className="relative">
              <Search
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                ref={searchRef}
                type="search"
                value={query}
                placeholder="Search currency code"
                aria-label="Search currency code"
                onChange={(event) => setQuery(event.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
          <div className="max-h-56 overflow-y-auto p-1" role="listbox" aria-label="Currencies">
            {filteredOptions.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={option === value}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-sky-50 focus:bg-sky-50 focus:outline-none dark:text-slate-200 dark:hover:bg-sky-500/10 dark:focus:bg-sky-500/10"
                onClick={() => selectOption(option)}
              >
                {option === customValue ? "Add your currency" : option}
                {option === value && <Check size={16} className="text-sky-500" aria-hidden="true" />}
              </button>
            ))}
            {filteredOptions.length === 0 && (
              <p className="px-3 py-3 text-sm text-slate-500 dark:text-slate-400">No currencies found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
