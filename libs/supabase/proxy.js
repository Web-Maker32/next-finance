
import { NextResponse } from 'next/server'
import { createClient } from './server'

export async function updateSession(request) {
  // 1. Create an initial response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          // Update the request cookies so future Server Components can read them
          request.cookies.set({ name, value, ...options })
          
          // Sync the updated cookies to the response headers
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          // Sync the deleted cookies to the request
          request.cookies.set({ name, value: '', ...options })
          
          // Sync the deleted cookies to the response headers
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // 2. This triggers the cookie refresh logic above if the session is expired
  await supabase.auth.getUser()

  return response
}