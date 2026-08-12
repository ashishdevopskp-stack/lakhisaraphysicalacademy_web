"use client";

import { useState, useEffect, useRef, useCallback, TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { DbBanner } from "@/app/lib/action/banners";

export function getBannerAspectClass(aspectRatio?: string | null): string {
  switch (aspectRatio) {
    case "21:9":
      return "aspect-[21/9]";
    case "16:9":
      return "aspect-[16/9]";
    case "4:3":
      return "aspect-[4/3]";
    case "1:1":
      return "aspect-square max-h-[480px]";
    case "3:4":
      return "aspect-[3/4] max-h-[480px]";
    case "9:16":
      return "aspect-[9/16] max-h-[480px]";
    case "original":
      return "h-[240px] sm:h-[340px] md:h-[400px]";
    default:
      return "aspect-[16/9]";
  }
}

export default function BannerSlider({
  banners,
  className = "w-full my-6 sm:my-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto",
}: {
  banners: DbBanner[];
  className?: string;
}) {
  const activeBanners = banners.filter((b) => b.is_active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = activeBanners.length;

  const nextSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer
  useEffect(() => {
    if (total <= 1 || isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [total, isHovered, nextSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (total === 0) return null;

  const currentBanner = activeBanners[currentIndex];
  const aspectClass = getBannerAspectClass(currentBanner.aspect_ratio);

  return (
    <div className={className}>
      <div
        className="relative group overflow-hidden rounded-3xl bg-slate-950 border-2 border-[#D4AF37]/40 shadow-2xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Tactical Grid Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none z-10" />

        {/* Banner Slide Frame */}
        <div className={`relative w-full ${aspectClass} min-h-[220px] transition-all duration-500 overflow-hidden`}>
          {activeBanners.map((banner, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {/* Image */}
                <Image
                  src={banner.image_url}
                  alt={banner.title || "Lakhisarai Physical Academy Banner"}
                  fill
                  unoptimized
                  priority={idx === 0}
                  className="object-cover object-center"
                />

                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-8 md:p-10 max-w-2xl">
                  <div className="space-y-2 sm:space-y-3">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9933]/90 text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-md backdrop-blur-md">
                      <Sparkles size={13} />
                      <span>Lakhisarai Physical Academy</span>
                    </div>

                    {/* Title */}
                    {banner.title && (
                      <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
                        {banner.title}
                      </h2>
                    )}

                    {/* Subtitle */}
                    {banner.subtitle && (
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-200 line-clamp-2 leading-relaxed drop-shadow-md">
                        {banner.subtitle}
                      </p>
                    )}

                    {/* Button CTA */}
                    {banner.link_url && (
                      <div className="pt-2">
                        {banner.link_url.startsWith("http") ? (
                          <a
                            href={banner.link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-[#FF9933] to-amber-500 hover:from-amber-500 hover:to-[#FF9933] text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-orange-500/30 transition-all hover:scale-[1.03] active:scale-95"
                          >
                            <span>{banner.button_text || "Learn More"}</span>
                            <ArrowRight size={16} />
                          </a>
                        ) : (
                          <Link
                            href={banner.link_url}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-[#FF9933] to-amber-500 hover:from-amber-500 hover:to-[#FF9933] text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-orange-500/30 transition-all hover:scale-[1.03] active:scale-95"
                          >
                            <span>{banner.button_text || "Learn More"}</span>
                            <ArrowRight size={16} />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows (Shown when more than 1 banner) */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-slate-950/70 hover:bg-[#FF9933] text-white hover:text-slate-950 border border-white/20 hover:border-amber-400 backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 active:scale-90 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-slate-950/70 hover:bg-[#FF9933] text-white hover:text-slate-950 border border-white/20 hover:border-amber-400 backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 active:scale-90 cursor-pointer shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Pagination Indicators / Dots */}
            <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-6 bg-[#FF9933]"
                      : "w-2 bg-white/40 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
