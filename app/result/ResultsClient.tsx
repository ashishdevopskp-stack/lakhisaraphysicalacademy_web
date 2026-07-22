"use client";

import { useMemo, useState, type MouseEvent } from "react";
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
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { PHONE_NUMBER, whatsappHref, telHref } from "@/app/lib/constants";
import {
  DEPARTMENTS,
  DEPARTMENT_ICONS,
  TOTAL_STUDENTS_TRAINED,
  ACADEMY_SUCCESS_SINCE,
  type StudentItem,
  type SelectionStatus,
} from "../lib/results-data";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "./_ResultsMotion";

function ResultsHero() {
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
        <FadeInUp className="max-w-[62ch]">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            Success Stories
          </p>

          <h1 className="font-display mt-5 max-w-[20ch] text-[32px] font-bold sm:text-[42px] lg:text-[50px]">
            Our Selected Students
          </h1>

          <p className="font-body mt-5 text-[15px] font-medium text-text">
            Celebrating the success stories of our proud achievers.
          </p>

          <p className="font-body mt-4 text-[15px] leading-relaxed text-text-muted">
            Our students have achieved remarkable success in various
            Defence, Police, Paramilitary, Railway, and Government
            recruitment examinations. Explore their inspiring journeys and
            celebrate their achievements with us.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#students" variant="primary" icon={Trophy}>
              View Success Stories
            </Button>
            <Button href="#submit" variant="secondary" icon={ClipboardList}>
              Submit Your Selection
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

function SuccessStatistics({ students }: { students: StudentItem[] }) {
  const countByDept = (dept: string) =>
    students.filter((s) => s.department === dept).length;

  const stats = [
    { label: "Total Students Trained", value: TOTAL_STUDENTS_TRAINED, icon: Users },
    { label: "Total Selections", value: `${students.length}+`, icon: Trophy },
    { label: "Army Selections", value: `${countByDept("Army")}+`, icon: DEPARTMENT_ICONS.Army },
    {
      label: "Police Selections",
      value: `${countByDept("Bihar Police")}+`,
      icon: DEPARTMENT_ICONS["Bihar Police"],
    },
    {
      label: "SSC GD Selections",
      value: `${countByDept("SSC GD")}+`,
      icon: DEPARTMENT_ICONS["SSC GD"],
    },
    {
      label: "Daroga Selections",
      value: `${countByDept("Bihar Daroga")}+`,
      icon: DEPARTMENT_ICONS["Bihar Daroga"],
    },
    {
      label: "Railway Selections",
      value: `${countByDept("Railway")}+`,
      icon: DEPARTMENT_ICONS.Railway,
    },
    { label: "Success Since", value: ACADEMY_SUCCESS_SINCE, icon: Calendar },
  ];

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <ScrollFadeUp as="h2" className="font-display text-[26px] font-bold sm:text-[32px]">
          Success Statistics
        </ScrollFadeUp>

        <StaggerList className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <StaggerItem key={label} className="card-flat px-4 py-6 text-center">
              <Icon size={18} className="mx-auto text-signal-strong" />
              <p className="font-display mt-3 text-[24px] font-bold text-text">{value}</p>
              <p className="font-body mt-1 text-[12px] text-text-muted">{label}</p>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

function SuccessCategories() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <ScrollFadeUp as="h2" className="font-display text-[26px] font-bold sm:text-[32px]">
          Success Categories
        </ScrollFadeUp>

        <StaggerList className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {DEPARTMENTS.map((label) => {
            const Icon = DEPARTMENT_ICONS[label];
            return (
              <StaggerItem
                key={label}
                className="card-flat flex flex-col items-center gap-2 px-3 py-5 text-center"
              >
                <Icon size={20} className="text-signal-strong" />
                <span className="font-body text-[12px] text-text-muted">{label}</span>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </Container>
    </section>
  );
}

const STATUS_STYLES: Record<SelectionStatus, string> = {
  Selected: "text-olive-strong",
  "Under Training": "text-signal-strong",
  "Document Verification": "text-text-faint",
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
      title: `${student.name}'s Success Story`,
      text: `${student.name} was selected as ${student.post} — check out their journey!`,
      url: shareUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled the native share sheet — fall through to clipboard copy
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(student.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // clipboard blocked (no HTTPS / no permission) — nothing more to do silently
    }
  };

  return (
    <section id="students" className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp as="h2" className="font-display text-[28px] font-bold sm:text-[34px]">
          Selected Students
        </ScrollFadeUp>

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
              placeholder="Search by name or post"
              className="w-full bg-transparent text-[14px] text-text outline-none placeholder:text-text-faint"
            />
          </div>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="glass rounded-lg px-4 py-2.5 text-[14px] text-text outline-none"
          >
            {departmentOptions.map((d) => (
              <option key={d} value={d}>
                {d === "All" ? "All Departments" : d}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="glass rounded-lg px-4 py-2.5 text-[14px] text-text outline-none"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y === "All" ? "All Years" : y}
              </option>
            ))}
          </select>
        </ScrollFadeUp>

        {filtered.length === 0 ? (
          <p className="font-body mt-8 text-[14px] text-text-muted">
            No students match these filters right now.
          </p>
        ) : (
          <StaggerList className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((student) => (
              <StaggerItem key={student.id} className="card-flat flex flex-col p-6">
                <div className="flex items-center gap-4">
                  <div className="glass flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full">
                    {student.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={student.photoUrl}
                        alt={student.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <GraduationCap size={22} className="text-text-muted" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-[16px] font-semibold text-text">
                      {student.name}
                    </h3>
                    <p className="font-body mt-0.5 text-[13px] text-text-muted">
                      {student.post}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Badge>{student.department}</Badge>
                  <span className={`text-[12px] font-medium ${STATUS_STYLES[student.status]}`}>
                    ● {student.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-1.5 text-[13px] text-text-muted">
                  <span className="flex items-center gap-2">
                    <ClipboardList size={14} /> {student.exam}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={14} /> {student.district}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={14} /> {student.year}
                  </span>
                  {student.rank && (
                    <span className="flex items-center gap-2">
                      <Award size={14} /> {student.rank}
                    </span>
                  )}
                </div>

                {/* <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    href={`/result/${student.id}`}
                    variant="primary"
                    icon={ArrowRight}
                  >
                    View Profile
                  </Button>
                  <button
                    type="button"
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      handleShare(student);
                    }}
                    className="btn btn-secondary text-[14px] inline-flex items-center gap-2"
                  >
                    {copiedId === student.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Share2 className="h-4 w-4" />
                    )}
                    {copiedId === student.id ? "Link Copied" : "Share Success"}
                  </button>
                </div> */}
              </StaggerItem>
            ))}
          </StaggerList>
        )}
      </Container>
    </section>
  );
}

function SuccessStoryVideos({ students }: { students: StudentItem[] }) {
  const videos = students.filter(
    (s): s is StudentItem & { videoUrl: string } => Boolean(s.videoUrl)
  );

  if (videos.length === 0) return null;

  return (
    <section id="videos" className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp as="h2" className="font-display text-[28px] font-bold sm:text-[34px]">
          Success Story Videos
        </ScrollFadeUp>

        <StaggerList className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {videos.map((student) => (
            <StaggerItem key={student.id} className="card-flat p-5">
              <div
                className="flex aspect-video items-center justify-center rounded-lg border border-line"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 75%)",
                }}
              >
                <PlayCircle size={30} className="text-signal-strong" />
              </div>
              <p className="font-body mt-4 text-[14px] font-medium text-text">
                {student.name}&rsquo;s Journey
              </p>
              <p className="font-body mt-1 text-[12px] text-text-muted">{student.post}</p>
              <div className="mt-4">
                <Button href={student.videoUrl} variant="ghost" icon={PlayCircle}>
                  Watch Now
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

function Testimonials({ students }: { students: StudentItem[] }) {
  const testimonials = students.filter(
    (s): s is StudentItem & { testimonial: string } => Boolean(s.testimonial)
  );

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp as="h2" className="font-display text-[28px] font-bold sm:text-[34px]">
          What Our Achievers Say
        </ScrollFadeUp>

        <StaggerList className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {testimonials.map((student) => (
            <StaggerItem key={student.id} className="card-flat p-6">
              <Quote size={18} className="text-accent-strong" />
              <p className="font-body mt-4 text-[14px] leading-relaxed text-text-muted">
                &ldquo;{student.testimonial}&rdquo;
              </p>
              <p className="font-display mt-5 text-[13px] font-semibold text-text">
                {student.name}
              </p>
              <p className="font-body text-[12px] text-text-muted">
                Selected &mdash; {student.post}
              </p>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

function SubmitSelection() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    exam: "",
    post: "",
    rank: "",
    status: "Selected",
    village: "",
    district: "",
    pincode: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const message = `Hello Lakhisarai Physical Academy, I would like to submit my selection details:\nName: ${form.name}\nMobile: ${form.mobile}\nExam Name: ${form.exam}\nSelected Post: ${form.post}\nRank/Score: ${form.rank}\nSelection Status: ${form.status}\nVillage/City: ${form.village}\nDistrict: ${form.district}\nPIN Code: ${form.pincode}\nI will share my photo, result screenshot, and certificate on WhatsApp.`;
  const submitHref = whatsappHref(encodeURIComponent(message));

  const inputClasses =
    "glass w-full rounded-lg px-4 py-2.5 text-[14px] text-text outline-none placeholder:text-text-faint";

  return (
    <section id="submit" className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp as="h2" className="font-display text-[28px] font-bold sm:text-[34px]">
          Submit Your Selection
        </ScrollFadeUp>
        <ScrollFadeUp
          as="p"
          delay={0.05}
          className="font-body mt-3 max-w-[60ch] text-[15px] leading-relaxed text-text-muted"
        >
          Selected in a Defence, Police, or Government exam after training
          with us? Fill in your details below and submit via WhatsApp along
          with your photo, result screenshot, and certificate.
        </ScrollFadeUp>

        <ScrollFadeUp
          delay={0.1}
          className="mt-8 grid max-w-[820px] grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <input className={inputClasses} placeholder="Full Name *" value={form.name} onChange={(e) => update("name", e.target.value)} />
          <input className={inputClasses} placeholder="Mobile Number *" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} />
          <input className={inputClasses} placeholder="Exam Name *" value={form.exam} onChange={(e) => update("exam", e.target.value)} />
          <input className={inputClasses} placeholder="Selected Post *" value={form.post} onChange={(e) => update("post", e.target.value)} />
          <input className={inputClasses} placeholder="Rank / Score" value={form.rank} onChange={(e) => update("rank", e.target.value)} />
          <select className={inputClasses} value={form.status} onChange={(e) => update("status", e.target.value)}>
            <option>Selected</option>
            <option>Under Training</option>
            <option>Document Verification</option>
          </select>
          <input className={inputClasses} placeholder="Village / City *" value={form.village} onChange={(e) => update("village", e.target.value)} />
          <input className={inputClasses} placeholder="District *" value={form.district} onChange={(e) => update("district", e.target.value)} />
          <input className={inputClasses} placeholder="PIN Code" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} />

          <div className="glass flex items-center gap-3 rounded-lg px-4 py-2.5 text-[13px] text-text-muted sm:col-span-2">
            <UploadCloud size={16} className="shrink-0 text-signal-strong" />
            Photo, result screenshot, and certificate can be shared directly in the WhatsApp chat after tapping submit.
          </div>

          <div className="sm:col-span-2">
            <Button href={submitHref} variant="whatsapp" icon={MessageCircle}>
              Submit via WhatsApp
            </Button>
          </div>
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

function NextSuccessStoryCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp className="glass glass-sheen sheen-run relative overflow-hidden rounded-2xl px-6 py-14 text-center shadow-[var(--shadow-card)] sm:px-14">
          <span className="ribbon-bar absolute inset-x-0 top-0 h-[4px]" aria-hidden />
          <Trophy size={26} className="mx-auto text-accent-strong" />
          <h2 className="font-display mx-auto mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]">
            Become Our Next Success Story
          </h2>
          <p className="font-body mx-auto mt-3 max-w-[48ch] text-[15px] leading-relaxed text-text-muted">
            Ready to achieve your dream? Join Lakhisarai Physical Academy
            today and start your journey toward success.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/admission" variant="primary" icon={ClipboardList}>
              Apply for Admission
            </Button>
            <Button
              href={`https://wa.me/${PHONE_NUMBER}`}
              variant="whatsapp"
              icon={MessageCircle}
            >
              WhatsApp Now
            </Button>
            <Button href={telHref()} variant="secondary" icon={Phone}>
              Call Now
            </Button>
          </div>
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

export default function ResultsClient({ students }: { students: StudentItem[] }) {
  return (
    <>
      <ResultsHero />
      <SuccessStatistics students={students} />
      <SuccessCategories />
      <SelectedStudentCards students={students} />
      <SuccessStoryVideos students={students} />
      <Testimonials students={students} />
  
      <NextSuccessStoryCTA />
    </>
  );
}