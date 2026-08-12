'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Plus,
  Image as ImageIcon,
  Edit2,
  Trash2,
  ExternalLink,
  Ratio,
  Eye,
  EyeOff,
  Sparkles,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { DbBanner, deleteBanner, toggleBannerStatus } from '@/app/lib/action/banners'
import { ConfirmDeleteModal } from '@/app/admin/_components/ConfirmDeleteModal'

export function BannerManagementView({ initialBanners }: { initialBanners: DbBanner[] }) {
  const [banners, setBanners] = useState<DbBanner[]>(initialBanners)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const bannerToDelete = banners.find((b) => b.id === deletingId)

  const handleToggleActive = async (banner: DbBanner) => {
    setTogglingId(banner.id)
    try {
      await toggleBannerStatus(banner.id, banner.is_active)
      setBanners((prev) =>
        prev.map((b) => (b.id === banner.id ? { ...b, is_active: !b.is_active } : b))
      )
    } catch (err) {
      console.error('Failed to toggle banner status:', err)
    } finally {
      setTogglingId(null)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingId) return
    setIsDeleting(true)
    try {
      await deleteBanner(deletingId)
      setBanners((prev) => prev.filter((b) => b.id !== deletingId))
    } catch (err) {
      console.error('Failed to delete banner:', err)
    } finally {
      setIsDeleting(false)
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-700 p-6 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black mb-2 text-white border border-white/30">
              <Sparkles size={14} className="text-amber-200" />
              <span>Home Page Slider Manager</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Home Page Banner Manager (होम पेज बैनर प्रबंधक)
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-amber-100 font-medium max-w-xl">
              Add, edit, reorder &amp; choose display ratios for sliding banners on the user homepage.
            </p>
          </div>

          <Link
            href="/admin/banners/new"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 font-black text-xs sm:text-sm shadow-lg hover:bg-amber-50 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <Plus size={18} className="text-[#ea580c]" />
            <span>Add New Banner (नया बैनर जोड़ें)</span>
          </Link>
        </div>
      </div>

      {/* Banners Grid */}
      {banners.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] mb-4">
            <ImageIcon size={32} />
          </div>
          <h3 className="text-lg font-black text-slate-800">No Banners Added Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 font-medium">
            Create your first sliding banner for the home page with custom aspect ratios, title, tagline and action links.
          </p>
          <Link
            href="/admin/banners/new"
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#ea580c] text-white text-xs font-black shadow-md hover:bg-orange-600 transition-colors"
          >
            <Plus size={16} />
            <span>Add First Banner</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`group relative overflow-hidden rounded-3xl bg-white border-2 transition-all duration-200 shadow-md flex flex-col justify-between ${
                banner.is_active
                  ? 'border-slate-200 hover:border-orange-400 hover:shadow-xl'
                  : 'border-slate-300/60 opacity-70 bg-slate-50'
              }`}
            >
              {/* Image Container with Aspect Ratio */}
              <div className="relative w-full bg-slate-900 overflow-hidden rounded-t-3xl min-h-[180px]">
                <Image
                  src={banner.image_url}
                  alt={banner.title || 'Banner'}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlays & Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

                {/* Status & Ratio Pills Top */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black border border-white/20 flex items-center gap-1">
                    <Ratio size={12} className="text-amber-400" />
                    <span>Ratio: {banner.aspect_ratio || '16:9'}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleActive(banner)}
                    disabled={togglingId === banner.id}
                    className={`px-3 py-1 rounded-full text-[10px] font-black backdrop-blur-md border transition-all cursor-pointer flex items-center gap-1.5 ${
                      banner.is_active
                        ? 'bg-emerald-500/90 text-white border-emerald-400'
                        : 'bg-slate-800/90 text-slate-300 border-slate-600'
                    }`}
                  >
                    {banner.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                    <span>{banner.is_active ? 'ACTIVE' : 'INACTIVE'}</span>
                  </button>
                </div>

                {/* Title Overlay inside Image if set */}
                <div className="absolute bottom-3 inset-x-3 z-10">
                  {banner.title && (
                    <h3 className="text-sm font-black text-white line-clamp-1 drop-shadow-md">
                      {banner.title}
                    </h3>
                  )}
                  {banner.subtitle && (
                    <p className="text-[11px] font-bold text-slate-200 line-clamp-1 drop-shadow-sm">
                      {banner.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Details & Action Panel */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>Order: #{banner.sort_order ?? index + 1}</span>
                    {banner.button_text && (
                      <span className="px-2 py-0.5 rounded-lg bg-orange-50 text-[#ea580c] font-black text-[10px]">
                        CTA: {banner.button_text}
                      </span>
                    )}
                  </div>

                  {banner.link_url ? (
                    <a
                      href={banner.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-extrabold text-[#ea580c] hover:underline flex items-center gap-1 truncate"
                    >
                      <ExternalLink size={12} className="shrink-0" />
                      <span className="truncate">{banner.link_url}</span>
                    </a>
                  ) : (
                    <p className="text-[11px] font-bold text-slate-400 italic">No link attached</p>
                  )}
                </div>

                {/* Bottom Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(banner)}
                    className="text-xs font-black text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    {banner.is_active ? 'Hide from homepage' : 'Show on homepage'}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/admin/banners/${banner.id}/edit`}
                      className="p-2 rounded-xl bg-orange-50 text-[#ea580c] hover:bg-orange-100 transition-colors"
                      title="Edit Banner"
                    >
                      <Edit2 size={15} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setDeletingId(banner.id)}
                      className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                      title="Delete Banner"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingId)}
        title="Delete Homepage Banner?"
        itemName={bannerToDelete?.title || 'this banner'}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  )
}
