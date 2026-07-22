import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getResults, deleteResult } from '@/app/lib/action/results'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../_components/AdminSidebar'

const RESULT_STATUS_STYLES: Record<string, string> = {
  Selected: 'bg-green-50 text-green-700 border border-green-200',
  'Under Training': 'bg-blue-50 text-blue-700 border border-blue-200',
  'Document Verification': 'bg-amber-50 text-amber-700 border border-amber-200',
}

export default async function AdminResultsPage({
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

  let results: Awaited<ReturnType<typeof getResults>> = []
  let loadError: string | null = null
  try {
    results = await getResults()
  } catch {
    loadError = 'Could not load results right now. Please refresh the page.'
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Results" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Results</h1>
            <p className="text-sm text-gray-500">Manage what shows up on the results page.</p>
          </div>
          <Link
            href="/admin/results/new"
            className="inline-block text-center text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            + Add Result
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
          {results.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-500 mb-4">
                {loadError ? 'No results to show.' : 'No results yet.'}
              </p>
              {!loadError && (
                <Link href="/admin/results/new" className="text-sm text-indigo-600 hover:underline">
                  Add your first result
                </Link>
              )}
            </div>
          ) : (
            <div>
              {results.map((result) => (
                <div
                  key={result.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                      {result.photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={result.photo_url} alt={result.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate text-gray-900">{result.name}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {result.department} · {result.post} · {result.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 sm:ml-4 pl-[3.75rem] sm:pl-0">
                    <span className={'text-xs px-2.5 py-1 rounded-full ' + (RESULT_STATUS_STYLES[result.status] ?? RESULT_STATUS_STYLES.Selected)}>
                      {result.status}
                    </span>
                    <Link
                      href={`/admin/results/${result.id}/edit`}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={deleteResult.bind(null, result.id)}>
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