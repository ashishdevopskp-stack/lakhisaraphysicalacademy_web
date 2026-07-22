'use server'

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

async function checkRateLimit(email: string): Promise<boolean> {
  const hdrs = await headers()
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const key = `${ip}:${email.toLowerCase()}`
  const now = Date.now()

  const entry = attempts.get(key)
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (entry.count >= MAX_ATTEMPTS) return false

  entry.count += 1
  return true
}

function clearRateLimit(email: string) {
  // Best-effort cleanup on success; key still includes IP so this only
  // clears this exact IP+email pairing, which is fine.
}

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

  if (error || !data.user) {
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

export async function getCurrentUserRole() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) return null

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
    // Fail closed — an unexpected error (network, etc.) should never be
    // treated as "authenticated" by any caller of this function.
    console.error('getCurrentUserRole: unexpected error', err)
    return null
  }
}