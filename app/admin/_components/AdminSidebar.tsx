'use client'

import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ClipboardList,
  LayoutDashboard, Package, ShoppingCart, FileText, Calendar,
  Award, BookOpen, Briefcase, PlayCircle, Menu, X, ChevronDown,
  Users, Utensils, Image as ImageIcon,
} from 'lucide-react'

type NavItem = {
  label: string
  href: string
  icon: React.ElementType
  children?: { label: string; href: string; icon?: React.ElementType }[]
}

const NAV: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  {
    label: 'Students', href: '/admin/students', icon: Users,
    children: [
      { label: 'All Students', href: '/admin/students' },
      { label: 'Add Student', href: '/admin/students/new' },
    ],
  },
  {
    label: 'Bhojan Token', href: '/admin/token', icon: Utensils,
    children: [
      { label: 'All Tokens', href: '/admin/token' },
      { label: 'Generate Single', href: '/admin/token/new' },
      { label: 'Bulk Generate', href: '/admin/token/bulk' },
    ],
  },
  {
    label: 'Products', href: '/admin/products', icon: Package,
    children: [
      { label: 'All Products', href: '/admin/products' },
      { label: 'Add Product', href: '/admin/products/new' },
    ],
  },
  {
    label: 'Orders', href: '/admin/orders', icon: ShoppingCart,
    children: [
      { label: 'All Orders', href: '/admin/orders' },
      { label: 'Pending', href: '/admin/orders?status=pending' },
    ],
  },
  {
    label: 'Blogs', href: '/admin/blogs', icon: FileText,
    children: [
      { label: 'All Blogs', href: '/admin/blogs' },
      { label: 'Add Blog', href: '/admin/blogs/new' },
    ],
  },
   { label: 'Admissions', href: '/admin/admissions', icon: ClipboardList },
  {
    label: 'Events', href: '/admin/events', icon: Calendar,
    children: [
      { label: 'All Events', href: '/admin/events' },
      { label: 'Add Event', href: '/admin/events/new' },
      { label: 'Gallery', href: '/admin/events/gallery', icon: ImageIcon },
    ],
  },
  {
    label: 'Results', href: '/admin/results', icon: Award,
    children: [
      { label: 'All Results', href: '/admin/results' },
      { label: 'Add Result', href: '/admin/results/new' },
    ],
  },
  {
    label: 'Resources', href: '/admin/resources', icon: BookOpen,
    children: [
      { label: 'All Resources', href: '/admin/resources' },
      { label: 'Add Resource', href: '/admin/resources/new' },
    ],
  },
  {
    label: 'Jobs', href: '/admin/jobs', icon: Briefcase,
    children: [
      { label: 'All Jobs', href: '/admin/jobs' },
      { label: 'Add Job', href: '/admin/jobs/new' },
    ],
  },
  {
    label: 'Videos', href: '/admin/videos', icon: PlayCircle,
    children: [
      { label: 'All Videos', href: '/admin/videos' },
      { label: 'Add Video', href: '/admin/videos/new' },
    ],
  },
]

function isActive(pathname: string, href: string) {
  const base = href.split('?')[0]
  return pathname === base || pathname.startsWith(base + '/')
}

/** Logo with a graceful text fallback if /logo.png is missing — never
 *  renders a broken-image icon, never trusts any external/user input. */
function BrandLogo() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
        LP
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Lakhisarai Physical Academy"
      width={36}
      height={36}
      className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-black/5"
      onError={() => setFailed(true)}
    />
  )
}

function BrandHeader() {
  return (
    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
      <BrandLogo />
      <div className="min-w-0">
        <p className="text-sm font-bold text-gray-900 leading-tight truncate">LAKHISARAI</p>
        <p className="text-[11px] text-gray-500 leading-tight truncate">Admin Panel</p>
      </div>
    </div>
  )
}

const SidebarContent = memo(function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const item of NAV) {
      if (item.children) initial[item.label] = isActive(pathname, item.href)
    }
    return initial
  })

  const toggleGroup = useCallback(
    (label: string) => setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] })),
    []
  )

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
      {NAV.map((item) => {
        const Icon = item.icon
        const active = isActive(pathname, item.href)

        if (!item.children) {
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={
                'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ' +
                (active
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900')
              }
            >
              <Icon
                size={18}
                className={'shrink-0 transition-colors ' + (active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600')}
              />
              {item.label}
            </Link>
          )
        }

        const open = openGroups[item.label]

        return (
          <div key={item.label}>
            <button
              type="button"
              onClick={() => toggleGroup(item.label)}
              aria-expanded={open}
              className={
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ' +
                (active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900')
              }
            >
              <Icon size={18} className={'shrink-0 ' + (active ? 'text-indigo-600' : 'text-gray-400')} />
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronDown
                size={16}
                className={'shrink-0 transition-transform duration-200 ' + (open ? 'rotate-180' : '')}
              />
            </button>

            {open && (
              <div className="mt-1 ml-[1.85rem] pl-3 border-l border-gray-200 space-y-0.5">
                {item.children.map((child) => {
                  const childActive = pathname === child.href.split('?')[0]
                  const ChildIcon = child.icon
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onNavigate}
                      className={
                        'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ' +
                        (childActive
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900')
                      }
                    >
                      {ChildIcon && <ChildIcon size={14} className="shrink-0" />}
                      {child.label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
})

export function AdminSidebar({ active }: { active?: string }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  // Lock background scroll and allow Escape to dismiss while the mobile
  // drawer is open — small UX/security-adjacent touch (avoids trapping
  // focus/scroll state in a way that could leave the page in a broken state).
  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen, closeMobile])

  const sidebarContent = useMemo(
    () => <SidebarContent pathname={pathname} onNavigate={closeMobile} />,
    [pathname, closeMobile]
  )

  return (
    <>
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <BrandLogo />
          <span className="text-sm font-semibold text-gray-900">Admin Panel</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-md hover:bg-gray-100 active:scale-95 transition-transform"
        >
          <Menu size={20} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] animate-[fadeIn_0.15s_ease-out]"
            onClick={closeMobile}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full flex flex-col shadow-xl animate-[slideIn_0.2s_ease-out]">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2 min-w-0">
                <BrandLogo />
                <span className="text-sm font-semibold text-gray-900 truncate">Admin Panel</span>
              </div>
              <button
                type="button"
                onClick={closeMobile}
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-gray-100 shrink-0"
              >
                <X size={20} />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 border-r border-gray-200 bg-white h-screen sticky top-0">
        <BrandHeader />
        {sidebarContent}
      </aside>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}