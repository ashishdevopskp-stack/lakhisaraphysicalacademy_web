'use server'

import { createClient } from './supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { checkRateLimit } from './rate-limit'

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

async function getClientIp(): Promise<string> {
  const hdrs = await headers()
  return (
    hdrs.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ??
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}

export async function adminLogin(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const validationError = validateCredentials(email, password)
  if (validationError) {
    redirect('/admin/login?error=' + encodeURIComponent(validationError))
  }

  const emailStr = email as string
  const ip = await getClientIp()

  const [withinIpLimit, withinIpEmailLimit] = await Promise.all([
    checkRateLimit(`ip:${ip}`),
    checkRateLimit(`ip-email:${ip}:${emailStr.toLowerCase()}`),
  ])

  if (!withinIpLimit || !withinIpEmailLimit) {
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
    console.warn(`adminLogin: non-admin login attempt uid=${data.user.id} ip=${ip}`)
    await supabase.auth.signOut()
    redirect('/admin/login?error=' + encodeURIComponent('Not authorized as admin'))
  }

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
    console.error('getCurrentUserRole: unexpected error', err)
    return null
  }
}