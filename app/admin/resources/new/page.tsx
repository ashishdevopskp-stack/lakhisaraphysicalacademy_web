import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { createResource } from '@/app/lib/action/resources'
import { ResourceForm } from '../ResourceForm'
import { AdminSidebar } from '../../products/page'

export default async function NewResourcePage() {
  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Resources" />

      <main className="flex-1 p-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">New Resource</h1>
          <p className="text-sm text-[#9B9BA3]">Add a new file or link to the resources page.</p>
        </div>

        <ResourceForm action={createResource} submitLabel="Create Resource" />
      </main>
    </div>
  )
}