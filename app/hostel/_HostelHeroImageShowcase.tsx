"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, BedDouble, Maximize2, X, CheckCircle2 } from "lucide-react";

export function HostelHeroImageShowcase() {
  const [activeTab, setActiveTab] = useState<"building" | "rooms">("building");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const images = {
    building: {
      src: "/hostel_building.jpg",
      title: "Official Hostel Campus Building",
      tag: "Safe & Disciplined Stay",
      desc: "4-storey modern building located near K.R.K Field, Lakhisarai ground",
    },
    rooms: {
      src: "/hostel_rooms.png",
      title: "Clean Rooms, Beds & Shelves",
      tag: "Comfortable Accommodations",
      desc: "Ventilated rooms with individual beds, fans, and storage shelves",
    },
  };


  const active = images[activeTab];

  return (
    <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none space-y-4">
      {/* Glow effect behind photos */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[32px] opacity-70 blur-2xl"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(234,88,12,0.35), rgba(20,184,166,0.30), rgba(245,158,11,0.30))",
        }}
      />

      {/* Interactive Tabs */}
      <div className="flex items-center justify-center p-1.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab("building")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === "building"
              ? "bg-[#ea580c] text-white shadow-md shadow-orange-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Building2 size={15} />
          <span>Building Campus</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("rooms")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === "rooms"
              ? "bg-[#ea580c] text-white shadow-md shadow-orange-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <BedDouble size={15} />
          <span>Rooms &amp; Beds</span>
        </button>
      </div>

      {/* Main Active Photo Container */}
      <div className="group relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-3xl border-4 border-white shadow-2xl bg-slate-900">
        <Image
          src={active.src}
          alt={active.title}
          fill
          priority
          sizes="(min-width: 1024px) 460px, 90vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"
        />

        {/* Top-right Zoom Button */}
        <button
          type="button"
          onClick={() => setLightboxImage(active.src)}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-slate-950/70 text-white backdrop-blur-md hover:bg-[#ea580c] transition-colors cursor-pointer shadow-lg"
          title="Zoom Full Photo"
        >
          <Maximize2 size={16} />
        </button>

        {/* Bottom Photo Title Pill */}
        <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#ea580c] text-white rounded-full">
              {active.tag}
            </span>
          </div>
          <h3 className="font-display text-base sm:text-lg font-black text-white leading-tight">
            {active.title}
          </h3>
          <p className="text-xs font-semibold text-slate-300 line-clamp-1">
            {active.desc}
          </p>
        </div>
      </div>

      {/* Thumbnail Switcher Cards */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={() => setActiveTab("building")}
          className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all cursor-pointer bg-white shadow-sm ${
            activeTab === "building"
              ? "border-[#ea580c] ring-2 ring-orange-500/20"
              : "border-slate-200 opacity-70 hover:opacity-100"
          }`}
        >
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
            <Image
              src="/hostel-building-new.png"
              alt="Hostel Building"
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-slate-900 truncate">Building View</p>
            <p className="text-[10px] font-semibold text-slate-500 truncate">4-Storey Campus</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("rooms")}
          className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all cursor-pointer bg-white shadow-sm ${
            activeTab === "rooms"
              ? "border-[#ea580c] ring-2 ring-orange-500/20"
              : "border-slate-200 opacity-70 hover:opacity-100"
          }`}
        >
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
            <Image
              src="/hostel-rooms-new.png"
              alt="Hostel Rooms"
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-slate-900 truncate">Rooms &amp; Beds</p>
            <p className="text-[10px] font-semibold text-slate-500 truncate">Interior Collage</p>
          </div>
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md animate-in fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
            <Image
              src={lightboxImage}
              alt="Hostel full photo"
              fill
              className="object-contain"
            />
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-slate-900/80 text-white hover:bg-[#ea580c] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
