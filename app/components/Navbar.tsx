"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Button from "./Button";
import { brand, nav, contact } from "../lib/site-data";
import { Phone, MessageCircle, Menu, X, ChevronDown } from "lucide-react";

/* Keep these as direct top-level links; everything else in `nav`
   collapses into the "More" dropdown. Edit freely. */
const PRIMARY_LABELS = ["About", "Jobs", "Admission"];

const primaryNav = nav.filter((item) => PRIMARY_LABELS.includes(item.label));
const moreNav = nav.filter((item) => !PRIMARY_LABELS.includes(item.label));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the desktop dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function closeAll() {
    setOpen(false);
    setMoreOpen(false);
    setMobileMoreOpen(false);
  }

  return (
    <header className="ios-blur sticky top-0 z-50 border-b border-line">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4">
          <a
            href="#top"
            className="shrink-0 text-[17px] font-semibold tracking-tight text-text"
            onClick={closeAll}
          >
            {brand.shortName}
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden flex-1 items-center justify-center gap-6 lg:flex"
            aria-label="Primary"
          >
            {primaryNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[14px] font-medium text-text-muted transition-colors hover:text-text"
              >
                {item.label}
              </a>
            ))}

            {/* More dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className="flex items-center gap-1 whitespace-nowrap text-[14px] font-medium text-text-muted transition-colors hover:text-text"
              >
                More
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {moreOpen && (
                <div
                  role="menu"
                  className="card-flat absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 overflow-hidden p-1.5"
                >
                  {moreNav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setMoreOpen(false)}
                      className="block rounded-md px-3 py-2 text-[14px] font-medium text-text-muted transition-colors hover:bg-bg-raised-2 hover:text-text"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden sm:block">
              <Button href={contact.phoneHref} variant="secondary" icon={Phone}>
                Call
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-text lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile slide-down panel */}
      {open && (
        <div className="border-t border-line lg:hidden">
          <Container>
            <nav className="flex flex-col divide-y divide-line py-2" aria-label="Primary mobile">
              {primaryNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className="py-3 text-[15px] font-medium text-text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </a>
              ))}

              {/* More accordion */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setMobileMoreOpen((v) => !v)}
                  aria-expanded={mobileMoreOpen}
                  className="flex w-full items-center justify-between py-3 text-[15px] font-medium text-text-muted transition-colors hover:text-text"
                >
                  More
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      mobileMoreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileMoreOpen && (
                  <div className="flex flex-col gap-0.5 pb-2 pl-3">
                    {moreNav.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={closeAll}
                        className="rounded-md px-2 py-2.5 text-[14px] font-medium text-text-muted transition-colors hover:bg-bg-raised-2 hover:text-text"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-3 border-t border-line py-4">
              <Button href={contact.phoneHref} variant="secondary" icon={Phone}>
                Call
              </Button>
              <Button href={contact.whatsappHref} variant="whatsapp" icon={MessageCircle}>
                WhatsApp
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}