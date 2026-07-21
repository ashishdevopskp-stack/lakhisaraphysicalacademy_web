import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Briefcase } from 'lucide-react'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getJobs, deleteJob } from '@/app/lib/action/jobs'

const STATUS_BADGE: Record<string, string> = {
  New: 'bg-green-500/10 text-green-400',
  Ongoing: 'bg-blue-500/10 text-blue-400',
  Closed: 'bg-white/[0.06] text-[#9B9BA3]',
}
import { AdminSidebar } from '../products/page'

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const jobs = await getJobs()

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Jobs" />

      <main className="flex-1 p-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Jobs</h1>
            <p className="text-sm text-[#9B9BA3]">Manage what shows up on the jobs page.</p>
          </div>
          <Link
            href="/admin/jobs/new"
            className="text-sm px-4 py-2 rounded-lg bg-[#7C6AEF] text-white font-medium hover:bg-[#6D5CE0] transition-colors"
          >
            + Add Job
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <div className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden">
          {jobs.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-[#9B9BA3] mb-4">No jobs yet.</p>
              <Link href="/admin/jobs/new" className="text-sm text-[#7C6AEF] hover:underline">
                Add your first job
              </Link>
            </div>
          ) : (
            <div>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-white/[0.06] overflow-hidden shrink-0 flex items-center justify-center">
                      <Briefcase size={18} className="text-[#9B9BA3]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{job.title}</p>
                      <p className="text-sm text-[#9B9BA3] truncate">
                        {job.category} · {job.organization} · {job.location}
                      </p>
                      <p className="text-xs text-[#6E6E76] truncate">
                        Notified {new Date(job.notification_date).toLocaleDateString('en-IN')} · Last date{' '}
                        {new Date(job.last_date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span className={'text-xs px-2.5 py-1 rounded-full ' + (STATUS_BADGE[job.status] ?? STATUS_BADGE.Closed)}>
                      {job.status}
                    </span>
                    {job.pdf_url && (
                    <a
                        href={job.pdf_url}
                        target="_blank"
                        className="text-sm text-[#9B9BA3] hover:text-[#EDEDEF] transition-colors"
                      >
                        PDF
                      </a>
                    )}
                    <Link
                      href={`/admin/jobs/${job.id}/edit`}
                      className="text-sm text-[#9B9BA3] hover:text-[#EDEDEF] transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={deleteJob.bind(null, job.id)}>
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