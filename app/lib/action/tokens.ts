'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'

export type TokenRow = {
  id: string
  token_number: number
  serial_number: string
  date_of_allotment: string
  expiry_date: string
  status: 'active' | 'used' | 'expired' | 'cancelled'
  selected_slots: string[]
  student_id: string | null
  manual_name: string | null
  manual_hostel_name: string | null
  manual_room_number: string | null
  manual_bed_number: string | null
  students: {
    name: string
    bed_number: string | null
    hostels: { name: string } | null
    rooms: { room_number: string } | null
  } | null
  meal_plans: { name: string } | null
}

const TOKEN_SELECT = '*, students(name, bed_number, hostels(name), rooms(room_number)), meal_plans(name)'

export async function getTokens() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tokens')
    .select(TOKEN_SELECT)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as unknown as TokenRow[]
}

export async function getTokenStats() {
  const tokens = await getTokens()
  return {
    total: tokens.length,
    active: tokens.filter((t) => t.status === 'active').length,
    expired: tokens.filter((t) => t.status === 'expired').length,
    cancelled: tokens.filter((t) => t.status === 'cancelled').length,
  }
}

function serialFor(n: number) {
  return String(1000 + n).padStart(4, '0')
}

async function nextSerial(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { count } = await supabase.from('tokens').select('*', { count: 'exact', head: true })
  return count ?? 0
}

export async function generateSingleToken(params: {
  studentId: string
  validFrom: string
  validTill: string
}) {
  if (!params.studentId) throw new Error('Select a student')
  if (!params.validFrom || !params.validTill) throw new Error('Valid From and Valid Till are required')
  const supabase = await createClient()
  const base = await nextSerial(supabase)
  const payload = {
    student_id: params.studentId,
    selected_slots: [] as string[],
    serial_number: serialFor(base),
    date_of_allotment: params.validFrom,
    expiry_date: params.validTill,
    status: 'active' as const,
  }
  const { data, error } = await supabase.from('tokens').insert(payload).select(TOKEN_SELECT).single()
  if (error) throw error
  revalidatePath('/admin/token')
  return data as unknown as TokenRow
}

// generate a token for a walk-in / not-yet-registered student, no students row required
export async function generateManualToken(params: {
  name: string
  hostelName?: string
  roomNumber?: string
  bedNumber?: string
  validFrom: string
  validTill: string
}) {
  const name = params.name.trim()
  if (!name) throw new Error('Student name is required')
  if (!params.validFrom || !params.validTill) throw new Error('Valid From and Valid Till are required')
  const supabase = await createClient()
  const base = await nextSerial(supabase)
  const payload = {
    student_id: null,
    manual_name: name,
    manual_hostel_name: params.hostelName?.trim() || null,
    manual_room_number: params.roomNumber?.trim() || null,
    manual_bed_number: params.bedNumber?.trim() || null,
    selected_slots: [] as string[],
    serial_number: serialFor(base),
    date_of_allotment: params.validFrom,
    expiry_date: params.validTill,
    status: 'active' as const,
  }
  const { data, error } = await supabase.from('tokens').insert(payload).select(TOKEN_SELECT).single()
  if (error) throw error
  revalidatePath('/admin/token')
  return data as unknown as TokenRow
}

export async function bulkGenerateTokens(params: {
  studentIds: string[]
  validFrom: string
  validTill: string
}) {
  if (!params.validFrom || !params.validTill) throw new Error('Valid From and Valid Till are required')
  const supabase = await createClient()
  const base = await nextSerial(supabase)

  const rows = params.studentIds.map((studentId, i) => ({
    student_id: studentId,
    selected_slots: [] as string[],
    serial_number: serialFor(base + i),
    date_of_allotment: params.validFrom,
    expiry_date: params.validTill,
    status: 'active' as const,
  }))

  const { data, error } = await supabase.from('tokens').insert(rows).select(TOKEN_SELECT)
  if (error) throw error
  revalidatePath('/admin/token')
  return data as unknown as TokenRow[]
}

export async function cancelToken(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('tokens').update({ status: 'cancelled' }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/token')
}

export async function deleteToken(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('tokens').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/token')
}