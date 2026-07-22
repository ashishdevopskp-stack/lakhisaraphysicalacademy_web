import { getHostels, getStudentById } from '@/app/lib/action/students'
import { AdminSidebar } from '../../../_components/AdminSidebar'
import { StudentForm } from '../../../_components/StudentForm'

export default async function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [hostels, student] = await Promise.all([getHostels(), getStudentById(id)])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Students" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full">
        <h1 className="text-2xl font-semibold mb-1">Edit Student</h1>
        <p className="text-sm text-gray-500 mb-6">{student.name}</p>
        <StudentForm mode="edit" student={student} hostels={hostels} />
      </main>
    </div>
  )
}