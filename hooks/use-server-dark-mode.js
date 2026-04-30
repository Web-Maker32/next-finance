import { cookies } from 'next/headers'

export default async function getServerTheme(defaultTheme = 'light') {
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get('theme')
  return themeCookie?.value ?? defaultTheme
}