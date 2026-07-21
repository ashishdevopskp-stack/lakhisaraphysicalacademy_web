import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PlayCircle } from 'lucide-react'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getVideos, deleteVideo } from '@/app/lib/action/videos'
import { AdminSidebar } from '../products/page'

const STATUS_BADGE: Record<string, string> = {
  Published: 'bg-green-500/10 text-green-400',
  Draft: 'bg-white/[0.06] text-[#9B9BA3]',
}

export default async function AdminVideosPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const videos = await getVideos()

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Videos" />

      <main className="flex-1 p-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Videos</h1>
            <p className="text-sm text-[#9B9BA3]">Manage what shows up on the videos page.</p>
          </div>
          <Link
            href="/admin/videos/new"
            className="text-sm px-4 py-2 rounded-lg bg-[#7C6AEF] text-white font-medium hover:bg-[#6D5CE0] transition-colors"
          >
            + Add Video
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <div className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden">
          {videos.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-[#9B9BA3] mb-4">No videos yet.</p>
              <Link href="/admin/videos/new" className="text-sm text-[#7C6AEF] hover:underline">
                Add your first video
              </Link>
            </div>
          ) : (
            <div>
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-white/[0.06] overflow-hidden shrink-0 flex items-center justify-center">
                      {video.thumbnail_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                      ) : (
                        <PlayCircle size={18} className="text-[#9B9BA3]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {video.title}
                        {video.featured && (
                          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-[#7C6AEF]/15 text-[#7C6AEF] align-middle">
                            Featured
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-[#9B9BA3] truncate">{video.category}</p>
                      <p className="text-xs text-[#6E6E76] truncate">
                        Published {new Date(video.publish_date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span className={'text-xs px-2.5 py-1 rounded-full ' + (STATUS_BADGE[video.status] ?? STATUS_BADGE.Draft)}>
                      {video.status}
                    </span>
                    <a
                      href={video.video_url}
                      target="_blank"
                      className="text-sm text-[#9B9BA3] hover:text-[#EDEDEF] transition-colors"
                    >
                      Watch
                    </a>
                    <Link
                      href={`/admin/videos/${video.id}/edit`}
                      className="text-sm text-[#9B9BA3] hover:text-[#EDEDEF] transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={deleteVideo.bind(null, video.id)}>
                      <button type="submit" className="text-sm text-red-400 hover:text-red-300 transition-colors">
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