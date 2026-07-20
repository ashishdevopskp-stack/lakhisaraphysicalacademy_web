"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Newspaper, PlayCircle, Search, Calendar, Clock, User, Eye, Download, ArrowRight,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import { BlogSubNav } from "../page";
import { BLOG_CATEGORY_LABELS, type BlogPost } from "@/app/lib/blogs-data";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

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
          <BlogSubNav current="/blogs/articles" />
        </div>
      </Container>
    </section>
  );
}

export default function ArticleListing({ blogs }: { blogs: BlogPost[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";

  const [category, setCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState("");

  const categoryOptions = useMemo(() => ["All", ...BLOG_CATEGORY_LABELS], []);

  const filtered = blogs.filter((blog) => {
    const matchesCategory = category === "All" || blog.category === category;
    const matchesQuery =
      query.trim() === "" ||
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.author.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <ArticlesHero />
      <section className="py-12 sm:py-20">
        <Container>
          <motion.div {...fadeUp} className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
              ))}
            </select>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((blog, i) => (
              <motion.div
                key={blog.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 3) * 0.05 }}
                className="card-flat flex flex-col p-6"
              >
                <div className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-lg border border-line-strong bg-bg">
                  {blog.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={blog.imageUrl} alt={blog.title} className="h-full w-full object-cover" />
                  ) : (
                    <Newspaper size={26} className="text-text-muted" />
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <Badge>{blog.category}</Badge>
                  <span className="font-body flex items-center gap-1 text-[12px] text-text-muted">
                    <Eye size={12} /> {blog.views.toLocaleString("en-IN")}
                  </span>
                </div>

                <h3 className="font-display mt-4 text-[16px] font-semibold text-text">{blog.title}</h3>
                {blog.subtitle && (
                  <p className="font-body mt-1 text-[13px] text-text-muted">{blog.subtitle}</p>
                )}

                <div className="font-body mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-text-muted">
                  <span className="flex items-center gap-1.5"><User size={13} /> {blog.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> {blog.publishDate}</span>
                  {blog.readingTime && (
                    <span className="flex items-center gap-1.5"><Clock size={13} /> {blog.readingTime}</span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button href={`/blogs/${blog.id}`} variant="primary" icon={ArrowRight}>
                    Read More
                  </Button>
                  {blog.hasVideo && blog.videoUrl && (
                    <Button href={blog.videoUrl} variant="secondary" icon={PlayCircle}>
                      Watch Video
                    </Button>
                  )}
                  {blog.hasPdf && blog.pdfUrl && (
                    <Button href={blog.pdfUrl} variant="secondary" icon={Download}>
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
    </>
  );
}