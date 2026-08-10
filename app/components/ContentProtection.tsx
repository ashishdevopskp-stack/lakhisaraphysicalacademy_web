"use client";

import React, { useEffect, useState } from "react";
import { ShieldAlert, Lock, EyeOff } from "lucide-react";

export default function ContentProtection() {
  const [isWindowBlurred, setIsWindowBlurred] = useState(false);

  useEffect(() => {
    // 1. Disable Right Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Disable Screenshot Keys & DevTools Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen Key
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        try {
          navigator.clipboard.writeText("");
        } catch {}
        alert("⚠️ Screenshots are disabled on Lakhisarai Physical Academy website for content protection.");
        return false;
      }

      // Windows/Mac Screenshot Shortcuts: Win+Shift+S, Cmd+Shift+3/4/5, Ctrl+P, Ctrl+S, Ctrl+U, F12, Ctrl+Shift+I
      if (
        (e.ctrlKey && e.key === "p") || // Print
        (e.ctrlKey && e.key === "s") || // Save
        (e.ctrlKey && e.key === "u") || // View Source
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "C" || e.key === "c" || e.key === "J" || e.key === "j")) || // DevTools
        e.key === "F12" || // F12
        (e.metaKey && e.shiftKey && (e.key === "3" || e.key === "4" || e.key === "5" || e.key === "s" || e.key === "S")) // Mac Screenshots
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Prevent Copy, Cut, Drag
    const handleCopyCutDrag = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // 4. Page Visibility & Window Focus Loss (Triggered during Screen Snipping Tool / Recording App focus)
    const handleWindowBlur = () => {
      setIsWindowBlurred(true);
    };

    const handleWindowFocus = () => {
      setIsWindowBlurred(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsWindowBlurred(true);
      } else {
        setIsWindowBlurred(false);
      }
    };

    // Register event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopyCutDrag);
    document.addEventListener("cut", handleCopyCutDrag);
    document.addEventListener("dragstart", handleCopyCutDrag);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopyCutDrag);
      document.removeEventListener("cut", handleCopyCutDrag);
      document.removeEventListener("dragstart", handleCopyCutDrag);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* Dynamic Security Shield Overlay when Snipping Tool / Screen Recording or Window Focus is lost */}
      {isWindowBlurred && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-6 transition-all duration-300">
          <div className="p-4 rounded-3xl bg-orange-500/10 border-2 border-orange-500/30 text-[#ea580c] mb-4 animate-bounce">
            <Lock size={48} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <EyeOff className="text-[#ea580c]" />
            <span>Screenshot &amp; Recording Protection Active</span>
          </h2>

          <p className="mt-3 text-slate-300 text-sm sm:text-base font-medium max-w-md">
            Lakhisarai Physical Academy protects candidate data &amp; proprietary study material. Content is obscured when screen capture software or inactive window focus is detected.
          </p>

          <div className="mt-6 px-4 py-2 rounded-full bg-white/10 text-slate-300 border border-white/20 text-xs font-black">
            Click anywhere on the academy window to restore view
          </div>
        </div>
      )}

      {/* Invisible Security Watermark Grid to Deter Screen Recording */}
      <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.035] select-none overflow-hidden flex flex-wrap gap-12 p-8 text-[11px] font-black uppercase text-slate-900 tracking-widest rotate-[-15deg]">
        {[...Array(30)].map((_, i) => (
          <span key={i} className="whitespace-nowrap">
            Lakhisarai Physical Academy • Protected Content • +91 7739776471
          </span>
        ))}
      </div>
    </>
  );
}
