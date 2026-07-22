'use server'

import { createClient } from '../supabase/server'
import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'
import type { VisitPoint } from '../../admin/_components/VisitsChart'

type SiteAnalytics = {
  daily: VisitPoint[]
  totalVisits: number
  totalUniqueVisitors: number
}

// Uses the regular server client (anon key + user's session cookie) — no
// service role key needed. This is safe because get_daily_visit_stats is
// `security definer` in Postgres: it runs with elevated rights regardless
// of who calls it, and page_views itself has no select policy, so nobody
// can read it directly — only through this RPC. The caller (the dashboard
// page) is still responsible for checking the user is an admin before
// calling this function.
export async function getSiteAnalytics(days = 30): Promise<SiteAnalytics> {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_daily_visit_stats', {
    p_days: days,
  })

  if (error) {
    console.error('getSiteAnalytics: rpc failed', error)
    return { daily: [], totalVisits: 0, totalUniqueVisitors: 0 }
  }

  const daily: VisitPoint[] = (data ?? []).map((row: { day: any; visits: any; unique_visitors: any }) => ({
    date: row.day,
    visits: Number(row.visits),
    uniqueVisitors: Number(row.unique_visitors),
  }))

  const totalVisits = daily.reduce((sum, d) => sum + d.visits, 0)
  const totalUniqueVisitors = daily.reduce((sum, d) => sum + d.uniqueVisitors, 0)

  return { daily, totalVisits, totalUniqueVisitors }
}

export async function trackPageView(path: string) {
  const cookieStore = await cookies()
  let sessionId = cookieStore.get('vid')?.value

  if (!sessionId) {
    sessionId = randomUUID()
    try {
      cookieStore.set('vid', sessionId, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
      })
    } catch {
      // Called from a Server Component — safe to ignore
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('page_views').insert({
    session_id: sessionId,
    path,
  })

  if (error) {
    console.error('trackPageView: insert failed', error)
  }
}