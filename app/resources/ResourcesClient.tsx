"use client";

import { useMemo, useState } from "react";
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
import { CATEGORIES, RESOURCE_CATEGORY_LABELS, type ResourceItem } from "../lib/resourses-data";
import { incrementDownloadCount } from "@/app/lib/action/resources";
import { PHONE_NUMBER } from "@/app/lib/constants";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "./_ResourcesMotion";

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
        <FadeInUp className="max-w-[62ch]">
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
              href={`https://wa.me/${PHONE_NUMBER}`}
              variant="whatsapp"
              icon={MessageCircle}
            >
              WhatsApp Enquiry
            </Button>
          </div>
        </FadeInUp>
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
        <ScrollFadeUp as="h2" className="font-display text-[26px] font-bold sm:text-[32px]">
          Resource Categories
        </ScrollFadeUp>

        <StaggerList className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {CATEGORIES.map(({ label, icon: Icon }) => (
            <StaggerItem
              key={label}
              className="card-flat flex flex-col items-center gap-2 px-3 py-5 text-center"
            >
              <Icon size={20} className="text-signal-strong" />
              <span className="font-body text-[12px] text-text-muted">{label}</span>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Resource Grid (data-driven, interactive)
   ========================================================= */
function ResourceGrid({ resources }: { resources: ResourceItem[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(resources);

  const categoryOptions = useMemo(() => ["All", ...RESOURCE_CATEGORY_LABELS], []);

  const filtered = items.filter((r) => {
    const matchesCategory = category === "All" || r.category === category;
    const matchesQuery =
      query.trim() === "" || r.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  function handleDownload(resource: ResourceItem) {
    if (!resource.fileUrl) return;

    // Open synchronously inside the click handler so popup blockers
    // don't kill it, then update the counter in the background.
    window.open(resource.fileUrl, "_blank", "noopener,noreferrer");

    setItems((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r))
    );

    incrementDownloadCount(resource.id).catch((err) => {
      console.error("Failed to record download:", err);
    });
  }

  return (
    <section id="resources" className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp as="h2" className="font-display text-[28px] font-bold sm:text-[34px]">
          Latest Resources
        </ScrollFadeUp>

        {/* Search & Filter */}
        <ScrollFadeUp
          delay={0.06}
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
        </ScrollFadeUp>

        {/* Cards */}
        {filtered.length === 0 ? (
          <p className="font-body mt-8 text-[14px] text-text-muted">
            No resources match these filters right now.
          </p>
        ) : (
          <StaggerList className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((resource) => (
              <StaggerItem key={resource.id} className="card-flat flex flex-col p-5">
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
                  <button
                    type="button"
                    onClick={() => handleDownload(resource)}
                    disabled={!resource.fileUrl}
                    className="flex items-center gap-1.5 rounded-lg bg-signal px-4 py-2 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Download size={14} />
                    {resource.fileUrl ? "Download Now" : "No File"}
                  </button>

                  {resource.hasVideo && resource.videoUrl && (
                    <Button href={resource.videoUrl} variant="ghost" icon={PlayCircle}>
                      Watch Video
                    </Button>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        )}
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
        <ScrollFadeUp className="glass glass-sheen sheen-run relative overflow-hidden rounded-2xl px-6 py-14 text-center shadow-[var(--shadow-card)] sm:px-14">
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
              href={`https://wa.me/${PHONE_NUMBER}`}
              variant="whatsapp"
              icon={MessageCircle}
            >
              Join WhatsApp Channel
            </Button>
            <Button href="#resources" variant="ghost" icon={Download}>
              Browse Resources
            </Button>
          </div>
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export — receives DB-backed data from
   app/resources/page.tsx (server component)
   ========================================================= */
export default function ResourcesClient({ resources }: { resources: ResourceItem[] }) {
  return (
    <>
      <ResourcesHero />
      <ResourceCategories />
      <ResourceGrid resources={resources} />
      <StayUpdatedCTA />
    </>
  );
}