import { AdminSidebar } from '../../_components/AdminSidebar'
import { TokenBulkForm } from '../../_components/TokenBulkForm'

export default async function BulkTokenPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Bhojan Token" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full">
        <h1 className="text-2xl font-semibold mb-1">Bulk Token Generation</h1>
        <p className="text-sm text-gray-500 mb-6">
          Generate a Bhojan token for every registered student in one go, then export all as a single PDF.
        </p>
        <TokenBulkForm />
      </main>
    </div>
  )
}