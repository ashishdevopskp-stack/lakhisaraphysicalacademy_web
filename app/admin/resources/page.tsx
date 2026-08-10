import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { FileText, Download, Video, PlusCircle } from 'lucide-react'
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resources</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage what shows up on the resources page.</p>
          </div>
          <Link
            href="/admin/resources/new"
            className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <PlusCircle size={16} />
            Add Resource
          </Link>
        </div>

        {(error || loadError) && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
            {error ?? loadError}
          </p>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500 font-medium">Total Resources</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{resources.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500 font-medium">Total Downloads</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">
              {resources.reduce((sum, r) => sum + r.downloads, 0).toLocaleString('en-IN')}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm col-span-2 sm:col-span-1">
            <p className="text-xs text-slate-500 font-medium">With Video</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">
              {resources.filter((r) => r.has_video).length}
            </p>
          </div>
        </div>

        {/* List */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {resources.length === 0 ? (
            <div className="p-12 text-center">
              <FileText size={36} className="text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500 mb-3">No resources yet.</p>
              <Link href="/admin/resources/new" className="text-sm font-bold text-indigo-600 hover:underline">
                Add your first resource →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-4 hover:bg-slate-50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200 flex items-center justify-center">
                    {resource.thumbnail_url ? (
                      <Image
                        src={resource.thumbnail_url}
                        alt={resource.title}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileText size={20} className="text-slate-400" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{resource.title}</p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                      <span className="text-xs text-slate-500">{resource.category}</span>
                      <span className="text-slate-300 text-xs">·</span>
                      <span className="text-xs text-slate-500">
                        {new Date(resource.publish_date).toLocaleDateString('en-IN')}
                      </span>
                      {resource.has_video && (
                        <>
                          <span className="text-slate-300 text-xs">·</span>
                          <span className="inline-flex items-center gap-1 text-xs text-indigo-600 font-medium">
                            <Video size={11} />
                            Video
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0 pl-[4.25rem] sm:pl-0">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                      <Download size={11} />
                      {resource.downloads.toLocaleString('en-IN')}
                    </span>
                    {resource.file_url && (
                      <a
                        href={resource.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
                      >
                        View
                      </a>
                    )}
                    <Link
                      href={`/admin/resources/${resource.id}/edit`}
                      className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
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