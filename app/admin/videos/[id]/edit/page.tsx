import { redirect, notFound } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getVideoById, updateVideo } from '@/app/lib/action/videos'
import { createClient } from '@/app/lib/supabase/server'
import { VideoForm } from '../../VideoForm'
import { AdminSidebar } from '../../../_components/AdminSidebar'

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const video = await getVideoById(id)
  if (!video) notFound()

  const updateVideoWithId = updateVideo.bind(null, id)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Videos" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-semibold mb-1">Edit Video</h1>
        <p className="text-sm text-gray-500 mb-8">Update this video&apos;s details.</p>
        <VideoForm action={updateVideoWithId} submitLabel="Save Changes" initialData={video} />
      </main>
    </div>
  )
}