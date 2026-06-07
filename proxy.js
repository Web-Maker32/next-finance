import { updateSession } from './libs/supabase/proxy'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  return await updateSession(request)
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image| favicon.ico).*)',
  ],
}