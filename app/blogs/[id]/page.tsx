import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar, Clock, User, Eye, PlayCircle, Download, ArrowLeft, Newspaper,
} from "lucide-react";
import { getBlog, incrementBlogViews } from "@/app/lib/action/blogs";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import { BlogSubNav } from "../page";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) notFound();

  await incrementBlogViews(id);

  return (
    <section className="pb-20 pt-16 sm:pt-24">
      <Container>
        <div className="max-w-[72ch]">
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Academy Blog
          </p>
          <div className="mt-6">
            <BlogSubNav current="/blogs/articles" />
          </div>

          <Link
            href="/blogs/articles"
            className="font-body mt-8 inline-flex items-center gap-1.5 text-[13px] text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={14} /> Back to Articles
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <Badge>{blog.category}</Badge>
            <span className="font-body flex items-center gap-1 text-[12px] text-text-muted">
              <Eye size={12} /> {blog.views.toLocaleString("en-IN")} views
            </span>
          </div>

          <h1 className="font-display mt-4 text-[28px] font-extrabold leading-[1.15] sm:text-[38px]">
            {blog.title}
          </h1>
          {blog.subtitle && (
            <p className="font-body mt-3 text-[16px] leading-relaxed text-text-muted">
              {blog.subtitle}
            </p>
          )}

          <div className="font-body mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-text-muted">
            <span className="flex items-center gap-1.5"><User size={13} /> {blog.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {blog.publish_date}</span>
            {blog.reading_time && (
              <span className="flex items-center gap-1.5"><Clock size={13} /> {blog.reading_time}</span>
            )}
          </div>

          <div className="mt-8 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl border border-line-strong bg-bg">
            {blog.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={blog.image_url} alt={blog.title} className="h-full w-full object-cover" />
            ) : (
              <Newspaper size={32} className="text-text-muted" />
            )}
          </div>

          {(blog.has_video && blog.video_url) || (blog.has_pdf && blog.pdf_url) ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {blog.has_video && blog.video_url && (
                <Button href={blog.video_url} variant="secondary" icon={PlayCircle}>
                  Watch Video
                </Button>
              )}
              {blog.has_pdf && blog.pdf_url && (
                <Button href={blog.pdf_url} variant="secondary" icon={Download}>
                  Download PDF
                </Button>
              )}
            </div>
          ) : null}

          {blog.content && (
            <div className="font-body mt-10 whitespace-pre-line text-[15px] leading-[1.8] text-text">
              {blog.content}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}