'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'

export type Student = {
  id: string
  name: string
  father_name: string | null
  admission_id: string | null
  phone: string | null
  hostel_id: string | null
  room_id: string | null
  bed_number: string | null
  batch: string | null
  created_at: string
  hostels?: { name: string } | null
  rooms?: { room_number: string } | null
}

export type Hostel = { id: string; name: string }
export type Room = { id: string; room_number: string; hostel_id: string }

export async function getStudents() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('students')
    .select('*, hostels(name), rooms(room_number)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Student[]
}

export async function getStudentById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('students')
    .select('*, hostels(name), rooms(room_number)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Student
}

export async function getStudentsFiltered(filters: {
  hostelId?: string
  roomId?: string
  batch?: string
}) {
  const supabase = await createClient()
  let query = supabase.from('students').select('*, hostels(name), rooms(room_number)')
  if (filters.hostelId) query = query.eq('hostel_id', filters.hostelId)
  if (filters.roomId) query = query.eq('room_id', filters.roomId)
  if (filters.batch) query = query.eq('batch', filters.batch)
  const { data, error } = await query.order('name')
  if (error) throw error
  return (data ?? []) as Student[]
}

export async function getHostels() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('hostels').select('*').order('name')
  if (error) throw error
  return (data ?? []) as Hostel[]
}

export async function getRoomsByHostel(hostelId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('hostel_id', hostelId)
    .order('room_number')
  if (error) throw error
  return (data ?? []) as Room[]
}

// NEW: create a hostel on the fly from the form
export async function createHostel(name: string) {
  const supabase = await createClient()
  const trimmed = name.trim()
  if (!trimmed) throw new Error('Hostel name is required')
  const { data, error } = await supabase
    .from('hostels')
    .insert({ name: trimmed })
    .select()
    .single()
  if (error) throw error
  revalidatePath('/admin/students')
  return data as Hostel
}

// NEW: create a room on the fly from the form
export async function createRoom(hostelId: string, roomNumber: string) {
  const supabase = await createClient()
  const trimmed = roomNumber.trim()
  if (!hostelId) throw new Error('Select a hostel first')
  if (!trimmed) throw new Error('Room number is required')
  const { data, error } = await supabase
    .from('rooms')
    .insert({ hostel_id: hostelId, room_number: trimmed })
    .select()
    .single()
  if (error) throw error
  revalidatePath('/admin/students')
  return data as Room
}

// NEW: distinct bed numbers already used in a room, to populate the "select bed" dropdown
export async function getBedNumbersByRoom(roomId: string, excludeStudentId?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('students')
    .select('bed_number')
    .eq('room_id', roomId)
    .not('bed_number', 'is', null)
  if (excludeStudentId) query = query.neq('id', excludeStudentId)
  const { data, error } = await query
  if (error) throw error
  const unique = Array.from(new Set((data ?? []).map((d) => d.bed_number).filter(Boolean))) as string[]
  return unique.sort()
}

function studentPayload(formData: FormData) {
  return {
    name: String(formData.get('name') ?? '').trim(),
    father_name: String(formData.get('father_name') ?? '').trim() || null,
    admission_id: String(formData.get('admission_id') ?? '').trim() || null,
    phone: String(formData.get('phone') ?? '').trim() || null,
    hostel_id: String(formData.get('hostel_id') ?? '') || null,
    room_id: String(formData.get('room_id') ?? '') || null,
    bed_number: String(formData.get('bed_number') ?? '').trim() || null,
    batch: String(formData.get('batch') ?? '').trim() || null,
  }
}

export async function createStudent(formData: FormData) {
  const supabase = await createClient()
  const payload = studentPayload(formData)
  if (!payload.name) throw new Error('Student name is required')
  const { error } = await supabase.from('students').insert(payload)
  if (error) throw error
  revalidatePath('/admin/students')
}

export async function updateStudent(id: string, formData: FormData) {
  const supabase = await createClient()
  const payload = studentPayload(formData)
  if (!payload.name) throw new Error('Student name is required')
  const { error } = await supabase.from('students').update(payload).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/students')
}

export async function deleteStudent(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('students').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/students')
}