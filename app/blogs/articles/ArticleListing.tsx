// app/blogs/articles/_ArticleListing.tsx
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Newspaper, PlayCircle, Search, Calendar, Clock, User, Eye, Download, ArrowRight, AlertCircle } from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import { BLOG_CATEGORY_LABELS, type BlogPost } from "@/app/lib/blogs-data";
import { ScrollFadeUp, StaggerList, StaggerItem } from "../_BlogMotion";

export default function ArticleListing({
  blogs,
  blogsError = false,
}: {
  blogs: BlogPost[];
  blogsError?: boolean;
}) {
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
    <section className="py-12 sm:py-20">
      <Container>
        {blogsError && (
          <div className="mb-6 flex items-start gap-2 rounded-lg border border-line bg-white/[0.03] px-4 py-3">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-accent-strong" />
            <p className="font-body text-[13px] text-text-muted">
              We couldn&apos;t load articles right now. Please refresh the page
              or check back shortly.
            </p>
          </div>
        )}

        <ScrollFadeUp className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
        </ScrollFadeUp>

        <StaggerList
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.05}
        >
          {filtered.map((blog) => (
            <StaggerItem key={blog.id} className="card-flat flex flex-col p-6">
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
            </StaggerItem>
          ))}

          {filtered.length === 0 && !blogsError && (
            <p className="font-body col-span-full text-[14px] text-text-muted">
              No articles match these filters right now.
            </p>
          )}
        </StaggerList>
      </Container>
    </section>
  );
}