"use client";

import { useState } from "react";

export default function HoverCard({ trigger, children, align = "right" }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <div className="cursor-pointer">{trigger}</div>
      {open ? (
        <div
          className={`absolute top-full z-50 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg dark:border-white/10 dark:bg-[#0b1120] ${
            align === "left" ? "left-0" : "right-0"
          }`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}