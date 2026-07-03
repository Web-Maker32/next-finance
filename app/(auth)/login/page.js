import LoginForm from "./components/login-form";

export default function Page() {
  return <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] py-40">
    <div className="flex flex-col space-y-8 text-center">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Sign in with a magic link or use an existing password. Enter your email below and choose your preferred login option.
      </p>
    </div>
    <LoginForm />
  </div>
}