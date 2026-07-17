"use client";

import { motion } from "framer-motion";
import { MessageCircle, PlayCircle, Megaphone } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WHATSAPP_NUMBER = "918863081082";

/* =========================================================
   Shared sub-navigation across all /notifications pages
   ========================================================= */
export const NOTIFICATIONS_NAV = [
  { href: "/notification", label: "Overview" },
  { href: "/notification/categories", label: "Categories" },
  { href: "/notification/updates", label: "All Notifications" },
];

export function NotificationsSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="Notifications section pages" className="flex flex-wrap gap-2">
      {NOTIFICATIONS_NAV.map((item) => {
        const active = item.href === current;
        return (
          <a
            key={item.href}
            href={item.href}
            className={
              active
                ? "pill pill-color-1 font-semibold"
                : "font-body rounded-full border border-line px-3.5 py-1.5 text-[13px] text-text-muted transition-colors hover:border-line-strong hover:text-text"
            }
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

/* =========================================================
   Hub Hero
   ========================================================= */
function NotificationsHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(245,166,35,0.16), transparent 70%)",
        }}
      />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            Announcements
          </p>

          <h1 className="font-display mt-5 max-w-[22ch] text-[32px] font-bold sm:text-[42px] lg:text-[50px]">
            Notifications &amp; Announcements
          </h1>

          <p className="font-body mt-5 text-[15px] font-medium text-text">
            Stay updated with the latest academy news, recruitment alerts
            &amp; important updates.
          </p>

          <p className="font-body mt-4 text-[15px] leading-relaxed text-text-muted">
            Never miss an important update. Get real-time notifications
            about admissions, new batches, government job recruitments,
            exam schedules, results, academy events, holidays, and official
            announcements — all in one place.
          </p>

          <div className="mt-8">
            <NotificationsSubNav current="/notifications" />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/notifications/updates" variant="primary" icon={Megaphone}>
              Latest Notifications
            </Button>
            <Button
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              variant="whatsapp"
              icon={MessageCircle}
            >
              Join WhatsApp
            </Button>
            <Button href="https://youtube.com" variant="ghost" icon={PlayCircle}>
              Watch Updates
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function Notifications() {
  return <NotificationsHero />;
}