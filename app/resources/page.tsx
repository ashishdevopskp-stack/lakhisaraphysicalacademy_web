"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  MessageCircle,
  Search,
  Calendar,
  PlayCircle,
  FileText,
  DownloadCloud,
  Bell,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { CATEGORIES, RESOURCES } from "../lib/resourses-data";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WHATSAPP_NUMBER = "918863081082";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

/* =========================================================
   1. Hero
   ========================================================= */
function ResourcesHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(59,130,246,0.16), transparent 70%)",
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
            Free Downloads
          </p>

          <h1 className="font-display mt-5 max-w-[20ch] text-[32px] font-bold sm:text-[42px] lg:text-[50px]">
            Free Resources
          </h1>

          <p className="font-body mt-5 text-[15px] font-medium text-text">
            Download free study materials &amp; physical training resources.
          </p>

          <p className="font-body mt-4 text-[15px] leading-relaxed text-text-muted">
            Access free notes, PDFs, workout plans, physical standards,
            running charts, diet guides, and other useful resources to
            boost your preparation.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#resources" variant="primary" icon={Download}>
              Browse Resources
            </Button>
            <Button
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              variant="whatsapp"
              icon={MessageCircle}
            >
              WhatsApp Enquiry
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Resource Categories
   ========================================================= */
function ResourceCategories() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[26px] font-bold sm:text-[32px]">
          Resource Categories
        </motion.h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {CATEGORIES.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 5) * 0.04 }}
              className="card-flat flex flex-col items-center gap-2 px-3 py-5 text-center"
            >
              <Icon size={20} className="text-signal-strong" />
              <span className="font-body text-[12px] text-text-muted">{label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Resource Grid
   ========================================================= */
const RESOURCE_CATEGORY_LABELS = CATEGORIES.map((c) => c.label);

function ResourceGrid() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categoryOptions = useMemo(
    () => ["All", ...RESOURCE_CATEGORY_LABELS],
    []
  );

  const filtered = RESOURCES.filter((r) => {
    const matchesCategory = category === "All" || r.category === category;
    const matchesQuery =
      query.trim() === "" || r.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="resources" className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
          Latest Resources
        </motion.h2>

        {/* Search & Filter */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="glass flex flex-1 items-center gap-2 rounded-lg px-4 py-2.5">
            <Search size={16} className="shrink-0 text-text-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources"
              className="w-full bg-transparent text-[14px] text-text outline-none placeholder:text-text-faint"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="glass rounded-lg px-4 py-2.5 text-[14px] text-text outline-none"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((resource, i) => (
            <motion.div
              key={resource.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 4) * 0.05 }}
              className="card-flat flex flex-col p-5"
            >
              <div
                className="flex aspect-[4/3] items-center justify-center rounded-lg border border-line"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 75%)",
                }}
              >
                <FileText size={26} className="text-text-faint" />
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <Badge>{resource.category}</Badge>
                <span className="flex items-center gap-1 text-[12px] text-text-muted">
                  <DownloadCloud size={12} /> {resource.downloads.toLocaleString("en-IN")}
                </span>
              </div>

              <h3 className="font-display mt-3 text-[15px] font-semibold text-text">
                {resource.title}
              </h3>
              <p className="font-body mt-1.5 text-[13px] leading-relaxed text-text-muted">
                {resource.description}
              </p>

              <span className="mt-3 flex items-center gap-1.5 text-[12px] text-text-muted">
                <Calendar size={13} /> {resource.publishDate}
              </span>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button href="#" variant="primary" icon={Download}>
                  Download Now
                </Button>
                {resource.hasVideo && (
                  <Button href="https://youtube.com" variant="ghost" icon={PlayCircle}>
                    Watch Video
                  </Button>
                )}
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <p className="font-body col-span-full text-[14px] text-text-muted">
              No resources match these filters right now.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   4. Stay Updated CTA
   ========================================================= */
function StayUpdatedCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.div
          {...fadeUp}
          className="glass glass-sheen sheen-run relative overflow-hidden rounded-2xl px-6 py-14 text-center shadow-[var(--shadow-card)] sm:px-14"
        >
          <span className="ribbon-bar absolute inset-x-0 top-0 h-[4px]" aria-hidden />
          <Bell size={26} className="mx-auto text-accent-strong" />
          <h2 className="font-display mx-auto mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]">
            New Resources Added Every Week
          </h2>
          <p className="font-body mx-auto mt-3 max-w-[48ch] text-[15px] leading-relaxed text-text-muted">
            Join our WhatsApp channel to get notified whenever new notes,
            charts, and guides are uploaded.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              variant="whatsapp"
              icon={MessageCircle}
            >
              Join WhatsApp Channel
            </Button>
            <Button href="#resources" variant="ghost" icon={Download}>
              Browse Resources
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
export default function Resources() {
  return (
    <>
      <ResourcesHero />
      <ResourceCategories />
      <ResourceGrid />
      <StayUpdatedCTA />
    </>
  );
}