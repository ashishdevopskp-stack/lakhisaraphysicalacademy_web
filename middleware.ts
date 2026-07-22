import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'
import { updateSession } from '@/app/lib/supabase/middleware'

async function getAdminProfile(request: NextRequest, user: User) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: () => {},
      },
    }
  )

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('middleware: profile lookup failed', error)
  }
  return profile
}

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)
  const path = request.nextUrl.pathname

  const isAdminRoute = path.startsWith('/admin') && path !== '/admin/login'
  const isAdminLoginRoute = path === '/admin/login'

  // Block unauthenticated access to admin routes
  if (isAdminRoute && !user) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if ((isAdminRoute || isAdminLoginRoute) && user) {
    const profile = await getAdminProfile(request, user)
    const isAdmin = profile?.role === 'admin'

    // Role check for admin routes — fail closed on any error
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Already logged in as admin → skip admin login page
    if (isAdminLoginRoute && isAdmin) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*'],
}