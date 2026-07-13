"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  PlayCircle,
  Search,
  Calendar,
  Clock,
  User,
  Eye,
  Download,
  ArrowRight,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import { BlogSubNav } from "../page";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

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

const BLOG_CATEGORY_LABELS = [
  "Army Preparation", "Bihar Police", "Daroga (SI)", "SSC GD", "Railway",
  "Defence & Paramilitary", "Physical Training", "Fitness & Workout",
  "Diet & Nutrition", "Running Tips", "Exam Preparation", "Recruitment News",
  "Student Success Stories", "Academy Updates", "General Knowledge", "Motivation",
];

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

function ArticlesHero() {
  return (
    <section id="top" className="pb-8 pt-16 sm:pt-24">
      <Container>
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
          Academy Blog
        </p>
        <h1 className="font-display mt-5 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px]">
          Latest <span className="text-gradient-brand">Articles</span>
        </h1>
        <div className="mt-8">
          <BlogSubNav current="/blog/articles" />
        </div>
      </Container>
    </section>
  );
}

function ArticleListing() {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const categoryOptions = useMemo(() => ["All", ...BLOG_CATEGORY_LABELS], []);

  const filtered = BLOGS.filter((blog) => {
    const matchesCategory = category === "All" || blog.category === category;
    const matchesQuery =
      query.trim() === "" ||
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.author.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section className="py-12 sm:py-20">
      <Container>
        <motion.div
          {...fadeUp}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
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

export default function BlogArticles() {
  return (
    <>
      <ArticlesHero />
      <ArticleListing />
    </>
  );
}