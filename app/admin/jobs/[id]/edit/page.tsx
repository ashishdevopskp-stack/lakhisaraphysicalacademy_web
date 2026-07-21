import { notFound, redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getJob, updateJob } from '@/app/lib/action/jobs'
import { JobForm } from '../../JobForm'
import { AdminSidebar } from '../../../products/page'

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const job = await getJob(id)
  if (!job) notFound()

  const updateWithId = updateJob.bind(null, id)

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Jobs" />

      <main className="flex-1 p-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">Edit Job</h1>
          <p className="text-sm text-[#9B9BA3]">Update this vacancy&apos;s details.</p>
        </div>

        <JobForm action={updateWithId} submitLabel="Save Changes" initialData={job} />
      </main>
    </div>
  )
}