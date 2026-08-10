"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Pencil,
  Trash2,
  Users,
  Search,
  UserPlus,
  Eye,
  X,
  Phone,
  Building,
  Home,
  Bed,
  Tag,
  Hash,
  User,
  CheckCircle2,
} from "lucide-react";
import { deleteStudent, type Student } from "@/app/lib/action/students";
import { ConfirmDeleteModal } from "../../_components/ConfirmDeleteModal";

export function StudentTableView({ initialStudents }: { initialStudents: Student[] }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [query, setQuery] = useState("");
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [isDeletingPending, startDeleteTransition] = useTransition();

  const filtered = students.filter((s) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      (s.phone && s.phone.includes(q)) ||
      (s.admission_id && s.admission_id.toLowerCase().includes(q)) ||
      (s.batch && s.batch.toLowerCase().includes(q)) ||
      (s.hostels?.name && s.hostels.name.toLowerCase().includes(q))
    );
  });

  function handleDeleteConfirm() {
    if (!deletingStudent) return;
    const targetId = deletingStudent.id;

    startDeleteTransition(async () => {
      await deleteStudent(targetId);
      setStudents((prev) => prev.filter((s) => s.id !== targetId));
      setDeletingStudent(null);
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm shrink-0">
            <Users size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#ea580c] rounded-full">
                Hostel Management
              </span>
              <span className="text-xs font-bold text-slate-500">
                • {students.length} Total
              </span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Hostel Students Directory
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Hostel residents, room allocation, bed numbers, and batch details.
            </p>
          </div>
        </div>

        <Link
          href="/admin/students/new"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] px-5 py-3 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shrink-0"
        >
          <UserPlus size={18} />
          <span>Add New Student</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm max-w-md">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by student name, phone, hostel, room..."
          className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Mobile Card View (< md) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4 relative overflow-hidden"
          >
            <div className="h-1 w-full bg-gradient-to-r from-[#ea580c] via-amber-400 to-[#138808] absolute top-0 inset-x-0" />

            <div className="flex items-start justify-between gap-3 pt-1">
              <div>
                <h3 className="font-display text-base font-black text-slate-900">
                  {s.name}
                </h3>
                {s.father_name && (
                  <p className="text-xs text-slate-500 font-medium">S/O: {s.father_name}</p>
                )}
                {s.admission_id && (
                  <span className="inline-block mt-1 text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                    ID: {s.admission_id}
                  </span>
                )}
              </div>

              {s.hostels?.name && (
                <span className="px-3 py-1 rounded-full text-[11px] font-black bg-orange-50 text-[#ea580c] border border-orange-200 shrink-0">
                  {s.hostels.name}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100 font-semibold text-slate-700">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Room &amp; Bed
                </span>
                <span className="text-slate-900 font-bold">
                  {s.rooms?.room_number ? `Room ${s.rooms.room_number}` : "—"}
                  {s.bed_number ? ` (Bed ${s.bed_number})` : ""}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Batch
                </span>
                <span className="text-slate-900 font-bold">{s.batch ?? "—"}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-200/60">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Phone Number
                </span>
                <span className="font-mono text-slate-900 font-bold">{s.phone ?? "—"}</span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setViewingStudent(s)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <Eye size={14} className="text-[#ea580c]" />
                <span>View</span>
              </button>

              <Link
                href={`/admin/students/${s.id}/edit`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <Pencil size={14} className="text-blue-600" />
                <span>Edit</span>
              </Link>

              <button
                type="button"
                onClick={() => setDeletingStudent(s)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-500 font-semibold text-xs bg-white rounded-3xl border border-slate-200">
            No matching students found in directory.
          </div>
        )}
      </div>

      {/* Desktop Table View (>= md) */}
      <div className="hidden md:block bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto touch-pan-x scrollbar-thin">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
              <tr>
                <th className="px-5 py-3.5">Student Name</th>
                <th className="px-5 py-3.5">Hostel Name</th>
                <th className="px-5 py-3.5">Room &amp; Bed</th>
                <th className="px-5 py-3.5">Training Batch</th>
                <th className="px-5 py-3.5">Phone Number</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900">
                    <div>
                      <span className="text-sm text-slate-900 font-bold">{s.name}</span>
                      {s.father_name && (
                        <p className="text-[11px] font-normal text-slate-500">S/O: {s.father_name}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    {s.hostels?.name ? (
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-extrabold border border-slate-200 text-[11px]">
                        {s.hostels.name}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    {s.rooms?.room_number ? (
                      <span className="font-mono text-slate-900 font-bold">
                        Room {s.rooms.room_number} {s.bed_number ? `(Bed ${s.bed_number})` : ""}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    {s.batch ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-extrabold border border-amber-200 text-[11px]">
                        {s.batch}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-5 py-4 text-slate-700 font-mono">{s.phone ?? "—"}</td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setViewingStudent(s)}
                        className="p-2 rounded-xl text-slate-600 hover:bg-orange-50 hover:text-[#ea580c] transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>

                      <Link
                        href={`/admin/students/${s.id}/edit`}
                        className="p-2 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="Edit Student"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeletingStudent(s)}
                        className="p-2 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete Student"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-500 font-semibold">
                    No matching students found in directory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Popup Modal */}
      {viewingStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setViewingStudent(null)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#ea580c]">
                  <User size={18} />
                </div>
                <h3 className="font-display text-lg font-black text-slate-900">
                  Student Profile Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingStudent(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-100 space-y-1">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#ea580c]">
                  Full Name
                </p>
                <h4 className="font-display text-lg font-black text-slate-900">
                  {viewingStudent.name}
                </h4>
                {viewingStudent.father_name && (
                  <p className="text-slate-600 font-semibold">S/O: {viewingStudent.father_name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Admission ID
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {viewingStudent.admission_id || "N/A"}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Phone Number
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {viewingStudent.phone || "N/A"}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <Building size={14} className="text-[#ea580c]" />
                  <span>Hostel: {viewingStudent.hostels?.name || "Not assigned"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <Home size={14} className="text-blue-600" />
                  <span>
                    Room: {viewingStudent.rooms?.room_number ? `Room ${viewingStudent.rooms.room_number}` : "Not assigned"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <Bed size={14} className="text-amber-600" />
                  <span>Bed: {viewingStudent.bed_number ? `Bed #${viewingStudent.bed_number}` : "Not assigned"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <Tag size={14} className="text-emerald-600" />
                  <span>Batch: {viewingStudent.batch || "General Batch"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <Link
                href={`/admin/students/${viewingStudent.id}/edit`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#ea580c] hover:bg-[#c2410c] transition-colors cursor-pointer"
              >
                <Pencil size={14} />
                <span>Edit Student</span>
              </Link>
              <button
                type="button"
                onClick={() => setViewingStudent(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingStudent)}
        itemName={deletingStudent?.name}
        isDeleting={isDeletingPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingStudent(null)}
      />
    </div>
  );
}
