import { NextResponse } from 'next/server'
import { createClient } from './server'

export async function updateSession(request) {
  // 1. Create an initial response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = await createClient({
    getAll() {
      return request.cookies.getAll()
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value, options }) => {
        request.cookies.set({ name, value, ...options })
        response.cookies.set(name, value, options)
      })
    },
  })

  // 2. This triggers the cookie refresh logic above if the session is expired
  const { data } = await supabase.auth.getUser()
  const user = data?.user

  return response
}
