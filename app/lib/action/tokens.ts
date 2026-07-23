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

export async function getMealPlans() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('meal_plans').select('*').order('name')
  if (error) throw error
  return data ?? []
}

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

function addMonths(date: Date, months: number) {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d.toISOString().slice(0, 10)
}

async function nextSerial(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { count } = await supabase.from('tokens').select('*', { count: 'exact', head: true })
  return count ?? 0
}

export async function generateSingleToken(params: {
  studentId: string
  mealPlanId: string
  selectedSlots: string[]
  validMonths: number
}) {
  if (!params.studentId) throw new Error('Select a student')
  const supabase = await createClient()
  const base = await nextSerial(supabase)
  const payload = {
    student_id: params.studentId,
    meal_plan_id: params.mealPlanId,
    selected_slots: params.selectedSlots,
    serial_number: serialFor(base),
    expiry_date: addMonths(new Date(), params.validMonths),
    status: 'active' as const,
  }
  const { data, error } = await supabase.from('tokens').insert(payload).select(TOKEN_SELECT).single()
  if (error) throw error
  revalidatePath('/admin/token')
  return data as unknown as TokenRow
}

// NEW: generate a token for a walk-in / not-yet-registered student, no students row required
export async function generateManualToken(params: {
  name: string
  hostelName?: string
  roomNumber?: string
  bedNumber?: string
  mealPlanId: string
  selectedSlots: string[]
  validMonths: number
}) {
  const name = params.name.trim()
  if (!name) throw new Error('Student name is required')
  const supabase = await createClient()
  const base = await nextSerial(supabase)
  const payload = {
    student_id: null,
    manual_name: name,
    manual_hostel_name: params.hostelName?.trim() || null,
    manual_room_number: params.roomNumber?.trim() || null,
    manual_bed_number: params.bedNumber?.trim() || null,
    meal_plan_id: params.mealPlanId,
    selected_slots: params.selectedSlots,
    serial_number: serialFor(base),
    expiry_date: addMonths(new Date(), params.validMonths),
    status: 'active' as const,
  }
  const { data, error } = await supabase.from('tokens').insert(payload).select(TOKEN_SELECT).single()
  if (error) throw error
  revalidatePath('/admin/token')
  return data as unknown as TokenRow
}

export async function bulkGenerateTokens(params: {
  studentIds: string[]
  mealPlanId: string
  selectedSlots: string[]
  validMonths: number
}) {
  const supabase = await createClient()
  const base = await nextSerial(supabase)
  const expiry = addMonths(new Date(), params.validMonths)

  const rows = params.studentIds.map((studentId, i) => ({
    student_id: studentId,
    meal_plan_id: params.mealPlanId,
    selected_slots: params.selectedSlots,
    serial_number: serialFor(base + i),
    expiry_date: expiry,
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