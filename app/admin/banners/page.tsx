import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getBanners } from '@/app/lib/action/banners'
import { AdminSidebar } from '../_components/AdminSidebar'
import { BannerManagementView } from './_components/BannerManagementView'

export default async function AdminBannersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  let banners: Awaited<ReturnType<typeof getBanners>> = []
  try {
    banners = await getBanners()
  } catch {
    // fallback to empty
  }

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Home Page Manager" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-6xl w-full mx-auto space-y-6">
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-800">
            {error}
          </div>
        )}

        <BannerManagementView initialBanners={banners} />
      </main>
    </div>
  )
}
