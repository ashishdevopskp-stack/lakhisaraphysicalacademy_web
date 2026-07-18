'use server'

import { createClient } from '@/app/lib/supabase/server' // adjust if your client helper lives elsewhere
import { revalidatePath } from 'next/cache'

export type DbOrder = {
  id: string
  product_name: string
  customer_name: string
  phone: string
  address: string
  quantity: number
  notes: string | null
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
  created_at: string
}

export async function createOrder(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const productName = String(formData.get('productName') || '')
  const customerName = String(formData.get('customerName') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const street = String(formData.get('street') || '').trim()
  const city = String(formData.get('city') || '').trim()
  const district = String(formData.get('district') || '').trim()
  const pincode = String(formData.get('pincode') || '').trim()
  const quantity = Number(formData.get('quantity')) || 1
  const notes = String(formData.get('notes') || '').trim()

  if (!customerName || !phone || !street || !city || !district || !pincode) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    return { success: false, error: 'Enter a valid 10-digit phone number.' }
  }

  if (!/^[0-9]{6}$/.test(pincode)) {
    return { success: false, error: 'Enter a valid 6-digit pincode.' }
  }

  const address = `${street}, ${city}, ${district} – ${pincode}`

  const supabase = await createClient()
  const { error } = await supabase.from('orders').insert({
    product_name: productName,
    customer_name: customerName,
    phone,
    address,
    quantity,
    notes: notes || null,
    status: 'pending',
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/orders')
  return { success: true }
}

export async function getOrders(): Promise<DbOrder[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }
  return data as DbOrder[]
}

export async function updateOrderStatus(id: string, status: DbOrder['status']) {
  const supabase = await createClient()
  await supabase.from('orders').update({ status }).eq('id', id)
  revalidatePath('/admin/orders')
}

export async function deleteOrder(id: string) {
  const supabase = await createClient()
  await supabase.from('orders').delete().eq('id', id)
  revalidatePath('/admin/orders')
}