"use client";

import { useMemo, useState } from "react";
import {
  Trophy,
  ClipboardList,
  MessageCircle,
  Phone,
  Search,
  MapPin,
  Calendar,
  Award,
  Share2,
  ArrowRight,
  PlayCircle,
  Users,
  GraduationCap,
  Quote,
  UploadCloud,
  Check,
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { PHONE_NUMBER, whatsappHref, telHref } from "@/app/lib/constants";
import {
  DEPARTMENTS,
  DEPARTMENT_ICONS,
  TOTAL_STUDENTS_TRAINED,
  ACADEMY_SUCCESS_SINCE,
  type StudentItem,
  type SelectionStatus,
} from "../lib/results-data";

function ResultsHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-12 sm:pb-16 sm:pt-16 bg-gradient-to-b from-[#faf7f0] via-white to-slate-50 border-b border-slate-200/80">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="max-w-3xl space-y-4">
          {/* Saffron & Tiranga Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-amber-500/30 text-xs font-black text-amber-900 shadow-xs">
            <Trophy size={15} className="text-[#ea580c]" />
            <span className="uppercase tracking-wider">Hall of Fame &amp; Selection Dossier</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Our Proudly <span className="text-[#ea580c]">Selected Candidates</span>
          </h1>

          <p className="text-base sm:text-lg font-semibold text-slate-700 leading-relaxed max-w-2xl">
            Celebrating 1,200+ proud achievers who cleared Bihar Police, Indian Army Agniveer, Sub-Inspector (Daroga), SSC GD, Railway, and Paramilitary physical examinations under expert guidance.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <a
              href="#students"
              className="px-6 py-3.5 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              <Trophy size={16} />
              <span>Explore Selected Students</span>
              <ArrowRight size={16} />
            </a>

            <a
              href={whatsappHref(encodeURIComponent("Hello Lakhisarai Physical Academy, I want to inquire about physical training batches."))}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-[#138808] border border-emerald-300 font-black text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SuccessStatistics({ students }: { students: StudentItem[] }) {
  const countByDept = (dept: string) =>
    students.filter((s) => s.department === dept).length;

  const stats = [
    { label: "Total Students Trained", value: TOTAL_STUDENTS_TRAINED, icon: Users, color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Total Selections", value: `${students.length}+`, icon: Trophy, color: "bg-amber-50 text-amber-700 border-amber-200" },
    { label: "Army Selections", value: `${countByDept("Army")}+`, icon: DEPARTMENT_ICONS.Army, color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    {
      label: "Police Selections",
      value: `${countByDept("Bihar Police")}+`,
      icon: DEPARTMENT_ICONS["Bihar Police"],
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
    {
      label: "SSC GD Selections",
      value: `${countByDept("SSC GD")}+`,
      icon: DEPARTMENT_ICONS["SSC GD"],
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      label: "Daroga Selections",
      value: `${countByDept("Bihar Daroga")}+`,
      icon: DEPARTMENT_ICONS["Bihar Daroga"],
      color: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      label: "Railway Selections",
      value: `${countByDept("Railway")}+`,
      icon: DEPARTMENT_ICONS.Railway,
      color: "bg-teal-50 text-teal-700 border-teal-200",
    },
    { label: "Success Since", value: ACADEMY_SUCCESS_SINCE, icon: Calendar, color: "bg-slate-100 text-slate-800 border-slate-300" },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-200/80">
      <Container>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[#ea580c]" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Academy Selection Records &amp; Statistics
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-2xl bg-white border-2 border-slate-200/90 p-3.5 text-center shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col items-center justify-between"
            >
              <div className={`p-2.5 rounded-xl border ${color} mb-2`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                  {value}
                </p>
                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mt-1">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const STATUS_BADGES: Record<SelectionStatus, { label: string; color: string }> = {
  Selected: { label: "Selected", color: "bg-emerald-100 text-[#138808] border-emerald-300" },
  "Under Training": { label: "Under Training", color: "bg-blue-100 text-blue-800 border-blue-300" },
  "Document Verification": { label: "Doc Verification", color: "bg-amber-100 text-amber-900 border-amber-300" },
};

function SelectedStudentCards({ students }: { students: StudentItem[] }) {
  const [department, setDepartment] = useState("All");
  const [year, setYear] = useState("All");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const departmentOptions = useMemo(() => ["All", ...DEPARTMENTS], []);
  const yearOptions = useMemo(
    () => ["All", ...Array.from(new Set(students.map((s) => s.year))).sort().reverse()],
    [students]
  );

  const filtered = students.filter((s) => {
    const matchesDept = department === "All" || s.department === department;
    const matchesYear = year === "All" || s.year === year;
    const matchesQuery =
      query.trim() === "" ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.post.toLowerCase().includes(query.toLowerCase());
    return matchesDept && matchesYear && matchesQuery;
  });

  const handleShare = async (student: StudentItem) => {
    const shareUrl = `${window.location.origin}/result/${student.id}`;
    const shareData = {
      title: `${student.name}'s Selection Journey`,
      text: `${student.name} was selected as ${student.post} — Lakhisarai Physical Academy`,
      url: shareUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled share dialog
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(student.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore clipboard fallback error
    }
  };

  return (
    <section id="students" className="py-12 sm:py-16 bg-slate-50/70">
      <Container>
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#ea580c] font-black text-xs uppercase tracking-wider mb-2">
              <ShieldCheck size={14} />
              <span>Verified Achievers ({filtered.length})</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Selected Candidates Roll
            </h2>
          </div>

          {/* Search Input & Select Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input Box */}
            <div className="relative flex-1 sm:flex-initial min-w-[200px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search candidate name..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 shadow-xs"
              />
            </div>

            {/* Department Filter */}
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="py-2 px-3 rounded-xl bg-white border border-slate-300 text-xs font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 shadow-xs cursor-pointer"
            >
              {departmentOptions.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "All Recruitment Streams" : d}
                </option>
              ))}
            </select>

            {/* Year Filter */}
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="py-2 px-3 rounded-xl bg-white border border-slate-300 text-xs font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 shadow-xs cursor-pointer"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y === "All" ? "All Years" : `Batch ${y}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Student Cards Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border-2 border-slate-200 max-w-md mx-auto shadow-sm">
            <Users size={32} className="mx-auto text-slate-400 mb-3" />
            <p className="text-sm font-black text-slate-900">No candidates match your search filters.</p>
            <p className="text-xs font-medium text-slate-500 mt-1">Try resetting the department or year filter.</p>
            <button
              onClick={() => { setDepartment("All"); setYear("All"); setQuery(""); }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-[#ea580c] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((student) => {
              const statusBadge = STATUS_BADGES[student.status] || STATUS_BADGES.Selected;
              return (
                <div
                  key={student.id}
                  className="group rounded-3xl bg-white border-2 border-slate-200/90 p-5 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    {/* Top Row: Avatar & Name */}
                    <div className="flex items-start gap-3.5 mb-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-amber-500/40 ring-2 ring-amber-400/20 shrink-0 bg-slate-100 flex items-center justify-center">
                        {student.photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={student.photoUrl}
                            alt={student.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <GraduationCap size={24} className="text-amber-600" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${statusBadge.color}`}>
                            {statusBadge.label}
                          </span>
                          <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            {student.year}
                          </span>
                        </div>

                        <h3 className="text-base font-black text-slate-900 group-hover:text-[#ea580c] transition-colors leading-tight truncate mt-1">
                          {student.name}
                        </h3>
                        <p className="text-xs font-black text-[#ea580c] truncate mt-0.5">
                          {student.post}
                        </p>
                      </div>
                    </div>

                    {/* Metadata Table Chips */}
                    <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 mb-4">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 flex items-center gap-1">
                          <ClipboardList size={12} className="text-orange-500" />
                          <span>Exam</span>
                        </span>
                        <span className="text-slate-900 font-extrabold truncate max-w-[150px]">{student.exam}</span>
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 flex items-center gap-1">
                          <MapPin size={12} className="text-emerald-600" />
                          <span>District</span>
                        </span>
                        <span className="text-slate-900 font-extrabold">{student.district}</span>
                      </div>

                      {student.rank && (
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase text-slate-400 flex items-center gap-1">
                            <Award size={12} className="text-amber-500" />
                            <span>Rank / Score</span>
                          </span>
                          <span className="text-amber-800 font-black">{student.rank}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={`/result/${student.id}`}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-[#ea580c] text-white text-xs font-black transition-colors text-center shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>View Profile</span>
                      <ArrowRight size={13} />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleShare(student)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 transition-colors shadow-2xs"
                      title="Share Candidate Story"
                    >
                      {copiedId === student.id ? (
                        <Check size={16} className="text-emerald-600" />
                      ) : (
                        <Share2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}

function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube-nocookie.com/embed/${match[2]}`;
  }
  return null;
}

function SuccessStoryVideos({ students }: { students: StudentItem[] }) {
  const videos = students.filter(
    (s): s is StudentItem & { videoUrl: string } => Boolean(s.videoUrl)
  );

  return (
    <section id="videos" className="py-12 sm:py-16 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 rounded-full inline-flex items-center gap-1.5">
              <PlayCircle size={14} className="animate-pulse" />
              <span>Dynamic Admin Video Feed ({videos.length})</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
              Success Story Videos
            </h2>
            <p className="text-xs font-medium text-slate-400 mt-1">
              Real video interviews &amp; ground reactions of selected candidates live from YouTube.
            </p>
          </div>

          <a
            href="/admin/results"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-black transition-all flex items-center gap-1.5 w-fit"
          >
            <span>Add / Edit Videos in Admin</span>
            <ArrowRight size={13} />
          </a>
        </div>

        {videos.length === 0 ? (
          <div className="rounded-3xl bg-slate-900 border-2 border-slate-800 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-3">
            <PlayCircle size={48} className="mx-auto text-red-500/60" />
            <h3 className="text-lg font-black text-white">No Video Stories Added Yet</h3>
            <p className="text-xs font-medium text-slate-400 max-w-md mx-auto leading-relaxed">
              When admin adds a YouTube Video URL in any student&apos;s result form in Admin Panel (<code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400">/admin/results</code>), the video will automatically appear here with a live playable player!
            </p>
            <div className="pt-2">
              <a
                href="/admin/results/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition-all shadow-md"
              >
                <span>Add Student Result &amp; Video URL</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((student) => {
              const embedUrl = getYouTubeEmbedUrl(student.videoUrl);
              return (
                <div
                  key={student.id}
                  className="rounded-3xl bg-slate-900 border-2 border-slate-800 p-5 shadow-xl hover:border-amber-500/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Embedded YouTube Iframe or Video Player */}
                    <div className="relative aspect-video rounded-2xl bg-black border border-slate-800 overflow-hidden mb-4 shadow-inner">
                      {embedUrl ? (
                        <iframe
                          src={embedUrl}
                          title={`${student.name} Success Story`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0 rounded-2xl"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 p-4 text-center">
                          <PlayCircle size={40} className="text-red-500 mb-2" />
                          <span className="text-xs font-black text-white">{student.name}&apos;s Video</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase">
                        {student.department}
                      </span>
                      <span className="text-[10px] font-black text-slate-400">{student.year}</span>
                    </div>

                    <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors leading-tight">
                      {student.name}&apos;s Selection Journey
                    </h3>
                    <p className="text-xs font-extrabold text-slate-400 mt-1">
                      Selected as {student.post} ({student.exam})
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">{student.district}</span>
                    <a
                      href={student.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-[11px] transition-colors"
                    >
                      <PlayCircle size={13} />
                      <span>Open YouTube</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}

function Testimonials({ students }: { students: StudentItem[] }) {
  const testimonials = students.filter(
    (s): s is StudentItem & { testimonial: string } => Boolean(s.testimonial)
  );

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-slate-200">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 rounded-full inline-flex items-center gap-1.5">
              <Quote size={14} className="text-[#ea580c]" />
              <span>Dynamic Admin Reviews ({testimonials.length})</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              What Our Achievers Say
            </h2>
            <p className="text-xs font-medium text-slate-600 mt-1">
              Verified testimonials submitted by selected candidates &amp; managed in Admin Panel.
            </p>
          </div>

          <a
            href="/admin/results"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 border border-slate-300 text-xs font-black transition-all flex items-center gap-1.5 w-fit"
          >
            <span>Manage Reviews in Admin</span>
            <ArrowRight size={13} />
          </a>
        </div>

        {testimonials.length === 0 ? (
          <div className="rounded-3xl bg-slate-50 border-2 border-slate-200 p-8 sm:p-10 text-center max-w-2xl mx-auto space-y-3">
            <Quote size={36} className="mx-auto text-amber-500" />
            <h3 className="text-base font-black text-slate-900">No Student Reviews Added Yet</h3>
            <p className="text-xs font-semibold text-slate-600 max-w-md mx-auto leading-relaxed">
              When admin enters student feedback/quote in Admin Panel (<code className="bg-amber-100/60 px-1.5 py-0.5 rounded text-amber-900 font-mono text-[11px]">/admin/results</code>), the reviews will automatically display here in testimonial cards!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((student) => (
              <div
                key={student.id}
                className="rounded-3xl bg-slate-50 border-2 border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-amber-400 transition-all hover:bg-white"
              >
                <div>
                  <Quote size={28} className="text-[#FF9933] mb-3" />
                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed italic">
                    &ldquo;{student.testimonial}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-black text-sm flex items-center justify-center shrink-0 border-2 border-white shadow-xs">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">{student.name}</p>
                    <p className="text-[10px] font-extrabold text-[#ea580c]">Selected — {student.post} ({student.department})</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default function ResultsClient({ students }: { students: StudentItem[] }) {
  return (
    <main className="bg-slate-50 min-h-screen">
      <ResultsHero />
      <SuccessStatistics students={students} />
      <SelectedStudentCards students={students} />
      <SuccessStoryVideos students={students} />
      <Testimonials students={students} />
    </main>
  );
}