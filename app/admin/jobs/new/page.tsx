import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { createJob } from '@/app/lib/action/jobs'
import { JobForm } from '../JobForm'
import { AdminSidebar } from '../../_components/AdminSidebar'

export default async function NewJobPage() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Jobs" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-2xl w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">New Job</h1>
          <p className="text-sm text-gray-500">Add a new vacancy to the jobs page.</p>
        </div>

        <JobForm action={createJob} submitLabel="Create Job" />
      </main>
    </div>
  )
}