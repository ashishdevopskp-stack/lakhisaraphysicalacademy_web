"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Calendar,
  Plus,
  Pencil,
  Trash2,
  Search,
  MapPin,
  Image as ImageIcon,
  Tag,
} from "lucide-react";
import type { DbEvent } from "@/app/lib/action/events";
import { deleteEvent } from "@/app/lib/action/events";
import { ConfirmDeleteModal } from "../../_components/ConfirmDeleteModal";

const EVENT_STATUS_STYLES: Record<string, string> = {
  Open: "bg-emerald-100 text-emerald-900 border border-emerald-300 font-black",
  Closed: "bg-slate-100 text-slate-700 border border-slate-300 font-semibold",
};

export function EventManagementView({ initialEvents }: { initialEvents: DbEvent[] }) {
  const [events, setEvents] = useState<DbEvent[]>(initialEvents);
  const [query, setQuery] = useState("");
  const [deletingEvent, setDeletingEvent] = useState<DbEvent | null>(null);
  const [isDeletingPending, startDeleteTransition] = useTransition();

  const filteredEvents = events.filter((e) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      e.title.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q)
    );
  });

  function handleDeleteConfirm() {
    if (!deletingEvent) return;
    const targetId = deletingEvent.id;

    startDeleteTransition(async () => {
      await deleteEvent(targetId);
      setEvents((prev) => prev.filter((e) => e.id !== targetId));
      setDeletingEvent(null);
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm shrink-0">
            <Calendar size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#ea580c] rounded-full">
                Events Studio
              </span>
              <span className="text-xs font-bold text-slate-500">
                • {events.length} Scheduled Events
              </span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Academy Events &amp; Tournaments
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Manage time trials, physical trials, medical camps, and championship events.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/events/gallery"
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ImageIcon size={16} />
            <span>Gallery</span>
          </Link>
          <Link
            href="/admin/events/new"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Event</span>
          </Link>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm max-w-md">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by event title, category, venue..."
          className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Events Items List */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-orange-50/20 transition-colors"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 text-[#ea580c]">
                <Calendar size={22} />
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-black text-slate-900">
                    {event.title}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#ea580c] text-[10px] font-black uppercase tracking-wider">
                    {event.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-slate-400" />
                    {event.venue}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold text-slate-800">
                    <Calendar size={13} className="text-[#ea580c]" />
                    {event.event_date} {event.time_label ? `(${event.time_label})` : ""}
                  </span>

                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
              <span
                className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
                  EVENT_STATUS_STYLES[event.status] ?? EVENT_STATUS_STYLES.Closed
                }`}
              >
                {event.status}
              </span>

              <Link
                href={`/admin/events/${event.id}/edit`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Pencil size={14} />
                <span>Edit</span>
              </Link>

              <button
                type="button"
                onClick={() => setDeletingEvent(event)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="py-14 text-center text-slate-500 font-semibold text-xs">
            No events found.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingEvent)}
        itemName={deletingEvent?.title}
        isDeleting={isDeletingPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingEvent(null)}
      />
    </div>
  );
}
