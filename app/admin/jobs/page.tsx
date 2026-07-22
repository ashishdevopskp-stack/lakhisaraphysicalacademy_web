import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Briefcase } from 'lucide-react'
import { createClient } from '@/app/lib/supabase/server'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getJobs, deleteJob } from '@/app/lib/action/jobs'
import { AdminSidebar } from '../_components/AdminSidebar'

const STATUS_BADGE: Record<string, string> = {
  New: 'bg-green-50 text-green-700 border border-green-200',
  Ongoing: 'bg-blue-50 text-blue-700 border border-blue-200',
  Closed: 'bg-gray-50 text-gray-700 border border-gray-200',
}

export default async function AdminJobsPage({
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

  const jobs = await getJobs()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Jobs" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Jobs</h1>
            <p className="text-sm text-gray-500">Manage what shows up on the jobs page.</p>
          </div>
          <Link
            href="/admin/jobs/new"
            className="text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors text-center"
          >
            + Add Job
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {jobs.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-400 mb-4">No jobs yet.</p>
              <Link href="/admin/jobs/new" className="text-sm text-indigo-600 hover:underline">
                Add your first job
              </Link>
            </div>
          ) : (
            <div>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                      <Briefcase size={18} className="text-gray-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {job.category} · {job.organization} · {job.location}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        Notified {new Date(job.notification_date).toLocaleDateString('en-IN')} · Last date{' '}
                        {new Date(job.last_date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 sm:ml-4 pl-15 sm:pl-0">
                    <span className={'text-xs px-2.5 py-1 rounded-full ' + (STATUS_BADGE[job.status] ?? STATUS_BADGE.Closed)}>
                      {job.status}
                    </span>
                    {job.pdf_url && (
                      <a
                        href={job.pdf_url}
                        target="_blank"
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        PDF
                      </a>
                    )}
                    <Link
                      href={`/admin/jobs/${job.id}/edit`}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={deleteJob.bind(null, job.id)}>
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