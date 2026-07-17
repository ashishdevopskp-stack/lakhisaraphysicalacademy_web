'use server'

import { createClient } from '../supabase/server'
import { redirect } from 'next/navigation'

function validateCredentials(email: FormDataEntryValue | null, password: FormDataEntryValue | null) {
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return 'Email and password are required'
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return 'Enter a valid email address'
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters'
  }
  return null
}

// Admin login → verifies role = 'admin' before letting them in
export async function adminLogin(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const validationError = validateCredentials(email, password)
  if (validationError) {
    redirect('/admin/login?error=' + encodeURIComponent(validationError))
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email as string,
    password: password as string,
  })

  if (error || !data.user) {
    redirect('/admin/login?error=' + encodeURIComponent('Invalid email or password'))
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user!.id)
    .single()

  if (profileError || !profile) {
    await supabase.auth.signOut()
    redirect('/admin/login?error=' + encodeURIComponent('Unable to verify account. Try again.'))
  }

  if (profile!.role !== 'admin') {
    await supabase.auth.signOut()
    redirect('/admin/login?error=' + encodeURIComponent('Not authorized as admin'))
  }

  redirect('/admin/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    redirect('/admin/login?error=' + encodeURIComponent('Failed to sign out, try again'))
  }
  redirect('/admin/login')
}

export async function getCurrentUserRole() {
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

  if (profileError) return null
  return profile?.role ?? 'user'
}