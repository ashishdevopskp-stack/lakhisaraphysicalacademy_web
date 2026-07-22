import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PlayCircle } from 'lucide-react'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getVideos, deleteVideo } from '@/app/lib/action/videos'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../_components/AdminSidebar'

const STATUS_BADGE: Record<string, string> = {
  Published: 'bg-green-50 text-green-700 border border-green-200',
  Draft: 'bg-gray-100 text-gray-600 border border-gray-200',
}

export default async function AdminVideosPage({
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

  const videos = await getVideos()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Videos" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Videos</h1>
            <p className="text-sm text-gray-500">Manage what shows up on the videos page.</p>
          </div>
          <Link
            href="/admin/videos/new"
            className="inline-block text-center text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            + Add Video
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {videos.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-500 mb-4">No videos yet.</p>
              <Link href="/admin/videos/new" className="text-sm text-indigo-600 hover:underline">
                Add your first video
              </Link>
            </div>
          ) : (
            <div>
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                      {video.thumbnail_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                      ) : (
                        <PlayCircle size={18} className="text-gray-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate text-gray-900">
                        {video.title}
                        {video.featured && (
                          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 align-middle">
                            Featured
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{video.category}</p>
                      <p className="text-xs text-gray-400 truncate">
                        Published {new Date(video.publish_date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 sm:ml-4 pl-[3.75rem] sm:pl-0">
                    <span className={'text-xs px-2.5 py-1 rounded-full ' + (STATUS_BADGE[video.status] ?? STATUS_BADGE.Draft)}>
                      {video.status}
                    </span>
                    <a
                      href={video.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Watch
                    </a>
                    <Link
                      href={`/admin/videos/${video.id}/edit`}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={deleteVideo.bind(null, video.id)}>
                      <button type="submit" className="text-sm text-red-600 hover:text-red-700 transition-colors">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}