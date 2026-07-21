import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { createVideo } from '@/app/lib/action/videos'
import { VideoForm } from '../VideoForm'
import { AdminSidebar } from '../../products/page'

export default async function NewVideoPage() {
  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Videos" />
      <main className="flex-1 p-8 max-w-2xl">
        <h1 className="text-2xl font-semibold mb-1">Add Video</h1>
        <p className="text-sm text-[#9B9BA3] mb-8">Add a new video to the videos page.</p>
        <VideoForm action={createVideo} submitLabel="Add Video" />
      </main>
    </div>
  )
}