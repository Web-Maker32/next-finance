import LoginForm from "./components/login-form";

export const metadata = {
  title: "Sign in | Next Finance",
};

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-24 sm:px-0">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1120]/80 dark:shadow-black/30 sm:p-8">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Next Finance
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Welcome back
          </h1>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Sign in with a magic link or use an existing password. Enter your
            email below and choose your preferred login option.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}