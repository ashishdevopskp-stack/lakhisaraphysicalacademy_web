import { createAdminClient } from './supabase/admin'

const MAX_ATTEMPTS = 5
const WINDOW_SECONDS = 15 * 60

export async function checkRateLimit(key: string): Promise<boolean> {
  const supabase = createAdminClient()

  const { data, error } = await supabase.rpc('check_rate_limit', {
    p_key: key,
    p_max_attempts: MAX_ATTEMPTS,
    p_window_seconds: WINDOW_SECONDS,
  })

  if (error) {
    // Fail closed on infra errors — don't let a DB hiccup become an
    // open door for brute-forcing.
    console.error('checkRateLimit: rpc failed', error)
    return false
  }

  return data === true
}