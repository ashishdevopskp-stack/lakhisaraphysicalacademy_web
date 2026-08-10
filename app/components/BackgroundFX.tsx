"use client";

import { useEffect, useRef } from "react";

export default function BackgroundFX() {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let ctx: any;
    let cancelled = false;

    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;
      const root = document.documentElement;
      const body = document.body;
      root.setAttribute("data-gsap-bg", "active");

      ctx = gsap.context(() => {
        // Floating liquid golden amber blob 1
        gsap.to(body, {
          "--blob1-x": "45%",
          "--blob1-y": "12%",
          duration: 12,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Floating soft liquid saffron blob 2
        gsap.to(body, {
          "--blob2-x": "85%",
          "--blob2-y": "40%",
          duration: 16,
          delay: 0.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Floating liquid emerald mint blob 3
        gsap.to(body, {
          "--blob3-x": "15%",
          "--blob3-y": "78%",
          duration: 20,
          delay: 1.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Liquid float cards levitation physics
        const floaters = gsap.utils.toArray<HTMLElement>(".liquid-glass, .float-card");
        floaters.forEach((el, i) => {
          gsap.to(el, {
            y: -6,
            duration: 3.5 + (i % 3) * 0.5,
            delay: i * 0.1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      document.documentElement.removeAttribute("data-gsap-bg");
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]" aria-hidden="true">
      {/* Organic Animated Liquid Motion Blobs */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl animate-[spin_25s_linear_infinite]" 
        style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
      />
      <div 
        className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-orange-400/15 blur-3xl animate-[pulse_14s_ease-in-out_infinite]" 
        style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
      />
      <div 
        className="absolute -bottom-24 left-1/4 w-[32rem] h-[32rem] rounded-full bg-emerald-400/10 blur-3xl animate-[spin_35s_linear_infinite]" 
        style={{ borderRadius: "50% 50% 30% 70% / 30% 60% 40% 70%" }}
      />
      <div ref={grainRef} className="grain-overlay opacity-35" />
    </div>
  );
}