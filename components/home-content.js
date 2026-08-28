"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Wallet,
  Target,
} from "lucide-react";

export default function HomeContent() {
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

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mt-12 space-y-6"
      >
        <motion.p
          variants={item}
          className="text-lg font-medium text-sky-600 dark:text-sky-400"
        >
          Finance made simple
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl"
        >
          Track your money with confidence
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400"
        >
          Next Finance helps you manage transactions, track spending, and reach
          your financial goals with one polished dashboard.
        </motion.p>

        <motion.div variants={item} className="flex flex-col gap-3 pt-2 sm:flex-row">
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
      </motion.div>

      <motion.div
        id="features"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="relative mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={card}
            whileHover={{ y: -5 }}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-[#0a0f1c] dark:hover:border-white/20 dark:hover:bg-[#0d1424]"
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