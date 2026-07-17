'use server'

import { createClient } from '../supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type Availability = 'In Stock' | 'Limited Stock' | 'Out of Stock' | 'Pre-Order'

export interface DbProduct {
  id: string
  name: string
  category: string
  price: number
  original_price: number | null
  rating: number | null
  availability: Availability
  offer: string | null
  image_url: string | null
  created_at: string
}

export async function getProducts(): Promise<DbProduct[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch products:', error.message)
    return []
  }
  return data ?? []
}

export async function getProduct(id: string): Promise<DbProduct | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
  if (error) return null
  return data
}

type ParsedProduct =
  | { error: string; values?: undefined }
  | {
      error?: undefined
      values: {
        name: string
        category: string
        price: number
        original_price: number | null
        rating: number | null
        availability: Availability
        offer: string | null
      }
    }

function parseProductForm(formData: FormData): ParsedProduct {
  const name = (formData.get('name') as string)?.trim()
  const category = (formData.get('category') as string)?.trim()
  const price = Number(formData.get('price'))
  const originalPriceRaw = formData.get('originalPrice') as string
  const ratingRaw = formData.get('rating') as string
  const availability = formData.get('availability') as Availability
  const offer = (formData.get('offer') as string)?.trim()

  if (!name) return { error: 'Product name is required' }
  if (!category) return { error: 'Category is required' }
  if (!price || Number.isNaN(price) || price < 0) return { error: 'Enter a valid price' }

  return {
    values: {
      name,
      category,
      price,
      original_price: originalPriceRaw ? Number(originalPriceRaw) : null,
      rating: ratingRaw ? Number(ratingRaw) : null,
      availability: availability || 'In Stock',
      offer: offer || null,
    },
  }
}

async function uploadImageIfProvided(formData: FormData): Promise<{ url?: string; error?: string }> {
  const file = formData.get('image') as File | null
  if (!file || file.size === 0) return {}

  // 5MB limit — adjust if you need larger product photos
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'Image must be under 5MB' }
  }

  const supabase = await createClient()
  const ext = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, { upsert: false })

  if (uploadError) {
    return { error: 'Image upload failed: ' + uploadError.message }
  }

  const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
  return { url: data.publicUrl }
}

export async function createProduct(formData: FormData) {
  const parsed = parseProductForm(formData)
  if (parsed.error) {
    redirect('/admin/products/new?error=' + encodeURIComponent(parsed.error))
  }

  const { url, error: uploadError } = await uploadImageIfProvided(formData)
  if (uploadError) {
    redirect('/admin/products/new?error=' + encodeURIComponent(uploadError))
  }

  const supabase = await createClient()
  const { error } = await supabase.from('products').insert({
    ...parsed.values,
    image_url: url ?? null,
  })

  if (error) {
    redirect('/admin/products/new?error=' + encodeURIComponent('Could not save product: ' + error.message))
  }

  revalidatePath('/admin/products')
  revalidatePath('/store')
  redirect('/admin/products')
}

export async function updateProduct(id: string, formData: FormData) {
  const parsed = parseProductForm(formData)
  if (parsed.error) {
    redirect(`/admin/products/${id}/edit?error=` + encodeURIComponent(parsed.error))
  }

  const { url, error: uploadError } = await uploadImageIfProvided(formData)
  if (uploadError) {
    redirect(`/admin/products/${id}/edit?error=` + encodeURIComponent(uploadError))
  }

  const supabase = await createClient()
  const updateData: Record<string, unknown> = { ...parsed.values }
  if (url) updateData.image_url = url

  const { error } = await supabase.from('products').update(updateData).eq('id', id)

  if (error) {
    redirect(`/admin/products/${id}/edit?error=` + encodeURIComponent('Could not update product: ' + error.message))
  }

  revalidatePath('/admin/products')
  revalidatePath('/store')
  redirect('/admin/products')
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    redirect('/admin/products?error=' + encodeURIComponent('Could not delete product'))
  }

  revalidatePath('/admin/products')
  revalidatePath('/store')
  redirect('/admin/products')
}