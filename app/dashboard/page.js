"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  CreditCard,
  Plus,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Balance",
      value: "$12,480.50",
      change: "+12.5%",
      positive: true,
      icon: Wallet,
    },
    {
      title: "Income",
      value: "$4,230.00",
      change: "+8.2%",
      positive: true,
      icon: TrendingUp,
    },
    {
      title: "Expenses",
      value: "$2,145.80",
      change: "-3.1%",
      positive: false,
      icon: CreditCard,
    },
  ];

  const transactions = [
    { name: "Salary Deposit", category: "Income", amount: "+$3,200.00", date: "Today" },
    { name: "Grocery Store", category: "Food", amount: "-$86.40", date: "Yesterday" },
    { name: "Netflix", category: "Entertainment", amount: "-$15.99", date: "2 days ago" },
    { name: "Uber Ride", category: "Transport", amount: "-$24.50", date: "3 days ago" },
    { name: "Freelance Payment", category: "Income", amount: "+$850.00", date: "4 days ago" },
  ];

  const categories = [
    { name: "Food & Drink", amount: 420, percent: 35 },
    { name: "Transport", amount: 280, percent: 23 },
    { name: "Entertainment", amount: 190, percent: 16 },
    { name: "Shopping", amount: 310, percent: 26 },
  ];

  return (
    <div className="min-h-screen">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">Welcome back</p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            Home
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1120]/80"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">{stat.title}</p>
                <stat.icon className="h-5 w-5 text-slate-400" />
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                {stat.positive ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-rose-500" />
                )}
                <span className={stat.positive ? "text-emerald-500" : "text-rose-500"}>
                  {stat.change}
                </span>
                <span className="text-slate-400">vs last month</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1120]/80 lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Recent Transactions
              </h2>
              <button className="text-sm text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {transactions.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-white/5"
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t.category} · {t.date}
                    </p>
                  </div>
                  <p
                    className={`font-medium ${
                      t.amount.startsWith("+")
                        ? "text-emerald-500"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {t.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1120]/80">
            <h2 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">
              Spending by Category
            </h2>

            <div className="space-y-5">
              {categories.map((c, i) => (
                <div key={i}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{c.name}</span>
                    <span className="text-slate-500 dark:text-slate-400">${c.amount}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
                    <div
                      className="h-full rounded-full bg-sky-500"
                      style={{ width: `${c.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
              <Plus className="h-4 w-4" />
              Add transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}