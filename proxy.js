import { updateSession } from './libs/supabase/proxy'
import { createClient } from './libs/supabase/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {

const supabase = await createClient();

  const {data: { user } } = await supabase.auth.getUser()
 
  if (!user &&  request.nextUrl.pathname.startsWith('/dashboard')){
    return Response.redirect(new URL('/login', request.url))
  } 
 
  if (user &&  request.nextUrl.pathname.startsWith('/login')){
    return Response.redirect(new URL('/dashboard', request.url))
  }
 
  return await updateSession(request)
}
 
export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}