import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FileText } from 'lucide-react'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getResources } from '@/app/lib/action/resources'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../_components/AdminSidebar'
import DeleteResourceButton from './DeleteResourceButton'

export default async function AdminResourcesPage({
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

  let resources: Awaited<ReturnType<typeof getResources>> = []
  let loadError: string | null = null
  try {
    resources = await getResources()
  } catch {
    loadError = 'Could not load resources right now. Please refresh the page.'
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Resources" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Resources</h1>
            <p className="text-sm text-gray-500">Manage what shows up on the resources page.</p>
          </div>
          <Link
            href="/admin/resources/new"
            className="inline-block text-center text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            + Add Resource
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        {loadError && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
            {loadError}
          </p>
        )}

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {resources.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-500 mb-4">
                {loadError ? 'No resources to show.' : 'No resources yet.'}
              </p>
              {!loadError && (
                <Link href="/admin/resources/new" className="text-sm text-indigo-600 hover:underline">
                  Add your first resource
                </Link>
              )}
            </div>
          ) : (
            <div>
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                      <FileText size={18} className="text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate text-gray-900">{resource.title}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {resource.category} · {new Date(resource.publish_date).toLocaleDateString('en-IN')}
                        {resource.has_video ? ' · video' : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 sm:ml-4 pl-[3.75rem] sm:pl-0">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                      {resource.downloads.toLocaleString('en-IN')} downloads
                    </span>
                    {resource.file_url && (
                      <a
                        href={resource.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        View
                      </a>
                    )}
                    <Link
                      href={`/admin/resources/${resource.id}/edit`}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteResourceButton id={resource.id} />
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