import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { createVideo } from '@/app/lib/action/videos'
import { createClient } from '@/app/lib/supabase/server'
import { VideoForm } from '../VideoForm'
import { AdminSidebar } from '../../_components/AdminSidebar'

export default async function NewVideoPage() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Videos" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-semibold mb-1">Add Video</h1>
        <p className="text-sm text-gray-500 mb-8">Add a new video to the videos page.</p>
        <VideoForm action={createVideo} submitLabel="Add Video" />
      </main>
    </div>
  )
}