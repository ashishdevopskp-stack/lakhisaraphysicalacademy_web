import { getHostels } from '@/app/lib/action/students'
import { AdminSidebar } from '../../_components/AdminSidebar'
import { StudentForm } from '../../_components/StudentForm'

export default async function NewStudentPage() {
  const hostels = await getHostels()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Students" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full">
        <h1 className="text-2xl font-semibold mb-1">Add Student</h1>
        <p className="text-sm text-gray-500 mb-6">Add a new hostel resident.</p>
        <StudentForm mode="new" hostels={hostels} />
      </main>
    </div>
  )
}