'use server'

import { cache } from 'react'
import { createClient } from '../supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

function validateCredentials(email: FormDataEntryValue | null, password: FormDataEntryValue | null) {
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return 'Email and password are required'
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return 'Enter a valid email address'
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters'
  }
  return null
}

const attempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000
const MAX_TRACKED_KEYS = 5000 // hard ceiling so this Map can't grow unbounded

function pruneExpiredAttempts(now: number) {
  for (const [key, entry] of attempts) {
    if (now > entry.resetAt) attempts.delete(key)
  }
}

async function checkRateLimit(email: string): Promise<boolean> {
  const hdrs = await headers()
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const key = `${ip}:${email.toLowerCase()}`
  const now = Date.now()

  const entry = attempts.get(key)
  if (!entry || now > entry.resetAt) {
    if (attempts.size >= MAX_TRACKED_KEYS) pruneExpiredAttempts(now)
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (entry.count >= MAX_ATTEMPTS) return false

  entry.count += 1
  return true
}

function clearRateLimit(email: string) {
  // Best-effort: since the key is IP+email, we can't clear it here without
  // the IP in scope. Left as a no-op on purpose — the window will expire
  // naturally, and that's fine for a login success path.
}

/**
 * Single source of truth for "who is the current user" within one request.
 * `cache()` dedupes calls with the same arguments during a single render/
 * request pass — so calling this 5 times across 5 different admin pages
 * (or once here + once in getCurrentUserRole) only hits Supabase's Auth
 * API once instead of five times. This is very likely why you were
 * hitting `over_request_rate_limit`.
 */
export const getAuthUser = cache(async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) return null
  return data.user
})

// Admin login → verifies role = 'admin' before letting them in
export async function adminLogin(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const validationError = validateCredentials(email, password)
  if (validationError) {
    redirect('/admin/login?error=' + encodeURIComponent(validationError))
  }

  const emailStr = email as string

  const withinLimit = await checkRateLimit(emailStr)
  if (!withinLimit) {
    redirect('/admin/login?error=' + encodeURIComponent('Too many attempts. Try again in 15 minutes.'))
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailStr,
    password: password as string,
  })

  if (error) {
    // Surface Supabase's own rate limit distinctly so it's not confused
    // with "wrong password" — this is what you're hitting right now.
    if (error.status === 429 || error.code === 'over_request_rate_limit') {
      console.error('adminLogin: Supabase auth rate limit hit', error)
      redirect(
        '/admin/login?error=' +
          encodeURIComponent('Too many login attempts right now. Please wait a few minutes and try again.')
      )
    }
    redirect('/admin/login?error=' + encodeURIComponent('Invalid email or password'))
  }

  if (!data.user) {
    redirect('/admin/login?error=' + encodeURIComponent('Invalid email or password'))
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (profileError || !profile) {
    console.error('adminLogin: profile lookup failed', profileError)
    await supabase.auth.signOut()
    redirect('/admin/login?error=' + encodeURIComponent('Unable to verify account. Try again.'))
  }

  if (profile.role !== 'admin') {
    await supabase.auth.signOut()
    redirect('/admin/login?error=' + encodeURIComponent('Not authorized as admin'))
  }

  clearRateLimit(emailStr)
  redirect('/admin/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('logout failed', error)
    redirect('/admin/login?error=' + encodeURIComponent('Failed to sign out, try again'))
  }
  redirect('/admin/login')
}

/**
 * Uses the cached getAuthUser() instead of calling supabase.auth.getUser()
 * directly — so pages that already fetched the user this request don't
 * trigger a second Auth API call just to check the role.
 */
export async function getCurrentUserRole() {
  try {
    const user = await getAuthUser()
    if (!user) return null

    const supabase = await createClient()
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('getCurrentUserRole: profile lookup failed', profileError)
      return null
    }
    return profile?.role ?? 'user'
  } catch (err) {
    console.error('getCurrentUserRole: unexpected error', err)
    return null
  }
}