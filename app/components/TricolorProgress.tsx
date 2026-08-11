"use client";

import { useEffect, useState } from "react";

export function TricolorProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-900/30 backdrop-blur-xs pointer-events-none">
      <div
        className="h-full transition-all duration-75 ease-out shadow-sm relative"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
        }}
      >
        {/* Subtle Ashoka Chakra indicator at tip */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-white border border-[#000080] shadow-sm flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full border border-[#000080]" />
        </div>
      </div>
    </div>
  );
}
