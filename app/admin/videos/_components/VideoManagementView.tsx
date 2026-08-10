"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Video,
  Plus,
  Pencil,
  Trash2,
  Search,
  PlayCircle,
  ExternalLink,
  Star,
  Calendar,
} from "lucide-react";
import type { DbVideo } from "@/app/lib/action/videos";
import { deleteVideo } from "@/app/lib/action/videos";
import { ConfirmDeleteModal } from "../../_components/ConfirmDeleteModal";

const STATUS_BADGE: Record<string, string> = {
  Published: "bg-emerald-100 text-emerald-900 border border-emerald-300 font-black",
  Draft: "bg-slate-100 text-slate-700 border border-slate-300 font-semibold",
};

export function VideoManagementView({ initialVideos }: { initialVideos: DbVideo[] }) {
  const [videos, setVideos] = useState<DbVideo[]>(initialVideos);
  const [query, setQuery] = useState("");
  const [deletingVideo, setDeletingVideo] = useState<DbVideo | null>(null);
  const [isDeletingPending, startDeleteTransition] = useTransition();

  const filteredVideos = videos.filter((v) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q)
    );
  });

  function handleDeleteConfirm() {
    if (!deletingVideo) return;
    const targetId = deletingVideo.id;

    startDeleteTransition(async () => {
      await deleteVideo(targetId);
      setVideos((prev) => prev.filter((v) => v.id !== targetId));
      setDeletingVideo(null);
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm shrink-0">
            <Video size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#ea580c] rounded-full">
                Video Gallery Studio
              </span>
              <span className="text-xs font-bold text-slate-500">
                • {videos.length} YouTube / Physical Videos
              </span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Video Lectures &amp; Physical Demos
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Manage YouTube physical practice videos, high jump demos, and training lectures.
            </p>
          </div>
        </div>

        <Link
          href="/admin/videos/new"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] px-5 py-3 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Add New Video</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm max-w-md">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by video title or category..."
          className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Videos List Container */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-orange-50/20 transition-colors"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-sm relative group">
                {video.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PlayCircle size={26} className="text-slate-400" />
                )}
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-black text-slate-900">
                    {video.title}
                  </h3>
                  {video.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <Star size={10} className="fill-amber-500 text-amber-500" />
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#ea580c] text-[10px] font-black uppercase tracking-wider">
                    {video.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Calendar size={13} className="text-slate-400" />
                    {new Date(video.publish_date).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
              <span
                className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
                  STATUS_BADGE[video.status] ?? STATUS_BADGE.Draft
                }`}
              >
                {video.status}
              </span>

              <a
                href={video.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#ea580c] bg-orange-50 hover:bg-orange-100 transition-colors"
              >
                <ExternalLink size={14} />
                <span>Watch</span>
              </a>

              <Link
                href={`/admin/videos/${video.id}/edit`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Pencil size={14} />
                <span>Edit</span>
              </Link>

              <button
                type="button"
                onClick={() => setDeletingVideo(video)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}

        {filteredVideos.length === 0 && (
          <div className="py-14 text-center text-slate-500 font-semibold text-xs">
            No videos found.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingVideo)}
        itemName={deletingVideo?.title}
        isDeleting={isDeletingPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingVideo(null)}
      />
    </div>
  );
}
