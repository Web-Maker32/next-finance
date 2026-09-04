"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Check,
  ShieldCheck,
  Wallet,
  Target,
} from "lucide-react";

export default function HomeContent({ dashboardData }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 14 },
    },
  };

  const features = [
    {
      icon: BarChart3,
      title: "Quick insights",
      desc: "See transactions, categories, and balance activity at a glance.",
      color: "text-sky-600 bg-sky-100 dark:text-sky-400 dark:bg-sky-500/10",
    },
    {
      icon: ShieldCheck,
      title: "Secure access",
      desc: "Sign in securely and keep your data private with built-in auth.",
      color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10",
    },
    {
      icon: Wallet,
      title: "Smart budgets",
      desc: "Set limits by category and get gentle alerts before you overspend.",
      color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-500/10",
    },
    {
      icon: Target,
      title: "Goal tracking",
      desc: "Visualize progress toward savings goals and stay motivated.",
      color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10",
    },
  ];

  const preview = dashboardData || {
    balance: 4280,
    income: 6840,
    spending: 2560,
    transactions: [
      { description: "Salary", created_at: "Today", amount: 3200, type: "Income" },
      { description: "Grocery market", created_at: "Yesterday", amount: 86.4, type: "Expense" },
      { description: "Internet bill", created_at: "Mar 24", amount: 54.99, type: "Expense" },
    ],
    foodBudget: { spent: 340, limit: 500 },
  };
  const currency = (value) => `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  const budgetPercent = preview.foodBudget
    ? Math.min(100, Math.round((preview.foodBudget.spent / preview.foodBudget.limit) * 100))
    : 0;

  return (
    <>
      <div className="relative mt-14 grid items-center gap-12 lg:mt-16 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-7">
          <motion.p
            variants={item}
            className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400 sm:text-base"
          >
            Finance made simple
          </motion.p>

          <motion.h1
            variants={item}
            className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
          >
            Track your money with confidence
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg"
          >
            Next Finance helps you manage transactions, track spending, and reach
            your financial goals with one polished dashboard.
          </motion.p>

          <motion.div variants={item} className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Link
              href="/login"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-base font-medium text-slate-700 transition-all hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              See features
            </Link>
          </motion.div>

          <motion.ul variants={item} className="grid gap-2 pt-2 text-sm text-slate-500 dark:text-slate-400 sm:grid-cols-2">
            {["Private by default", "No bank connection required", "Built for daily clarity", "Export your data anytime"].map((text) => (
              <li key={text} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                {text}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white shadow-2xl shadow-slate-300/40 dark:border-white/10 dark:shadow-black/40 sm:p-5"
          aria-label="Preview of the Next Finance dashboard"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-xs text-slate-400">Monthly balance</p>
              <p className="mt-1 text-2xl font-semibold">{currency(preview.balance)}</p>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">+12.8%</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <PreviewStat label="Income" value={currency(preview.income)} tone="text-sky-300" />
            <PreviewStat label="Spending" value={currency(preview.spending)} tone="text-rose-300" />
          </div>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Recent transactions</span>
              <span>Last 30 days</span>
            </div>
            <div className="mt-3 divide-y divide-white/10">
              {preview.transactions.map((transaction) => {
                const income = transaction.type === "Income";
                const date = transaction.created_at && transaction.created_at.length > 10
                  ? new Date(transaction.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  : transaction.created_at;
                return (
                <div key={`${transaction.description}-${transaction.created_at}`} className="flex items-center gap-3 py-3 first:pt-1 last:pb-1">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${income ? "bg-emerald-400/10 text-emerald-300" : "bg-rose-400/10 text-rose-300"}`}>
                    {income ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{transaction.description || "Transaction"}</p>
                    <p className="text-xs text-slate-500">{date}</p>
                  </div>
                  <span className={`text-sm font-medium tabular-nums ${income ? "text-emerald-300" : "text-slate-200"}`}>{income ? "+" : "-"}{currency(transaction.amount)}</span>
                </div>
                );
              })}
              {preview.transactions.length === 0 && <p className="py-3 text-sm text-slate-500">No transactions this month</p>}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/[0.04] p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
              <Wallet className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Food budget</p>
              <div className="mt-1 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-amber-300" style={{ width: `${budgetPercent}%` }} /></div>
            </div>
            <span className="text-xs text-slate-400">{preview.foodBudget ? `${budgetPercent}%` : "No limit"}</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        id="features"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="relative mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={card}
            whileHover={{ y: -5 }}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-slate-300 hover:bg-white sm:p-6 dark:border-white/10 dark:bg-[#0a0f1c] dark:hover:border-white/20 dark:hover:bg-[#0d1424]"
          >
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${f.color}`}
            >
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

function PreviewStat({ label, value, tone }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`mt-1 text-lg font-semibold ${tone}`}>{value}</p>
    </div>
  );
}