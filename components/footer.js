import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/dashboard/transactions/add", label: "Add transaction" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/dashboard/settings", label: "Settings" },
      { href: "/login", label: "Sign in" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-8 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md space-y-3">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-slate-900 transition hover:text-sky-600 dark:text-slate-100 dark:hover:text-sky-400"
          >
            Next Finance
          </Link>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
            Keep your money habits clear, calm, and easy to maintain with a dashboard that brings your finances into focus.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 text-sm">
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {group.title}
              </h2>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition hover:text-sky-600 dark:hover:text-sky-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 text-center text-sm text-slate-500 dark:text-slate-500">
        © {new Date().getFullYear()} Next Finance. Built for clearer money habits.
      </div>
    </footer>
  );
}
