import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getAuthUser, getCurrentUserRole } from '@/app/lib/action/auth'
import { getAdmissions } from '@/app/lib/action/admissions'
import { AdminSidebar } from '../_components/AdminSidebar'
import { AdmissionStatusForm, STATUS_STYLES } from '../_components/AdmissionStatusForm'

export default async function AdminAdmissionsPage() {
  const user = await getAuthUser()
  if (!user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  let admissions: Awaited<ReturnType<typeof getAdmissions>> = []
  let loadError: string | null = null
  try {
    admissions = await getAdmissions()
  } catch {
    loadError = 'Could not load admissions right now. Please refresh the page.'
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Admissions" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">Admissions</h1>
          <p className="text-sm text-gray-500">Applications submitted from the online admission form.</p>
        </div>

        {loadError && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
            {loadError}
          </p>
        )}

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {admissions.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-500">
                {loadError ? 'No admissions to show.' : 'No admission requests yet.'}
              </p>
            </div>
          ) : (
            <div>
              {admissions.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate text-gray-900">{a.student_name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {a.course} · {a.mobile} · {a.admission_id}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(a.created_at).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${STATUS_STYLES[a.status]}`}>
                      {a.status}
                    </span>
                    <AdmissionStatusForm id={a.id} status={a.status} />
                    <Link
                      href={`/admin/admissions/${a.id}`}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      View
                    </Link>
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