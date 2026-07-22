import Link from 'next/link'
import { Plus, Pencil, Trash2, Users } from 'lucide-react'
import { getStudents, deleteStudent } from '@/app/lib/action/students'
import { AdminSidebar } from '../_components/AdminSidebar'
import { StatCard } from '../_components/StatCard'

export default async function StudentsPage() {
  const students = await getStudents()

  async function remove(formData: FormData) {
    'use server'
    await deleteStudent(String(formData.get('id')))
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Students" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Students</h1>
            <p className="text-sm text-gray-500">Hostel residents — room, bed and batch info used for Bhojan Tokens.</p>
          </div>
          <Link
            href="/admin/students/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
          >
            <Plus size={16} /> Add Student
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <StatCard label="Total Students" value={students.length} delta="registered" href="/admin/students" icon={Users} tint="indigo" />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Hostel</th>
                <th className="text-left px-4 py-3 font-medium">Room / Bed</th>
                <th className="text-left px-4 py-3 font-medium">Batch</th>
                <th className="text-left px-4 py-3 font-medium">Phone</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                  <td className="px-4 py-3 text-gray-600">{s.hostels?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {s.rooms?.room_number ?? '—'}{s.bed_number ? `-${s.bed_number}` : ''}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{s.batch ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{s.phone ?? '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/students/${s.id}/edit`}
                        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
                        aria-label="Edit"
                      >
                        <Pencil size={15} />
                      </Link>
                      <form action={remove}>
                        <input type="hidden" name="id" value={s.id} />
                        <button
                          type="submit"
                          className="p-2 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                    No students yet — add your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}