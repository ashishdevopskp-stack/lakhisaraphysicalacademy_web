import { redirect, notFound } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getGalleryImage, updateGalleryImage } from '@/app/lib/action/events'
import { AdminSidebar } from '../../../../products/page'
import { GalleryForm } from '../../_components/GalleryForm'

export default async function EditGalleryImagePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const image = await getGalleryImage(id)
  if (!image) notFound()

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Events" />
      <main className="flex-1 p-8 max-w-2xl">
        <h1 className="text-2xl font-semibold mb-1">Edit Gallery Image</h1>
        <p className="text-sm text-[#9B9BA3] mb-8">
          Update details for &ldquo;{image.label}&rdquo;.
        </p>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <GalleryForm
          action={updateGalleryImage.bind(null, id)}
          submitLabel="Save Changes"
          initialData={image}
        />
      </main>
    </div>
  )
}