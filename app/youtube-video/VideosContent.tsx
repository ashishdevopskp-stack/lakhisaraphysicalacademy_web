"use client";

import { useMemo, useState } from "react";
import {
  Video as Youtube,
  MessageCircle,
  Search,
  Calendar,
  PlayCircle,
  Shield,
  ShieldAlert,
  Star,
  ShieldCheck,
  Flame,
  Dumbbell,
  Target,
  Trophy,
  Megaphone,
  Sparkles,
  Bell,
  ExternalLink,
  X,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { PHONE_NUMBER } from "@/app/lib/constants";
import type { DbVideo } from "@/app/lib/action/videos";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "./_VideosMotion";

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

function getYoutubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function SectionGlow({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const images = {
    1: "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(59,130,246,0.14), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(20,184,166,0.10), transparent 55%)",
    2: "radial-gradient(ellipse 900px 500px at 90% 10%, rgba(20,184,166,0.12), transparent 55%), radial-gradient(ellipse 800px 500px at 5% 90%, rgba(59,130,246,0.10), transparent 55%)",
    3: "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(245,166,35,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(59,130,246,0.10), transparent 55%)",
  };
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: images[variant] }}
    />
  );
}

function VideosHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-12 sm:pb-20 sm:pt-16">
      <SectionGlow variant={1} />
      <Container>
        <FadeInUp className="max-w-[62ch]">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#ea580c]">
            Video Library
          </p>

          <h1 className="font-display mt-4 max-w-[20ch] text-[34px] font-black leading-[1.14] sm:text-[44px] lg:text-[52px] text-slate-900">
            YouTube <span className="text-[#ea580c]">Videos</span>
          </h1>

          <p className="font-body mt-4 text-[15.5px] font-medium text-slate-700">
            Watch training sessions, recruitment updates &amp; physical preparation guides directly on our website.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#videos" variant="primary" icon={PlayCircle}>
              Watch Videos
            </Button>
            <Button href="https://www.youtube.com/@lakhisaraiphysicalacademy?si=S80l_B7Z0lWTtZSU" variant="secondary" icon={Youtube}>
              Subscribe on YouTube
            </Button>
            <Button href={`https://wa.me/${PHONE_NUMBER}`} variant="whatsapp" icon={MessageCircle}>
              WhatsApp Enquiry
            </Button>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

const CATEGORIES = [
  { label: "Army", icon: Shield },
  { label: "Bihar Police", icon: ShieldAlert },
  { label: "Daroga", icon: Star },
  { label: "SSC GD", icon: ShieldCheck },
  { label: "Running Tips", icon: Flame },
  { label: "Fitness & Workout", icon: Dumbbell },
  { label: "Physical Test", icon: Target },
  { label: "Student Success", icon: Trophy },
  { label: "Recruitment Updates", icon: Megaphone },
  { label: "Motivation", icon: Sparkles },
] as const;

