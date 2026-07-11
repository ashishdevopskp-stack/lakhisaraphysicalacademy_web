"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  Shield,
  ShieldAlert,
  Star,
  ShieldCheck,
  TrainFront,
  Flame,
  Home as HomeIcon,
  Landmark,
  Users,
  GraduationCap,
  Quote,
  UploadCloud,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
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
   2. Success Statistics
   ========================================================= */
const STATS = [
  { label: "Total Students Trained", value: "1,200+", icon: Users },
  { label: "Total Selections", value: "480+", icon: Trophy },
  { label: "Army Selections", value: "160+", icon: Shield },
  { label: "Police Selections", value: "140+", icon: ShieldAlert },
  { label: "SSC GD Selections", value: "70+", icon: ShieldCheck },
  { label: "Daroga Selections", value: "35+", icon: Star },
  { label: "Railway Selections", value: "25+", icon: TrainFront },
  { label: "Success Since", value: "2016", icon: Calendar },
];

function SuccessStatistics() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[26px] font-bold sm:text-[32px]">
          Success Statistics
        </motion.h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 8) * 0.03 }}
              className="card-flat px-4 py-6 text-center"
            >
              <Icon size={18} className="mx-auto text-signal-strong" />
              <p className="font-display mt-3 text-[24px] font-bold text-text">
                {value}
              </p>
              <p className="font-body mt-1 text-[12px] text-text-muted">{label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Success Categories
   ========================================================= */
const CATEGORIES = [
  { label: "Army", icon: Shield },
  { label: "Bihar Police", icon: ShieldAlert },
  { label: "Bihar Daroga", icon: Star },
  { label: "SSC GD", icon: ShieldCheck },
  { label: "CISF", icon: Shield },
  { label: "CRPF", icon: ShieldCheck },
  { label: "BSF", icon: ShieldAlert },
  { label: "ITBP", icon: ShieldCheck },
  { label: "Railway", icon: TrainFront },
  { label: "Fireman", icon: Flame },
  { label: "Home Guard", icon: HomeIcon },
  { label: "Other Government Jobs", icon: Landmark },
] as const;

function SuccessCategories() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[26px] font-bold sm:text-[32px]">
          Success Categories
        </motion.h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {CATEGORIES.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 6) * 0.04 }}
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
   4. Selected Student Cards — sample data
   ========================================================= */
interface SelectedStudent {
  name: string;
  post: string;
  exam: string;
  department: string;
  district: string;
  year: string;
  rank?: string;
  status: "Selected" | "Under Training" | "Document Verification";
}

const STUDENT_CATEGORY_LABELS = CATEGORIES.map((c) => c.label);

const STUDENTS: SelectedStudent[] = [
  { name: "Rohit Kumar", post: "Agniveer (GD)", exam: "Army Agniveer", department: "Army", district: "Lakhisarai", year: "2026", rank: "AIR 214", status: "Selected" },
  { name: "Priya Sharma", post: "Constable", exam: "Bihar Police Constable", department: "Bihar Police", district: "Munger", year: "2026", status: "Selected" },
  { name: "Amit Singh", post: "Sub-Inspector", exam: "Bihar Daroga (SI)", department: "Bihar Daroga", district: "Lakhisarai", year: "2025", rank: "Rank 88", status: "Selected" },
  { name: "Suman Kumari", post: "Constable (GD)", exam: "SSC GD", department: "SSC GD", district: "Sheikhpura", year: "2025", status: "Selected" },
  { name: "Deepak Yadav", post: "Constable", exam: "CRPF Recruitment", department: "CRPF", district: "Lakhisarai", year: "2025", status: "Under Training" },
  { name: "Neha Kumari", post: "Constable", exam: "BSF Recruitment", department: "BSF", district: "Jamui", year: "2024", status: "Selected" },
];

const STATUS_STYLES: Record<SelectedStudent["status"], string> = {
  Selected: "text-olive-strong",
  "Under Training": "text-signal-strong",
  "Document Verification": "text-text-faint",
};

