import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createAdminClient() {
  if (typeof window !== 'undefined') {
    throw new Error('createAdminClient() must never be called on the client.')
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set.')
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}