import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getGalleryImages, deleteGalleryImage } from '@/app/lib/action/events'
import { AdminSidebar } from '../../products/page'

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const images = await getGalleryImages()

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Events" />

      <main className="flex-1 p-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin/events" className="text-xs text-[#9B9BA3] hover:text-[#EDEDEF] transition-colors">
              ← Back to Events
            </Link>
            <h1 className="text-2xl font-semibold mt-1 mb-1">Event Gallery</h1>
            <p className="text-sm text-[#9B9BA3]">Manage what shows up on the events gallery page.</p>
          </div>
          <Link
            href="/admin/events/gallery/new"
            className="text-sm px-4 py-2 rounded-lg bg-[#7C6AEF] text-white font-medium hover:bg-[#6D5CE0] transition-colors"
          >
            + Add Image
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        {images.length === 0 ? (
          <div className="bg-[#17181D] border border-white/[0.06] rounded-xl p-10 text-center">
            <p className="text-sm text-[#9B9BA3] mb-4">No gallery images yet.</p>
            <Link href="/admin/events/gallery/new" className="text-sm text-[#7C6AEF] hover:underline">
              Add your first image
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.image_url} alt={img.label} className="w-full aspect-square object-cover" />
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{img.label}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <Link
                      href={`/admin/events/gallery/${img.id}/edit`}
                      className="text-sm text-[#9B9BA3] hover:text-[#EDEDEF] transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={deleteGalleryImage.bind(null, img.id)}>
                      <button type="submit" className="text-sm text-red-400 hover:text-red-300 transition-colors">
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