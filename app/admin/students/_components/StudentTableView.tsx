"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2, Users, Search, UserPlus } from "lucide-react";
import { deleteStudent, type Student } from "@/app/lib/action/students";
import { ConfirmDeleteModal } from "../../_components/ConfirmDeleteModal";

export function StudentTableView({ initialStudents }: { initialStudents: Student[] }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [query, setQuery] = useState("");
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [isDeletingPending, startDeleteTransition] = useTransition();

  const filtered = students.filter((s) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      (s.phone && s.phone.includes(q)) ||
      (s.admission_id && s.admission_id.toLowerCase().includes(q)) ||
      (s.batch && s.batch.toLowerCase().includes(q))
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm">
            <Users size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#ea580c] rounded-full">
                Hostel Management
              </span>
              <span className="text-xs font-bold text-slate-500">
                • {students.length} Registered Residents
              </span>
            </div>
            <h1 className="font-display text-2xl font-black text-slate-900 mt-0.5">
              Hostel Students Directory
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Hostel residents, room allocation, bed numbers, and batch details for Bhojan tokens.
            </p>
          </div>
        </div>

        <Link
          href="/admin/students/new"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] px-5 py-3 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
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
          placeholder="Search by student name, phone, admission ID, batch..."
          className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Table Card Container */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
              <tr>
                <th className="px-5 py-3.5">Student Name</th>
                <th className="px-5 py-3.5">Hostel Name</th>
                <th className="px-5 py-3.5">Room & Bed</th>
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
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/students/${s.id}/edit`}
                        className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-[#ea580c] transition-colors"
                        aria-label="Edit student"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeletingStudent(s)}
                        className="p-2 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                        aria-label="Delete student"
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
