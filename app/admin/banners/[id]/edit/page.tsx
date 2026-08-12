import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Sliders, Link as LinkIcon, Type } from 'lucide-react'
import { createClient } from '@/app/lib/supabase/server'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getBannerById, updateBanner } from '@/app/lib/action/banners'
import { AdminSidebar } from '../../../_components/AdminSidebar'
import ThumbnailRatioSelector from '../../../_components/ThumbnailRatioSelector'

export default async function EditBannerPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams

  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const banner = await getBannerById(id)
  if (!banner) notFound()

  const updateBannerWithId = updateBanner.bind(null, banner.id)

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Home Page Manager" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-4xl w-full mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/admin/banners"
            className="inline-flex items-center gap-2 text-xs font-black text-slate-600 hover:text-slate-900 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm transition-all"
          >
            <ArrowLeft size={16} className="text-[#ea580c]" />
            <span>Back to Banners List</span>
          </Link>
          <span className="text-xs font-bold text-slate-500">Edit Banner Details</span>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-800">
            {error}
          </div>
        )}

        {/* Form Container */}
        <form
          action={updateBannerWithId}
          className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/80 shadow-lg space-y-6"
        >
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#ea580c] text-xs font-black mb-2">
              <Sparkles size={14} />
              <span>Edit Homepage Banner</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">Edit Banner (बैनर अपडेट करें)</h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Update image, tagline, links or display aspect ratio.
            </p>
          </div>

          {/* Banner Image & Aspect Ratio Selector */}
          <ThumbnailRatioSelector
            label="Banner Image & Aspect Ratio (बैनर इमेज एवं अनुपात)"
            defaultThumbnailUrl={banner.image_url}
            defaultAspectRatio={banner.aspect_ratio || '16:9'}
          />

          {/* Title & Subtitle */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="title" className="mb-1.5 block text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Type size={14} className="text-[#ea580c]" />
                <span>Banner Title (शीर्षक - optional):</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={banner.title || ''}
                placeholder="e.g. Bihar Police & Agniveer Physical Training 2026"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#ea580c] focus:bg-white focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <label htmlFor="subtitle" className="mb-1.5 block text-xs font-black text-slate-700 uppercase tracking-wider">
                <span>Banner Tagline / Subtitle (उप-शीर्षक - optional):</span>
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                defaultValue={banner.subtitle || ''}
                placeholder="e.g. 1600m Running, High Jump & Shot Put under expert military coaches"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#ea580c] focus:bg-white focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* Link URL & Button Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="linkUrl" className="mb-1.5 block text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <LinkIcon size={14} className="text-[#ea580c]" />
                <span>Click Target Link URL (लिंक - optional):</span>
              </label>
              <input
                id="linkUrl"
                name="linkUrl"
                type="text"
                defaultValue={banner.link_url || ''}
                placeholder="e.g. /courses or https://play.google.com/..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#ea580c] focus:bg-white focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <label htmlFor="buttonText" className="mb-1.5 block text-xs font-black text-slate-700 uppercase tracking-wider">
                <span>Button Label Text (बटन टेक्स्ट - optional):</span>
              </label>
              <input
                id="buttonText"
                name="buttonText"
                type="text"
                defaultValue={banner.button_text || ''}
                placeholder="e.g. Apply Now, Explore Courses"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#ea580c] focus:bg-white focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* Sort Order & Active Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label htmlFor="sortOrder" className="mb-1.5 block text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders size={14} className="text-[#ea580c]" />
                <span>Display Priority Order (क्रम संख्या):</span>
              </label>
              <input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={banner.sort_order ?? 1}
                min={0}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#ea580c] focus:bg-white"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  defaultChecked={banner.is_active}
                  className="w-5 h-5 rounded-lg text-[#ea580c] focus:ring-[#ea580c] border-slate-300 accent-[#ea580c] cursor-pointer"
                />
                <span className="text-xs font-black text-slate-800">
                  Active Banner (होम पेज पर तुरंत दिखाएँ)
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <Link
              href="/admin/banners"
              className="px-6 py-3 rounded-2xl border border-slate-200 text-xs font-extrabold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
            >
              Update Banner Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
