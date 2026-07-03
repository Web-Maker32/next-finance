"use client"

import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { login } from "@/libs/action";
import { useActionState } from 'react'

const initialState = {
  message: "",
  error: false
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState)
  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
        <Input type='email' placeholder='name@example.com' name='email' required />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password (optional)</label>
        <Input type='password' placeholder='Your password' name='password' />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <SubmitButton type='submit' name='flow' value='otp' size="sm" className="w-full">
          Send magic link
        </SubmitButton>
        <SubmitButton type='submit' name='flow' value='password' size="sm" className="w-full">
          Sign in with password
        </SubmitButton>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Use the magic link for passwordless sign-in, or add your password to sign in directly.
      </p>
      <p className={`${state?.error ? 'text-red-500' : 'text-green-500'} text-sm text-center`}>
        {state?.message}
      </p>
    </form>
  )
}
