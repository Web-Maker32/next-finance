import getServerTheme from "@/hooks/use-server-dark-mode";
import "./globals.css";

export const metadata = {
  title: {
    default: "Next Finance",
    template: "%s | Next Finance",
  },
  description:
    "Track your money with confidence. Manage transactions, spending, and financial goals in one dashboard.",
};

export default async function RootLayout({ children }) {
  const theme = await getServerTheme("dark");

  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-[#05070f] dark:text-white">
        {children}
      </body>
    </html>
  );
}