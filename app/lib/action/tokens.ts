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
  students: { name: string; bed_number: string | null; hostels: { name: string } | null; rooms: { room_number: string } | null } | null
  meal_plans: { name: string } | null
}

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
    .select('*, students(name, bed_number, hostels(name), rooms(room_number)), meal_plans(name)')
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

export async function generateSingleToken(params: {
  studentId: string
  mealPlanId: string
  selectedSlots: string[]
  validMonths: number
}) {
  const supabase = await createClient()
  const { count } = await supabase.from('tokens').select('*', { count: 'exact', head: true })
  const payload = {
    student_id: params.studentId,
    meal_plan_id: params.mealPlanId,
    selected_slots: params.selectedSlots,
    serial_number: serialFor(count ?? 0),
    expiry_date: addMonths(new Date(), params.validMonths),
    status: 'active' as const,
  }
  const { data, error } = await supabase
    .from('tokens')
    .insert(payload)
    .select('*, students(name, bed_number, hostels(name), rooms(room_number)), meal_plans(name)')
    .single()
  if (error) throw error
  revalidatePath('/admin/token')
  return data
}

export async function bulkGenerateTokens(params: {
  studentIds: string[]
  mealPlanId: string
  selectedSlots: string[]
  validMonths: number
}) {
  const supabase = await createClient()
  const { count } = await supabase.from('tokens').select('*', { count: 'exact', head: true })
  const expiry = addMonths(new Date(), params.validMonths)
  const base = count ?? 0

  const rows = params.studentIds.map((studentId, i) => ({
    student_id: studentId,
    meal_plan_id: params.mealPlanId,
    selected_slots: params.selectedSlots,
    serial_number: serialFor(base + i),
    expiry_date: expiry,
    status: 'active' as const,
  }))

  const { data, error } = await supabase
    .from('tokens')
    .insert(rows)
    .select('*, students(name, bed_number, hostels(name), rooms(room_number)), meal_plans(name)')
  if (error) throw error
  revalidatePath('/admin/token')
  return data
}

export async function cancelToken(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('tokens').update({ status: 'cancelled' }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/token')
}