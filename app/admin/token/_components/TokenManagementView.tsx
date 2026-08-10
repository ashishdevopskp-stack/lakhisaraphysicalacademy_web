"use client";

import { useState, useRef, useTransition } from "react";
import Link from "next/link";
import {
  Utensils,
  Plus,
  Layers,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Download,
  Trash2,
  Printer,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";
import type { TokenRow } from "@/app/lib/action/tokens";
import { cancelToken, deleteToken } from "@/app/lib/action/tokens";
import { ConfirmDeleteModal } from "../../_components/ConfirmDeleteModal";
import { TokenCard, type TokenCardData } from "../../_components/TokenCard";

const STATUS_STYLE: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold",
  used: "bg-slate-100 text-slate-700 border-slate-300 font-bold",
  expired: "bg-amber-100 text-amber-900 border-amber-300 font-bold",
  cancelled: "bg-red-100 text-red-900 border-red-300 font-bold",
};

export function TokenManagementView({
  initialTokens,
  stats,
}: {
  initialTokens: TokenRow[];
  stats: { total: number; active: number; expired: number; cancelled: number };
}) {
  const [tokens, setTokens] = useState<TokenRow[]>(initialTokens);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // View / Print modal state
  const [viewingTokenCard, setViewingTokenCard] = useState<TokenCardData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const modalCardRef = useRef<HTMLDivElement>(null);

  // Delete modal state
  const [deletingToken, setDeletingToken] = useState<TokenRow | null>(null);
  const [isDeletingPending, startDeleteTransition] = useTransition();
  const [isCancellingPending, startCancelTransition] = useTransition();

  const filteredTokens = tokens.filter((t) => {
    const studentName = t.students?.name ?? t.manual_name ?? "";
    const hostelName = t.students?.hostels?.name ?? t.manual_hostel_name ?? "";
    const roomNumber = t.students?.rooms?.room_number ?? t.manual_room_number ?? "";

    if (statusFilter !== "all" && t.status !== statusFilter) return false;

    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      studentName.toLowerCase().includes(q) ||
      hostelName.toLowerCase().includes(q) ||
      roomNumber.toString().includes(q) ||
      t.serial_number.includes(q) ||
      t.token_number.toString().includes(q)
    );
  });

  function getTokenCardData(t: TokenRow): TokenCardData {
    const hostelName = t.students?.hostels?.name ?? t.manual_hostel_name ?? "Hostel";
    const roomNumber = t.students?.rooms?.room_number ?? t.manual_room_number ?? "—";
    const bedNumber = t.students?.bed_number ?? t.manual_bed_number ?? null;
    const studentName = t.students?.name ?? t.manual_name ?? "—";

    return {
      tokenNo: String(t.token_number).padStart(2, "0"),
      serial: t.serial_number,
      issueDate: new Date(t.date_of_allotment).toLocaleDateString("en-GB"),
      expiryDate: new Date(t.expiry_date).toLocaleDateString("en-GB"),
      studentName,
      hostelName,
      roomNumber,
      bedNumber,
      slots: t.selected_slots ?? [],
    };
  }

  function handleCancelToken(id: string) {
    startCancelTransition(async () => {
      await cancelToken(id);
      setTokens((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: "cancelled" } : t))
      );
    });
  }

  function handleDeleteConfirm() {
    if (!deletingToken) return;
    const targetId = deletingToken.id;

    startDeleteTransition(async () => {
      await deleteToken(targetId);
      setTokens((prev) => prev.filter((t) => t.id !== targetId));
      setDeletingToken(null);
    });
  }

  async function downloadTokenImage() {
    if (!modalCardRef.current) return;
    setIsDownloading(true);
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const canvas = await html2canvas(modalCardRef.current, {
        scale: 3,
        backgroundColor: "#fdf6ee",
      });
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `bhojan-token-${viewingTokenCard?.serial || "pass"}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }, "image/png");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm shrink-0">
            <Utensils size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#ea580c] rounded-full">
                Mess Management
              </span>
              <span className="text-xs font-bold text-slate-500">
                • {stats.total} Tokens Generated
              </span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Bhojan Mess Tokens
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Manage, print, void, and generate meal pass tokens for hostel residents.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/token/new"
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Single Token</span>
          </Link>
          <Link
            href="/admin/token/bulk"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <Layers size={16} />
            <span>Bulk Generate</span>
          </Link>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400">Total Issued</span>
          <p className="text-xl font-black text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/80 shadow-sm">
          <span className="text-[10px] font-black uppercase text-emerald-700">Active Valid</span>
          <p className="text-xl font-black text-emerald-900 mt-1">{stats.active}</p>
        </div>
        <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 shadow-sm">
          <span className="text-[10px] font-black uppercase text-amber-700">Expired</span>
          <p className="text-xl font-black text-amber-900 mt-1">{stats.expired}</p>
        </div>
        <div className="bg-red-50/50 p-4 rounded-2xl border border-red-200/80 shadow-sm">
          <span className="text-[10px] font-black uppercase text-red-700">Cancelled/Void</span>
          <p className="text-xl font-black text-red-900 mt-1">{stats.cancelled}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm max-w-md w-full">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by student name, serial #, hostel..."
            className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {["all", "active", "expired", "cancelled"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-2 text-xs font-extrabold rounded-full border transition-all whitespace-nowrap capitalize cursor-pointer ${
                statusFilter === tab
                  ? "bg-[#ea580c] text-white border-[#ea580c] shadow-md shadow-orange-500/20"
                  : "bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:text-[#ea580c]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Card List View (< md) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredTokens.map((t) => {
          const card = getTokenCardData(t);
          return (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4 relative overflow-hidden"
            >
              <div className="h-1 w-full bg-gradient-to-r from-[#ea580c] via-amber-400 to-[#138808] absolute top-0 inset-x-0" />

              <div className="flex items-start justify-between gap-3 pt-1">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    S/N {t.serial_number} • TOKEN #{card.tokenNo}
                  </span>
                  <h3 className="font-display text-base font-black text-slate-900">
                    {card.studentName}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600">
                    {card.hostelName} • Room {card.roomNumber}
                    {card.bedNumber ? `-${card.bedNumber}` : ""}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${
                    STATUS_STYLE[t.status]
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100 font-semibold text-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">
                    Valid From
                  </span>
                  <span className="text-slate-900 font-bold">{card.issueDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">
                    Valid Till
                  </span>
                  <span className="text-slate-900 font-bold">{card.expiryDate}</span>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setViewingTokenCard(card)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <Eye size={14} className="text-[#ea580c]" />
                  <span>View / Print</span>
                </button>

                {t.status === "active" && (
                  <button
                    type="button"
                    onClick={() => handleCancelToken(t.id)}
                    disabled={isCancellingPending}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    <XCircle size={14} />
                    <span>Void</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setDeletingToken(t)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredTokens.length === 0 && (
          <div className="py-12 text-center text-slate-500 font-semibold text-xs bg-white rounded-3xl border border-slate-200">
            No matching Bhojan tokens found.
          </div>
        )}
      </div>

      {/* Desktop Table View (>= md) */}
      <div className="hidden md:block bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto touch-pan-x scrollbar-thin">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
              <tr>
                <th className="px-5 py-3.5">Token #</th>
                <th className="px-5 py-3.5">Student Name</th>
                <th className="px-5 py-3.5">Hostel &amp; Room</th>
                <th className="px-5 py-3.5">Valid From</th>
                <th className="px-5 py-3.5">Valid Till</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
              {filteredTokens.map((t) => {
                const card = getTokenCardData(t);

                return (
                  <tr key={t.id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="px-5 py-4 font-mono font-extrabold text-slate-900">
                      #{card.tokenNo}
                      <span className="text-slate-400 font-normal ml-1">· S/N {card.serial}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-900 font-bold">{card.studentName}</td>
                    <td className="px-5 py-4 text-slate-700">
                      {card.hostelName} · Room {card.roomNumber}
                      {card.bedNumber ? `-${card.bedNumber}` : ""}
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-700">{card.issueDate}</td>
                    <td className="px-5 py-4 font-mono text-slate-700">{card.expiryDate}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${
                          STATUS_STYLE[t.status]
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setViewingTokenCard(card)}
                          className="p-2 rounded-xl text-slate-600 hover:bg-orange-50 hover:text-[#ea580c] transition-colors cursor-pointer"
                          title="View & Download Token Card"
                        >
                          <Eye size={16} />
                        </button>

                        {t.status === "active" && (
                          <button
                            type="button"
                            onClick={() => handleCancelToken(t.id)}
                            disabled={isCancellingPending}
                            className="p-2 rounded-xl text-slate-500 hover:bg-amber-50 hover:text-amber-600 transition-colors cursor-pointer"
                            title="Void Token"
                          >
                            <XCircle size={16} />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setDeletingToken(t)}
                          className="p-2 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Token"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredTokens.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-500 font-semibold">
                    No matching tokens found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Token Card View / Download Modal */}
      {viewingTokenCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setViewingTokenCard(null)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#ea580c]" />
                <h3 className="font-display text-base font-black text-slate-900">
                  Bhojan Token Pass Card
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingTokenCard(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Live Token Card Render */}
            <div className="flex justify-center bg-slate-100/70 p-4 rounded-2xl border border-slate-200 overflow-x-auto">
              <div ref={modalCardRef} className="shrink-0 scale-90 sm:scale-100 origin-top">
                <TokenCard data={viewingTokenCard} />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={downloadTokenImage}
                disabled={isDownloading}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] hover:shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
              >
                {isDownloading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                <span>Download PNG Token</span>
              </button>

              <button
                type="button"
                onClick={() => setViewingTokenCard(null)}
                className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingToken)}
        itemName={deletingToken ? `Bhojan Token #${deletingToken.token_number} (S/N ${deletingToken.serial_number})` : ""}
        isDeleting={isDeletingPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingToken(null)}
      />
    </div>
  );
}
