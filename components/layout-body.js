"use client";

import { CookiesProvider } from "react-cookie";
import Footer from "@/components/footer";

export default function LayoutBody({ children }) {
  return (
    <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex flex-1 flex-col">
        <CookiesProvider>{children}</CookiesProvider>
      </div>
      <Footer />
    </body>
  );
}
