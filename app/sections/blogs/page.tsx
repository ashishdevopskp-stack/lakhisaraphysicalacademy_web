"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  PlayCircle,
  MessageCircle,
  Search,
  Calendar,
  Clock,
  User,
  Eye,
  Download,
  ArrowRight,
  Bell,
  Video,
  Shield,
  ShieldAlert,
  Star,
  ShieldCheck,
  TrainFront,
  Siren,
  Activity,
  Dumbbell,
  Salad,
  Flame,
  Target,
  Megaphone,
  Trophy,
  Clapperboard,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const WHATSAPP_NUMBER = "918863081082";

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

/* Reusable soft gradient wash for section backgrounds — matches About/Courses/Hostel */
function SectionGlow({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const images = {
    1: "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(34,197,94,0.08), transparent 55%)",
    2: "radial-gradient(ellipse 900px 500px at 90% 10%, rgba(20,184,166,0.10), transparent 55%), radial-gradient(ellipse 800px 500px at 5% 90%, rgba(37,99,235,0.08), transparent 55%)",
    3: "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(34,197,94,0.09), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(37,99,235,0.08), transparent 55%)",
  };
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: images[variant] }}
    />
  );
}

/* =========================================================
   1. Hero
   ========================================================= */
function BlogHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Academy Blog
          </p>

          <h1 className="font-display mt-5 max-w-[22ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
            Academy Blog &amp;{" "}
            <span className="text-gradient-brand">Knowledge Hub</span>
          </h1>

          <p className="font-body mt-5 text-[15.5px] font-medium text-text">
            Expert articles, preparation tips, fitness guides, recruitment
            updates &amp; student success stories.
          </p>

          <p className="font-body mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
            Stay informed with the latest blogs on government job
            preparation, physical fitness, running techniques, nutrition,
            motivation, recruitment updates, and academy news. Learn from
            expert guidance to improve your performance and achieve your
            career goals.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#blogs" variant="primary" icon={Newspaper}>
              Read Latest Blogs
            </Button>
            <Button href="#videos" variant="secondary" icon={PlayCircle}>
              Watch Video Guides
            </Button>
            <Button
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              variant="secondary"
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
   2. Blog Categories
   ========================================================= */
const CATEGORIES = [
  { label: "Army Preparation", icon: Shield },
  { label: "Bihar Police", icon: ShieldAlert },
  { label: "Daroga (SI)", icon: Star },
  { label: "SSC GD", icon: ShieldCheck },
  { label: "Railway", icon: TrainFront },
  { label: "Defence & Paramilitary", icon: Siren },
  { label: "Physical Training", icon: Activity },
  { label: "Fitness & Workout", icon: Dumbbell },
  { label: "Diet & Nutrition", icon: Salad },
  { label: "Running Tips", icon: Flame },
  { label: "Exam Preparation", icon: Target },
  { label: "Recruitment News", icon: Megaphone },
  { label: "Student Success Stories", icon: Trophy },
  { label: "Academy Updates", icon: Clapperboard },
  { label: "General Knowledge", icon: GraduationCap },
  { label: "Motivation", icon: Sparkles },
] as const;