function SelectedStudentCards() {
  const [department, setDepartment] = useState("All");
  const [year, setYear] = useState("All");
  const [query, setQuery] = useState("");

  const departmentOptions = useMemo(
    () => ["All", ...STUDENT_CATEGORY_LABELS],
    []
  );
  const yearOptions = useMemo(
    () => ["All", ...Array.from(new Set(STUDENTS.map((s) => s.year))).sort().reverse()],
    []
  );

  const filtered = STUDENTS.filter((s) => {
    const matchesDept = department === "All" || s.department === department;
    const matchesYear = year === "All" || s.year === year;
    const matchesQuery =
      query.trim() === "" ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.post.toLowerCase().includes(query.toLowerCase());
    return matchesDept && matchesYear && matchesQuery;
  });

  return (
    <section id="students" className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
          Selected Students
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
        </motion.div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((student, i) => (
            <motion.div
              key={student.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 3) * 0.05 }}
              className="card-flat flex flex-col p-6"
            >
              <div className="flex items-center gap-4">
                <div className="glass flex h-16 w-16 shrink-0 items-center justify-center rounded-full">
                  <GraduationCap size={22} className="text-text-muted" />
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
                <span
                  className={`text-[12px] font-medium ${STATUS_STYLES[student.status]}`}
                >
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

              <div className="mt-5 flex flex-wrap gap-2">
                <Button href="#" variant="primary" icon={ArrowRight}>
                  View Profile
                </Button>
                <Button href="#" variant="secondary" icon={Share2}>
                  Share Success
                </Button>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <p className="font-body col-span-full text-[14px] text-text-muted">
              No students match these filters right now.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   5. Success Story Videos — sample data
   ========================================================= */
const VIDEOS = [
  { title: "From Village to Army: Rohit's Journey", post: "Agniveer (GD)" },
  { title: "Cracking Bihar Police in First Attempt", post: "Constable" },
  { title: "My Daroga Selection Story", post: "Sub-Inspector" },
];

function SuccessStoryVideos() {
  return (
    <section id="videos" className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
          Success Story Videos
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {VIDEOS.map((video, i) => (
            <motion.div
              key={video.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat p-5"
            >
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
                {video.title}
              </p>
              <p className="font-body mt-1 text-[12px] text-text-muted">{video.post}</p>
              <div className="mt-4">
                <Button href="https://youtube.com" variant="ghost" icon={PlayCircle}>
                  Watch Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   6. Testimonials
   ========================================================= */
const TESTIMONIALS = [
  {
    name: "Rohit Kumar",
    post: "Selected — Army Agniveer",
    quote:
      "The academy's structured training and daily discipline made the difference in my physical test.",
  },
  {
    name: "Priya Sharma",
    post: "Selected — Bihar Police Constable",
    quote:
      "Coaches tracked my running times every week, which kept me accountable and improving.",
  },
  {
    name: "Amit Singh",
    post: "Selected — Bihar Daroga (SI)",
    quote:
      "Beyond fitness, the mock tests and mentoring prepared me for the entire selection process.",
  },
];

function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
          What Our Achievers Say
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat p-6"
            >
              <Quote size={18} className="text-accent-strong" />
              <p className="font-body mt-4 text-[14px] leading-relaxed text-text-muted">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-display mt-5 text-[13px] font-semibold text-text">
                {t.name}
              </p>
              <p className="font-body text-[12px] text-text-muted">{t.post}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   7. Submit Your Selection
   ========================================================= */
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
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const inputClasses =
    "glass w-full rounded-lg px-4 py-2.5 text-[14px] text-text outline-none placeholder:text-text-faint";

  return (
    <section id="submit" className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
          Submit Your Selection
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-body mt-3 max-w-[60ch] text-[15px] leading-relaxed text-text-muted"
        >
          Selected in a Defence, Police, or Government exam after training
          with us? Fill in your details below and submit via WhatsApp along
          with your photo, result screenshot, and certificate.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
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
            <Button href={whatsappHref} variant="whatsapp" icon={MessageCircle}>
              Submit via WhatsApp
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   8. Become Our Next Success Story CTA
   ========================================================= */
function NextSuccessStoryCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.div
          {...fadeUp}
          className="glass glass-sheen sheen-run relative overflow-hidden rounded-2xl px-6 py-14 text-center shadow-[var(--shadow-card)] sm:px-14"
        >
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
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              variant="whatsapp"
              icon={MessageCircle}
            >
              WhatsApp Now
            </Button>
            <Button href="tel:8863081082" variant="secondary" icon={Phone}>
              Call Now
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
export default function Results() {
  return (
    <>
      <ResultsHero />
      <SuccessStatistics />
      <SuccessCategories />
      <SelectedStudentCards />
      <SuccessStoryVideos />
      <Testimonials />
      <SubmitSelection />
      <NextSuccessStoryCTA />
    </>
  );
}