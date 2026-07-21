import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { createJob } from '@/app/lib/action/jobs'
import { JobForm } from '../JobForm'
import { AdminSidebar } from '../../products/page'

export default async function NewJobPage() {
  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Jobs" />

      <main className="flex-1 p-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">New Job</h1>
          <p className="text-sm text-[#9B9BA3]">Add a new vacancy to the jobs page.</p>
        </div>

        <JobForm action={createJob} submitLabel="Create Job" />
      </main>
    </div>
  )
}