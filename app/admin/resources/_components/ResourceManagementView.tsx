"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  Download,
  Video,
  ExternalLink,
} from "lucide-react";
import type { DbResource } from "@/app/lib/action/resources";
import { deleteResource } from "@/app/lib/action/resources";
import { ConfirmDeleteModal } from "../../_components/ConfirmDeleteModal";

export function ResourceManagementView({ initialResources }: { initialResources: DbResource[] }) {
  const [resources, setResources] = useState<DbResource[]>(initialResources);
  const [query, setQuery] = useState("");
  const [deletingResource, setDeletingResource] = useState<DbResource | null>(null);
  const [isDeletingPending, startDeleteTransition] = useTransition();

  const filteredResources = resources.filter((r) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q)
    );
  });

  const totalDownloads = resources.reduce((sum, r) => sum + r.downloads, 0);
  const videoResources = resources.filter((r) => r.has_video).length;

  function handleDeleteConfirm() {
    if (!deletingResource) return;
    const targetId = deletingResource.id;

    startDeleteTransition(async () => {
      await deleteResource(targetId);
      setResources((prev) => prev.filter((r) => r.id !== targetId));
      setDeletingResource(null);
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#ea580c] rounded-full">
                Study &amp; Physical Vault
              </span>
              <span className="text-xs font-bold text-slate-500">
                • {resources.length} Materials
              </span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Study &amp; Physical Resources
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Manage syllabus PDFs, running charts, physical guidelines, and video lectures.
            </p>
          </div>
        </div>

        <Link
          href="/admin/resources/new"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] px-5 py-3 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shrink-0"
        >
          <PlusCircle size={18} />
          <span>Add New Resource</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400">Total Materials</span>
          <p className="text-xl font-black text-slate-900 mt-1">{resources.length}</p>
        </div>
        <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/80 shadow-sm">
          <span className="text-[10px] font-black uppercase text-emerald-700">Total Student Downloads</span>
          <p className="text-xl font-black text-emerald-900 mt-1">
            {totalDownloads.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-200/80 shadow-sm col-span-2 sm:col-span-1">
          <span className="text-[10px] font-black uppercase text-indigo-700">Video Tutorials</span>
          <p className="text-xl font-black text-indigo-900 mt-1">{videoResources}</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm max-w-md">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources by title or category..."
          className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Resources List View */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-orange-50/20 transition-colors"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                {resource.thumbnail_url ? (
                  <Image
                    src={resource.thumbnail_url}
                    alt={resource.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileText size={24} className="text-slate-400" />
                )}
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-black text-slate-900">
                    {resource.title}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#ea580c] text-[10px] font-black uppercase tracking-wider">
                    {resource.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                  <span>Published: {new Date(resource.publish_date).toLocaleDateString("en-IN")}</span>
                  {resource.has_video && (
                    <>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-blue-600 font-bold">
                        <Video size={13} />
                        Video Attached
                      </span>
                    </>
                  )}
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-700">
                    <Download size={13} className="text-[#ea580c]" />
                    {resource.downloads.toLocaleString("en-IN")} Downloads
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
              {resource.file_url && (
                <a
                  href={resource.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-extrabold text-[#ea580c] bg-orange-50 hover:bg-orange-100 transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>View PDF</span>
                </a>
              )}

              <Link
                href={`/admin/resources/${resource.id}/edit`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Pencil size={14} />
                <span>Edit</span>
              </Link>

              <button
                type="button"
                onClick={() => setDeletingResource(resource)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}

        {filteredResources.length === 0 && (
          <div className="py-14 text-center text-slate-500 font-semibold text-xs">
            No resources found.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingResource)}
        itemName={deletingResource?.title}
        isDeleting={isDeletingPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingResource(null)}
      />
    </div>
  );
}