function BlogCategories() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal"
        >
          Browse By Topic
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Blog Categories
        </motion.h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {CATEGORIES.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 8) * 0.03 }}
              className="card-flat flex flex-col items-center gap-2 px-3 py-5 text-center"
            >
              <Icon size={20} className="text-signal" />
              <span className="font-body text-[12px] text-text-muted">{label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Latest Blog Listings — sample data, wire to your CMS/API
   ========================================================= */
interface BlogPost {
  title: string;
  subtitle: string;
  author: string;
  publishDate: string;
  category: string;
  readingTime: string;
  views: number;
  hasVideo?: boolean;
  hasPdf?: boolean;
}

const BLOG_CATEGORY_LABELS = CATEGORIES.map((c) => c.label);

const BLOGS: BlogPost[] = [
  {
    title: "How to Improve Your 1.6 KM Run Time for Army PET",
    subtitle: "Pacing, breathing, and training drills that actually move the needle",
    author: "Coach Ravi Kumar",
    publishDate: "05 Jul 2026",
    category: "Running Tips",
    readingTime: "6 min read",
    views: 2140,
    hasVideo: true,
  },
  {
    title: "Bihar Police Constable PET: Complete Standards & Scoring",
    subtitle: "Height, chest, race, and long jump norms explained",
    author: "Coach Ravi Kumar",
    publishDate: "01 Jul 2026",
    category: "Bihar Police",
    readingTime: "8 min read",
    views: 3320,
    hasPdf: true,
  },
  {
    title: "Diet Plan for Physical Test Aspirants",
    subtitle: "What to eat before and after training for faster recovery",
    author: "Dr. Anjali Singh",
    publishDate: "26 Jun 2026",
    category: "Diet & Nutrition",
    readingTime: "5 min read",
    views: 1580,
  },
  {
    title: "SSC GD Recruitment 2026: Notification Highlights",
    subtitle: "Eligibility, vacancies, and important dates at a glance",
    author: "Academy Desk",
    publishDate: "18 Jun 2026",
    category: "Recruitment News",
    readingTime: "4 min read",
    views: 4210,
    hasPdf: true,
  },
  {
    title: "From First Attempt to Selection: A Student's Journey",
    subtitle: "How one of our students cleared the Daroga physical test",
    author: "Academy Desk",
    publishDate: "10 Jun 2026",
    category: "Student Success Stories",
    readingTime: "7 min read",
    views: 1890,
    hasVideo: true,
  },
  {
    title: "Strength Training Routine for Recruitment Aspirants",
    subtitle: "A 4-week plan to build the strength these tests demand",
    author: "Coach Manish Yadav",
    publishDate: "02 Jun 2026",
    category: "Fitness & Workout",
    readingTime: "6 min read",
    views: 1420,
  },
];

function LatestBlogs() {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const categoryOptions = useMemo(
    () => ["All", ...BLOG_CATEGORY_LABELS],
    []
  );

  const filtered = BLOGS.filter((blog) => {
    const matchesCategory = category === "All" || blog.category === category;
    const matchesQuery =
      query.trim() === "" ||
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.author.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="blogs" className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
          Latest Blog Listings
        </motion.h2>

        {/* Search & Filter */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="card-flat flex flex-1 items-center gap-2 px-4 py-2.5">
            <Search size={16} className="shrink-0 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or author"
              className="font-body w-full bg-transparent text-[14px] text-text outline-none placeholder:text-text-muted"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="card-flat font-body px-4 py-2.5 text-[14px] text-text outline-none"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((blog, i) => (
            <motion.div
              key={blog.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 3) * 0.05 }}
              className="card-flat flex flex-col p-6"
            >
              <div className="flex aspect-[16/9] items-center justify-center rounded-lg border border-line-strong bg-bg">
                <Newspaper size={26} className="text-text-muted" />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <Badge>{blog.category}</Badge>
                <span className="font-body flex items-center gap-1 text-[12px] text-text-muted">
                  <Eye size={12} /> {blog.views.toLocaleString("en-IN")}
                </span>
              </div>

              <h3 className="font-display mt-4 text-[16px] font-semibold text-text">
                {blog.title}
              </h3>
              <p className="font-body mt-1 text-[13px] text-text-muted">
                {blog.subtitle}
              </p>

              <div className="font-body mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-text-muted">
                <span className="flex items-center gap-1.5">
                  <User size={13} /> {blog.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} /> {blog.publishDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} /> {blog.readingTime}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button href="#" variant="primary" icon={ArrowRight}>
                  Read More
                </Button>
                {blog.hasVideo && (
                  <Button href="#" variant="secondary" icon={PlayCircle}>
                    Watch Video
                  </Button>
                )}
                {blog.hasPdf && (
                  <Button href="#" variant="secondary" icon={Download}>
                    Download PDF
                  </Button>
                )}
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <p className="font-body col-span-full text-[14px] text-text-muted">
              No articles match these filters right now.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   4. Popular Topics
   ========================================================= */
const POPULAR_TOPICS = [
  "Running Tips",
  "Physical Test Preparation",
  "Government Job Updates",
  "Diet Plans",
  "Workout Routines",
  "Success Stories",
  "Motivation",
  "Recruitment News",
];

function PopularTopics() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
          Popular Topics
        </motion.h2>

        <div className="mt-10 flex flex-wrap gap-2.5">
          {POPULAR_TOPICS.map((topic, i) => (
            <motion.a
              key={topic}
              href="#blogs"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 8) * 0.03 }}
              className={`pill ${PILL_COLORS[i % PILL_COLORS.length]} font-body text-[13px] transition-transform hover:scale-[1.03]`}
            >
              {topic}
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   5. Video Learning — sample data
   ========================================================= */
const VIDEOS = [
  { title: "Running Technique for PET", duration: "8:24" },
  { title: "Army Physical Test Guidance", duration: "12:10" },
  { title: "Bihar Police PET Preparation", duration: "9:47" },
];

function VideoLearning() {
  return (
    <section id="videos" className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={3} />
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
          Video Learning
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {VIDEOS.map((video, i) => (
            <motion.div
              key={video.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat p-5"
            >
              <div className="flex aspect-video items-center justify-center rounded-lg border border-line-strong bg-bg">
                <PlayCircle size={30} className="text-signal" />
              </div>
              <p className="font-display mt-4 text-[14px] font-semibold text-text">
                {video.title}
              </p>
              <p className="font-body mt-1 text-[12px] text-text-muted">
                {video.duration}
              </p>
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
   6. Stay Updated CTA (gradient rounded container — matches About FinalCTA)
   ========================================================= */
function StayUpdatedCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-14"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 800px 400px at 15% 0%, rgba(37,99,235,0.35), transparent 60%), radial-gradient(ellipse 700px 400px at 90% 100%, rgba(34,197,94,0.28), transparent 55%)",
            }}
          />
          <div className="relative">
            <Bell size={26} className="mx-auto text-white" />
            <h2 className="font-display mx-auto mt-4 max-w-[28ch] text-[28px] font-bold text-white sm:text-[38px]">
              Never Miss a New Blog or Recruitment Update!
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                variant="primary"
                icon={MessageCircle}
              >
                Join WhatsApp Channel
              </Button>
              <Button href="https://youtube.com" variant="primary" icon={Video}>
                Subscribe on YouTube
              </Button>
              <Button href="#blogs" variant="secondary" icon={Newspaper}>
                Read Latest Articles
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function Blog() {
  return (
    <>
      <BlogHero />
      <BlogCategories />
      <LatestBlogs />
      <PopularTopics />
      <VideoLearning />
      <StayUpdatedCTA />
    </>
  );
}