function VideoCategories({
  selectedCategory,
  onSelectCategory,
  extraCategories = [],
}: {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  extraCategories?: string[];
}) {
  const combinedList = useMemo(() => {
    const defaultLabels = new Set<string>(CATEGORIES.map((c) => c.label));
    const extras = extraCategories
      .filter((c) => Boolean(c) && !defaultLabels.has(c))
      .map((c) => ({ label: c, icon: Sparkles }));
    return [...CATEGORIES, ...extras];
  }, [extraCategories]);

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200/80">
      <Container>
        <ScrollFadeUp as="p" className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#ea580c]">
          Browse By Category
        </ScrollFadeUp>
        <ScrollFadeUp
          as="h2"
          delay={0.05}
          className="font-display mt-2 text-[26px] font-black text-slate-900 sm:text-[32px]"
        >
          Video Categories
        </ScrollFadeUp>

        <StaggerList className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {combinedList.map(({ label, icon: Icon }) => {
            const isSelected = selectedCategory === label;
            return (
              <StaggerItem
                key={label}
                onClick={() => {
                  onSelectCategory(isSelected ? "All" : label);
                  const el = document.getElementById("videos");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`bento-card flex flex-col items-center gap-2 px-3 py-4 text-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#ea580c] text-white border-orange-600 shadow-md scale-[1.02]"
                    : "hover:border-orange-300"
                }`}
              >
                <Icon size={20} className={isSelected ? "text-white" : "text-[#ea580c]"} />
                <span className={`font-body text-[13px] font-bold ${isSelected ? "text-white" : "text-slate-800"}`}>
                  {label}
                </span>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </Container>
    </section>
  );
}


const VIDEO_CATEGORY_LABELS = CATEGORIES.map((c) => c.label);

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function VideoGrid({
  videos,
  selectedCategory,
  onSelectCategory,
}: {
  videos: DbVideo[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [activePlayVideo, setActivePlayVideo] = useState<DbVideo | null>(null);

  const categoryOptions = useMemo(() => {
    const dbCategories = videos.map((v) => v.category).filter(Boolean);
    const combined = Array.from(new Set(["All", ...VIDEO_CATEGORY_LABELS, ...dbCategories]));
    return combined;
  }, [videos]);

  const filtered = videos.filter((v) => {
    const matchesCategory = selectedCategory === "All" || v.category === selectedCategory;
    const matchesQuery =
      query.trim() === "" || v.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const featured = filtered.find((v) => v.featured) ?? filtered[0];

  return (
    <section id="videos" className="relative overflow-hidden py-14 sm:py-20">
      <SectionGlow variant={2} />
      <Container>
        <ScrollFadeUp as="p" className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#ea580c]">
          Fresh Uploads
        </ScrollFadeUp>
        <ScrollFadeUp
          as="h2"
          delay={0.05}
          className="font-display mt-2 text-[28px] font-black text-slate-900 sm:text-[36px]"
        >
          Latest Training &amp; Update Videos
        </ScrollFadeUp>

        {/* Search & Filter Bar */}
        <ScrollFadeUp
          delay={0.1}
          className="bento-card mt-6 flex flex-col gap-3 p-4 sm:flex-row sm:items-center shadow-sm"
        >
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
            <Search size={18} className="shrink-0 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search videos..."
              className="font-body w-full bg-transparent text-[14px] text-slate-900 outline-none placeholder:text-slate-400 font-medium"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="font-body rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-[14px] font-bold text-slate-800 outline-none cursor-pointer"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </ScrollFadeUp>


        {/* Featured Video */}
        {featured && (
          <ScrollFadeUp
            delay={0.15}
            className="bento-card mt-8 flex flex-col overflow-hidden lg:flex-row shadow-lg border-2 border-orange-100"
          >
            <div className="relative aspect-video w-full lg:w-[58%] bg-black flex items-center justify-center">
              {getYoutubeEmbedUrl(featured.video_url) ? (
                <iframe
                  src={getYoutubeEmbedUrl(featured.video_url)!}
                  title={featured.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : featured.thumbnail_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.thumbnail_url}
                  alt={featured.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <PlayCircle size={48} className="text-white opacity-80" />
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[#ea580c]">
                  Featured Video
                </span>
                <h3 className="font-display mt-3 text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {featured.title}
                </h3>
                {featured.description && (
                  <p className="font-body mt-3 text-sm text-slate-600 leading-relaxed">
                    {featured.description}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <span className="font-body flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Calendar size={14} /> {formatDate(featured.publish_date)}
                </span>
                <a
                  href={featured.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-black text-[#ea580c] bg-orange-50 rounded-full border border-orange-200 hover:bg-orange-100 transition-colors shadow-sm"
                >
                  <ExternalLink size={14} />
                  Open in YouTube
                </a>
              </div>
            </div>
          </ScrollFadeUp>
        )}

        {/* Video Grid */}
        {filtered.length === 0 ? (
          <p className="font-body col-span-full mt-10 text-center text-sm text-slate-500">
            No videos match your search right now.
          </p>
        ) : (
          <StaggerList className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((video) => {
              const embedUrl = getYoutubeEmbedUrl(video.video_url);
              return (
                <StaggerItem key={video.id} className="bento-card flex flex-col p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-black border border-slate-200">
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    ) : video.thumbnail_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <PlayCircle size={36} className="text-white opacity-80" />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#ea580c] bg-orange-50 rounded-md border border-orange-200">
                      {video.category}
                    </span>
                    <span className="font-body flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                      <Calendar size={12} /> {formatDate(video.publish_date)}
                    </span>
                  </div>

                  <h3 className="font-display mt-3 text-base font-extrabold text-slate-900 leading-snug line-clamp-2">
                    {video.title}
                  </h3>

                  {video.description && (
                    <p className="font-body mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  )}

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActivePlayVideo(video)}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-slate-800 hover:text-[#ea580c]"
                    >
                      <PlayCircle size={15} className="text-[#ea580c]" />
                      Full Screen
                    </button>

                    <a
                      href={video.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-black text-[#ea580c] hover:underline"
                    >
                      <span>Open in YouTube</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerList>
        )}
      </Container>

      {/* Fullscreen Video Modal */}
      {activePlayVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-700 p-4 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-3 text-white">
              <h4 className="text-base font-bold truncate pr-4">{activePlayVideo.title}</h4>
              <button
                type="button"
                onClick={() => setActivePlayVideo(null)}
                className="p-1 rounded-full bg-slate-800 text-white hover:bg-slate-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
              {getYoutubeEmbedUrl(activePlayVideo.video_url) ? (
                <iframe
                  src={`${getYoutubeEmbedUrl(activePlayVideo.video_url)}?autoplay=1`}
                  title={activePlayVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white">Unable to embed video.</div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-end">
              <a
                href={activePlayVideo.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black text-white bg-[#ea580c] rounded-full hover:bg-orange-700"
              >
                <ExternalLink size={14} />
                Open on YouTube.com
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function SubscribeCTA() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <ScrollFadeUp className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 px-6 py-12 text-center sm:px-14 shadow-2xl">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#ff9933] via-slate-200 to-[#138808]" />
          <div className="relative">
            <Bell size={28} className="mx-auto text-amber-400" />
            <h2 className="font-display mx-auto mt-4 max-w-[28ch] text-[26px] font-black text-white sm:text-[36px]">
              Never Miss a Training Video!
            </h2>
            <p className="font-body mx-auto mt-3 max-w-[48ch] text-[15px] leading-relaxed text-slate-300">
              Subscribe to our YouTube Channel &amp; join our official WhatsApp group for daily physical test videos &amp; recruitment updates.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="https://www.youtube.com/@lakhisaraiphysicalacademy?si=S80l_B7Z0lWTtZSU" variant="primary" icon={Youtube}>
                Subscribe on YouTube
              </Button>
              <Button href={`https://wa.me/${PHONE_NUMBER}`} variant="whatsapp" icon={MessageCircle}>
                Join WhatsApp Group
              </Button>
            </div>
          </div>
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

export default function VideosContent({ videos }: { videos: DbVideo[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const extraCategories = useMemo(() => {
    return Array.from(new Set(videos.map((v) => v.category).filter(Boolean)));
  }, [videos]);

  return (
    <>
      <VideosHero />
      <VideoCategories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        extraCategories={extraCategories}
      />
      <VideoGrid
        videos={videos}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <SubscribeCTA />
    </>
  );
}