import { getStudents } from '@/app/lib/action/students'
import { getMealPlans } from '@/app/lib/action/tokens'
import { AdminSidebar } from '../../_components/AdminSidebar'
import { TokenSingleForm } from '../../_components/TokenSingleForm'

export default async function NewTokenPage() {
  const [students, mealPlans] = await Promise.all([getStudents(), getMealPlans()])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Bhojan Token" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full">
        <h1 className="text-2xl font-semibold mb-1">Generate Single Token</h1>
        <p className="text-sm text-gray-500 mb-6">Pick a student, meal plan and validity period.</p>
        <TokenSingleForm students={students} mealPlans={mealPlans} />
      </main>
    </div>
  )
}