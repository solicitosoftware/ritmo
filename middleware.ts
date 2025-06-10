import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Array of routes that don't require authentication
const publicRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
]

// Array of routes that are part of the authentication process
const authRoutes = ['/auth/callback']

// Array of routes that require authentication
const protectedRoutes = ['/dashboard', '/api']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { pathname } = req.nextUrl

  // Handle supabase authentication
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the route is a public route
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))
  // Check if the route is an auth route (like OAuth callbacks)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Allow auth routes to proceed without authentication
  if (isAuthRoute) {
    return res
  }

  // Redirect authenticated users away from public routes
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Redirect unauthenticated users away from protected routes
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL('/auth/signin', req.url)
    redirectUrl.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes that don't require authentication
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|public).*)',
  ],
} 