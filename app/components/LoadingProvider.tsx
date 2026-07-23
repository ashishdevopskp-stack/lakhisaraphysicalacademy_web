// app/components/LoadingProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LoadingContext = createContext<{ isLoading: boolean }>({ isLoading: false });
export const useGlobalLoading = () => useContext(LoadingContext);

// --- Patch fetch immediately, at module scope, not inside useEffect ---
let listeners: ((n: number) => void)[] = [];
let activeCount = 0;

function notify() {
  listeners.forEach((fn) => fn(activeCount));
}

if (typeof window !== "undefined" && !(window as any).__fetchPatched) {
  (window as any).__fetchPatched = true;
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    // Let individual calls skip the global overlay (e.g. chat widget requests
    // that already show their own inline "Typing..." indicator).
    const [, init] = args;
    const skip = (init as any)?.skipGlobalLoader;

    if (!skip) {
      activeCount++;
      notify();
    }

    try {
      return await originalFetch(...args);
    } finally {
      if (!skip) {
        activeCount--;
        notify();
      }
    }
  };
}

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(activeCount);

  useEffect(() => {
    listeners.push(setCount);
    return () => {
      listeners = listeners.filter((fn) => fn !== setCount);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading: count > 0 }}>
      {children}
      {count > 0 && (
        <div className="global-loader-overlay">
          <div className="global-loader-spinner" />
        </div>
      )}
    </LoadingContext.Provider>
  );
}