"use client";

import { CookiesProvider } from "react-cookie";


export default function LayoutBody({ children }) {
  return (
    <body className={`min-h-screen flex flex-col px-8`}>
      <CookiesProvider>{children}</CookiesProvider>
    </body>
  );
}
