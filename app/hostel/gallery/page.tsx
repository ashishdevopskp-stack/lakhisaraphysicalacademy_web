// app/hostel/gallery/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, BedDouble, Maximize2, X, Sparkles, CheckCircle2 } from "lucide-react";
import Container from "../../components/Container";
import { HostelSubNav } from "../_shared";

const HOSTEL_PHOTOS = [
  {
    id: "p1",
    title: "Official Hostel Campus Building",
    category: "Building Campus",
    src: "/hostel_building.jpg",
    desc: "Multi-storey modern hostel building near K.R.K Field, Lakhisarai ground with security & power backup.",
  },
  {
    id: "p2",
    title: "Student Rooms & Beds Layout",
    category: "Rooms & Beds",
    src: "/hostel_rooms.png",
    desc: "Clean ventilated rooms equipped with individual mattresses, ceiling fans, and built-in wall shelves.",
  },
];

export default function HostelGalleryPage() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section id="top" className="pb-8 pt-16 sm:pt-24 bg-gradient-to-b from-amber-500/10 via-white to-slate-50 border-b border-slate-200">
        <Container>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 text-[#ea580c] border border-orange-300 text-xs font-black mb-3">
            <Sparkles size={14} className="text-[#ea580c]" />
            <span>Real Campus Infrastructure</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Hostel <span className="text-[#ea580c]">Gallery &amp; Photos</span>
          </h1>

          <p className="mt-3 text-slate-600 font-medium text-sm sm:text-base max-w-2xl">
            Explore the authentic photos of Lakhisarai Physical Academy hostel building, student accommodation rooms, beds, and facilities.
          </p>

          <div className="mt-8">
            <HostelSubNav current="/hostel/gallery" />
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {HOSTEL_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                className="bento-card bento-card-saffron p-5 flex flex-col justify-between shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-900 mb-4 ring-2 ring-orange-500/20">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(min-width: 768px) 500px, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute top-3 left-3 px-3 py-1 bg-[#ea580c] text-white font-extrabold text-xs rounded-full shadow-md backdrop-blur-md">
                      {photo.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => setLightboxImage(photo.src)}
                      className="absolute top-3 right-3 p-2.5 rounded-full bg-slate-950/70 text-white backdrop-blur-md hover:bg-[#ea580c] transition-colors cursor-pointer shadow-lg"
                      title="Zoom Photo"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>

                  <h3 className="text-xl font-black text-slate-900">{photo.title}</h3>
                  <p className="text-xs font-medium text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {photo.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 text-[#138808]">
                    <CheckCircle2 size={15} /> Verified Academy Facility
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxImage(photo.src)}
                    className="text-[#ea580c] font-black hover:underline cursor-pointer"
                  >
                    View Full Photo →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2.5 rounded-full bg-white/20 text-white hover:bg-[#ea580c] transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={lightboxImage}
                alt="Enlarged Hostel View"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}