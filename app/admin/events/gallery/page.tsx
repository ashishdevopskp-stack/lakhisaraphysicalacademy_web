import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getGalleryImages, deleteGalleryImage } from '@/app/lib/action/events'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../../_components/AdminSidebar'

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  let images: Awaited<ReturnType<typeof getGalleryImages>> = []
  let loadError: string | null = null
  try {
    images = await getGalleryImages()
  } catch {
    loadError = 'Could not load gallery images right now. Please refresh the page.'
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Events" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link href="/admin/events" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
              ← Back to Events
            </Link>
            <h1 className="text-2xl font-semibold mt-1 mb-1">Event Gallery</h1>
            <p className="text-sm text-gray-500">Manage what shows up on the events gallery page.</p>
          </div>
          <Link
            href="/admin/events/gallery/new"
            className="inline-block text-center text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            + Add Image
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        {loadError && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
            {loadError}
          </p>
        )}

        {images.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
            <p className="text-sm text-gray-500 mb-4">
              {loadError ? 'No images to show.' : 'No gallery images yet.'}
            </p>
            {!loadError && (
              <Link href="/admin/events/gallery/new" className="text-sm text-indigo-600 hover:underline">
                Add your first image
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.image_url} alt={img.label} className="w-full aspect-square object-cover" />
                <div className="p-3">
                  <p className="text-sm font-medium truncate text-gray-900">{img.label}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <Link
                      href={`/admin/events/gallery/${img.id}/edit`}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={deleteGalleryImage.bind(null, img.id)}>
                      <button type="submit" className="text-sm text-red-600 hover:text-red-700 transition-colors">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}