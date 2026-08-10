import { AdminSidebar } from "./_components/AdminSidebar";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full animate-pulse">
        {/* Top Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="space-y-2">
            <div className="h-7 w-48 bg-slate-200 rounded-lg" />
            <div className="h-4 w-72 bg-slate-200 rounded-md" />
          </div>
          <div className="h-10 w-36 bg-slate-200 rounded-xl" />
        </div>

        {/* Stat Cards Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <div className="h-24 bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-6 w-12 bg-slate-300 rounded" />
          </div>
          <div className="h-24 bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-6 w-12 bg-slate-300 rounded" />
          </div>
          <div className="h-24 bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-6 w-12 bg-slate-300 rounded" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4 shadow-sm">
          <div className="h-5 w-full bg-slate-100 rounded-lg" />
          <div className="h-12 w-full bg-slate-50 rounded-xl" />
          <div className="h-12 w-full bg-slate-50 rounded-xl" />
          <div className="h-12 w-full bg-slate-50 rounded-xl" />
          <div className="h-12 w-full bg-slate-50 rounded-xl" />
        </div>
      </main>
    </div>
  );
}
