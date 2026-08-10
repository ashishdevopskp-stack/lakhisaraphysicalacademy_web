"use client";

import { useEffect, useState, useTransition, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  X,
  Loader2,
  User,
  Phone,
  Building,
  Home,
  Bed,
  Tag,
  Hash,
  Save,
  UserPlus,
} from "lucide-react";
import {
  createStudent,
  updateStudent,
  createHostel,
  createRoom,
  getRoomsByHostel,
  getBedNumbersByRoom,
  type Student,
  type Hostel,
  type Room,
} from "@/app/lib/action/students";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 disabled:bg-slate-100 disabled:text-slate-400";
const iconBtnClass =
  "p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-orange-50 hover:text-[#ea580c] hover:border-orange-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0";
const smallPrimaryBtnClass =
  "px-4 py-2.5 rounded-2xl bg-[#ea580c] text-white text-xs font-extrabold hover:bg-[#c2410c] disabled:opacity-60 whitespace-nowrap cursor-pointer shadow-md";

export function StudentForm({
  mode,
  student,
  hostels: initialHostels,
}: {
  mode: "new" | "edit";
  student?: Student;
  hostels: Hostel[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [hostels, setHostels] = useState<Hostel[]>(initialHostels);
  const [hostelId, setHostelId] = useState(student?.hostel_id ?? "");
  const [addingHostel, setAddingHostel] = useState(false);
  const [newHostelName, setNewHostelName] = useState("");
  const [savingHostel, setSavingHostel] = useState(false);

  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState(student?.room_id ?? "");
  const [addingRoom, setAddingRoom] = useState(false);
  const [newRoomNumber, setNewRoomNumber] = useState("");
  const [savingRoom, setSavingRoom] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const [bedNumbers, setBedNumbers] = useState<string[]>([]);
  const [bedNumber, setBedNumber] = useState(student?.bed_number ?? "");
  const [addingBed, setAddingBed] = useState(false);
  const [newBedNumber, setNewBedNumber] = useState("");

  useEffect(() => {
    if (!hostelId) {
      setRooms([]);
      return;
    }
    setLoadingRooms(true);
    getRoomsByHostel(hostelId)
      .then(setRooms)
      .finally(() => setLoadingRooms(false));
  }, [hostelId]);

  useEffect(() => {
    if (!roomId) {
      setBedNumbers([]);
      return;
    }
    getBedNumbersByRoom(roomId, student?.id).then(setBedNumbers);
  }, [roomId, student?.id]);

  async function handleAddHostel() {
    if (!newHostelName.trim()) return;
    setSavingHostel(true);
    setError(null);
    try {
      const created = await createHostel(newHostelName);
      setHostels((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
      setHostelId(created.id);
      setNewHostelName("");
      setAddingHostel(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add hostel");
    } finally {
      setSavingHostel(false);
    }
  }

  async function handleAddRoom() {
    if (!newRoomNumber.trim() || !hostelId) return;
    setSavingRoom(true);
    setError(null);
    try {
      const created = await createRoom(hostelId, newRoomNumber);
      setRooms((prev) =>
        [...prev, created].sort((a, b) => a.room_number.localeCompare(b.room_number))
      );
      setRoomId(created.id);
      setNewRoomNumber("");
      setAddingRoom(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add room");
    } finally {
      setSavingRoom(false);
    }
  }

  function handleAddBed() {
    if (!newBedNumber.trim()) return;
    const value = newBedNumber.trim();
    setBedNumber(value);
    setBedNumbers((prev) => Array.from(new Set([...prev, value])));
    setNewBedNumber("");
    setAddingBed(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.set("hostel_id", hostelId);
    formData.set("room_id", roomId);
    formData.set("bed_number", bedNumber);

    startTransition(async () => {
      try {
        if (mode === "new") {
          await createStudent(formData);
        } else if (student) {
          await updateStudent(student.id, formData);
        }
        router.push("/admin/students");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xl shadow-slate-900/5 max-w-3xl"
    >
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50/90 p-4 text-xs font-semibold text-red-800">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" icon={User} required>
          <input
            name="name"
            defaultValue={student?.name}
            required
            placeholder="e.g. Amit Kumar"
            className={inputClass}
          />
        </Field>

        <Field label="Father's Name" icon={User}>
          <input
            name="father_name"
            defaultValue={student?.father_name ?? ""}
            placeholder="e.g. Ramesh Prasad"
            className={inputClass}
          />
        </Field>

        <Field label="Admission ID" icon={Hash}>
          <input
            name="admission_id"
            defaultValue={student?.admission_id ?? ""}
            placeholder="e.g. LPA-2026-089"
            className={inputClass}
          />
        </Field>

        <Field label="Phone Number" icon={Phone}>
          <input
            name="phone"
            defaultValue={student?.phone ?? ""}
            placeholder="10-digit mobile number"
            className={inputClass}
          />
        </Field>

        <Field label="Hostel Building" icon={Building}>
          {!addingHostel ? (
            <div className="flex gap-2">
              <select
                value={hostelId}
                onChange={(e) => {
                  setHostelId(e.target.value);
                  setRoomId("");
                  setBedNumber("");
                }}
                className={inputClass}
              >
                <option value="">Select hostel building</option>
                {hostels.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setAddingHostel(true)}
                className={iconBtnClass}
                aria-label="Add hostel"
              >
                <Plus size={18} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                autoFocus
                value={newHostelName}
                onChange={(e) => setNewHostelName(e.target.value)}
                placeholder="New hostel building name"
                className={inputClass}
              />
              <button
                type="button"
                onClick={handleAddHostel}
                disabled={savingHostel}
                className={smallPrimaryBtnClass}
              >
                {savingHostel ? <Loader2 size={14} className="animate-spin" /> : "Add"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddingHostel(false);
                  setNewHostelName("");
                }}
                className={iconBtnClass}
                aria-label="Cancel"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </Field>

        <Field label="Room Number" icon={Home}>
          {!addingRoom ? (
            <div className="flex gap-2">
              <select
                value={roomId}
                onChange={(e) => {
                  setRoomId(e.target.value);
                  setBedNumber("");
                }}
                disabled={!hostelId || loadingRooms}
                className={inputClass}
              >
                <option value="">
                  {hostelId ? "Select room" : "Select hostel first"}
                </option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    Room {r.room_number}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setAddingRoom(true)}
                disabled={!hostelId}
                className={iconBtnClass}
                aria-label="Add room"
              >
                <Plus size={18} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                autoFocus
                value={newRoomNumber}
                onChange={(e) => setNewRoomNumber(e.target.value)}
                placeholder="e.g. 104"
                className={inputClass}
              />
              <button
                type="button"
                onClick={handleAddRoom}
                disabled={savingRoom}
                className={smallPrimaryBtnClass}
              >
                {savingRoom ? <Loader2 size={14} className="animate-spin" /> : "Add"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddingRoom(false);
                  setNewRoomNumber("");
                }}
                className={iconBtnClass}
                aria-label="Cancel"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </Field>

        <Field label="Bed Number" icon={Bed}>
          {!addingBed ? (
            <div className="flex gap-2">
              <select
                value={bedNumber}
                onChange={(e) => setBedNumber(e.target.value)}
                disabled={!roomId}
                className={inputClass}
              >
                <option value="">
                  {roomId ? "Select bed number" : "Select room first"}
                </option>
                {bedNumbers.map((b) => (
                  <option key={b} value={b}>
                    Bed #{b}
                  </option>
                ))}
                {bedNumber && !bedNumbers.includes(bedNumber) && (
                  <option value={bedNumber}>Bed #{bedNumber}</option>
                )}
              </select>
              <button
                type="button"
                onClick={() => setAddingBed(true)}
                disabled={!roomId}
                className={iconBtnClass}
                aria-label="Add bed number"
              >
                <Plus size={18} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                autoFocus
                value={newBedNumber}
                onChange={(e) => setNewBedNumber(e.target.value)}
                placeholder="e.g. B1"
                className={inputClass}
              />
              <button type="button" onClick={handleAddBed} className={smallPrimaryBtnClass}>
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddingBed(false);
                  setNewBedNumber("");
                }}
                className={iconBtnClass}
                aria-label="Cancel"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </Field>

        <Field label="Training Batch" icon={Tag}>
          <input
            name="batch"
            defaultValue={student?.batch ?? ""}
            placeholder="e.g. Morning Physical Training"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] py-3.5 px-6 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          {isPending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          <span>{mode === "new" ? "Add Student Resident" : "Save Changes"}</span>
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/students")}
          className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  icon: Icon,
  required,
  children,
}: {
  label: string;
  icon?: React.ElementType;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-700">
        {Icon && <Icon size={14} className="text-[#ea580c]" />}
        <span>{label}</span>
        {required && <span className="text-orange-500">*</span>}
      </label>
      {children}
    </div>
  );
}