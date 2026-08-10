import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Award, Plus, Trash2, Pencil, Sparkles, CheckCircle2 } from 'lucide-react'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getResults, deleteResult } from '@/app/lib/action/results'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../_components/AdminSidebar'

const RESULT_STATUS_STYLES: Record<string, string> = {
  Selected: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold',
  'Under Training': 'bg-blue-50 text-blue-700 border border-blue-200 font-extrabold',
  'Document Verification': 'bg-amber-50 text-amber-700 border border-amber-200 font-extrabold',
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
    loadError = 'Could not load placed achievements right now. Please refresh the page.'
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Placed Achievements" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-black mb-2">
              <Award size={14} />
              <span>Placed Achievements Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Placed Achievements (Selected Students)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Add and manage selected students for Army, Bihar Police, SI, SSC GD, CISF, BSF &amp; custom exams displayed on the website homepage carousel.
            </p>
          </div>

          <Link
            href="/admin/results/new"
            className="btn-orange text-xs py-2.5 px-5 shadow-lg flex items-center justify-center gap-2 shrink-0"
          >
            <Plus size={16} />
            <span>Add Selected Student</span>
          </Link>
        </div>

        {error && (
          <p className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
            ⚠️ {error}
          </p>
        )}

        {loadError && (
          <p className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
            ⚠️ {loadError}
          </p>
        )}

        <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-md">
          {results.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Award size={40} className="mx-auto text-slate-300" />
              <p className="text-sm font-black text-slate-700">
                {loadError ? 'No records to show.' : 'No placed achievements added yet.'}
              </p>
              {!loadError && (
                <Link href="/admin/results/new" className="text-xs font-black text-[#ea580c] hover:underline">
                  + Add your first selected student
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-slate-100 ring-2 ring-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                      {result.photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={result.photo_url} alt={result.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-slate-400 font-bold">—</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-black text-slate-900 truncate">{result.name}</p>
                        <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#ea580c] text-[10px] font-black uppercase">
                          {result.department}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                        {result.post} • {result.exam} ({result.year})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 sm:ml-4 pl-[4rem] sm:pl-0">
                    <span className={'text-xs px-3 py-1 rounded-full ' + (RESULT_STATUS_STYLES[result.status] ?? RESULT_STATUS_STYLES.Selected)}>
                      {result.status}
                    </span>

                    <Link
                      href={`/admin/results/${result.id}/edit`}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all"
                      title="Edit Student"
                    >
                      <Pencil size={15} />
                    </Link>

                    <form action={deleteResult.bind(null, result.id)}>
                      <button
                        type="submit"
                        className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                        title="Delete Student"
                      >
                        <Trash2 size={15} />
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