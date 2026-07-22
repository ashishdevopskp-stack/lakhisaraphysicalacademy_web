import { notFound, redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getResource, updateResource } from '@/app/lib/action/resources'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../../../_components/AdminSidebar'
import { ResourceForm } from '../../ResourceForm'

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const resource = await getResource(id)
  if (!resource) notFound()

  const updateWithId = updateResource.bind(null, id)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Resources" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-2xl w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">Edit Resource</h1>
          <p className="text-sm text-gray-500">Update this resource&apos;s details.</p>
        </div>

        <ResourceForm action={updateWithId} submitLabel="Save Changes" initialData={resource} />
      </main>
    </div>
  )
}