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
        // Central "floodlight" blob — slow, wide, wandering drift.
        // Targets <body> directly (see note above) since that's where the
        // gradient using these vars actually lives.
        gsap.to(body, {
          "--blob1-x": "38%",
          "--blob1-y": "6%",
          duration: 14,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        // Secondary warm blob — offset timing so it never syncs with blob1.
        gsap.to(body, {
          "--blob2-x": "80%",
          "--blob2-y": "32%",
          duration: 18,
          delay: 1.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        // Teal ground blob — slowest, biggest arc.
        gsap.to(body, {
          "--blob3-x": "18%",
          "--blob3-y": "84%",
          duration: 22,
          delay: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Fine grain crawl — set on the grain div itself, not <html>.
        if (grainRef.current) {
          gsap.to(grainRef.current, {
            "--grain-x": "6%",
            "--grain-y": "4%",
            duration: 0.6,
            ease: "steps(6)",
            repeat: -1,
            yoyo: true,
          });
        }

        // Floating-shadow "breathe" for any element opted in via .float-card.
        const floaters = gsap.utils.toArray<HTMLElement>(".float-card");
        floaters.forEach((el, i) => {
          gsap.to(el, {
            y: -8,
            boxShadow:
              "0 26px 50px rgba(15, 23, 42, 0.16), 0 6px 14px rgba(15, 23, 42, 0.08)",
            duration: 3.2 + (i % 3) * 0.4,
            delay: i * 0.15,
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

  return <div ref={grainRef} className="grain-overlay" aria-hidden="true" />;
}