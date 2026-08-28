"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { login } from "@/libs/action";
import { useActionState } from "react";

const initialState = {
  message: "",
  error: false,
};

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useActionState(login, initialState);

  useEffect(() => {
    if (state?.success && state?.target) {
      router.push(state.target);
    }
  }, [state, router]);

  return (
    <motion.form
      action={formAction}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          name="email"
          required
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Password <span className="text-slate-400">(optional)</span>
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            name="password"
            className="pr-12"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="grid gap-3 pt-1 sm:grid-cols-2">
        <SubmitButton type="submit" name="flow" value="otp" size="sm" className="w-full">
          Send magic link
        </SubmitButton>
        <SubmitButton type="submit" name="flow" value="password" size="sm" className="w-full">
          Sign in with password
        </SubmitButton>
      </div>

      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        Use the magic link for passwordless sign-in, or add your password to
        sign in directly.
      </p>

      {state?.message ? (
        <p
          className={`rounded-xl px-3 py-2 text-center text-sm ${
            state.error
              ? "bg-red-500/10 text-red-500 dark:text-red-400"
              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </motion.form>
  );
}