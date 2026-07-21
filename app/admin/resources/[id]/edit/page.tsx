import { notFound, redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getResource, updateResource } from '@/app/lib/action/resources'
import { ResourceForm } from '../../ResourceForm'
import { AdminSidebar } from '../../../products/page'

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const resource = await getResource(id)
  if (!resource) notFound()

  const updateWithId = updateResource.bind(null, id)

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Resources" />

      <main className="flex-1 p-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">Edit Resource</h1>
          <p className="text-sm text-[#9B9BA3]">Update this resource&apos;s details.</p>
        </div>

        <ResourceForm action={updateWithId} submitLabel="Save Changes" initialData={resource} />
      </main>
    </div>
  )
}