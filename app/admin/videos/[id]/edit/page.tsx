import { redirect, notFound } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getVideoById, updateVideo } from '@/app/lib/action/videos'
import { VideoForm } from '../../VideoForm'
import { AdminSidebar } from '../../../products/page'

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const video = await getVideoById(id)
  if (!video) notFound()

  const updateVideoWithId = updateVideo.bind(null, id)

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Videos" />
      <main className="flex-1 p-8 max-w-2xl">
        <h1 className="text-2xl font-semibold mb-1">Edit Video</h1>
        <p className="text-sm text-[#9B9BA3] mb-8">Update this video&apos;s details.</p>
        <VideoForm action={updateVideoWithId} submitLabel="Save Changes" initialData={video} />
      </main>
    </div>
  )
}