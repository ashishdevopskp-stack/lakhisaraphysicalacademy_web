"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import type { DbBlog } from "@/app/lib/action/blogs";
import Container from "./Container";

export default function BlogCarousel({ blogs }: { blogs: DbBlog[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  }

  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200/80">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#ea580c]">
              Latest Articles &amp; Updates
            </p>
            <h2 className="font-display mt-1 text-2xl sm:text-3xl font-black text-slate-900">
              Academy Blog &amp; Guides
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#ea580c] bg-orange-50 px-3.5 py-2 rounded-full border border-orange-200 hover:bg-orange-100 transition-colors mr-2"
            >
              <span>View All Blogs</span>
              <ArrowRight size={14} />
            </Link>

            <button
              type="button"
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bento-card min-w-[280px] sm:min-w-[340px] max-w-[360px] flex-shrink-0 snap-start flex flex-col justify-between p-5 bg-white shadow-sm hover:shadow-lg border border-slate-200/90 transition-all group"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 mb-4">
                  {blog.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-orange-50 text-[#ea580c]">
                      <BookOpen size={32} />
                    </div>
                  )}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white bg-slate-900/85 rounded-full backdrop-blur-md">
                    {blog.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(blog.publish_date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                  {blog.reading_time && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {blog.reading_time}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-base font-extrabold text-slate-900 group-hover:text-[#ea580c] transition-colors leading-snug line-clamp-2">
                  {blog.title}
                </h3>

                {blog.subtitle && (
                  <p className="font-body mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {blog.subtitle}
                  </p>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">By {blog.author}</span>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-xs font-black text-[#ea580c] hover:underline inline-flex items-center gap-1"
                >
                  Read Article
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
