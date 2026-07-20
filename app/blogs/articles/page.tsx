import { getBlogs } from "@/app/lib/action/blogs";
import ArticleListing from "./ArticleListing";
import type { BlogPost } from "@/app/lib/blogs-data";

export default async function BlogArticlesPage() {
  const dbBlogs = await getBlogs();

  const blogs: BlogPost[] = dbBlogs.map((b) => ({
    id: b.id,
    title: b.title,
    subtitle: b.subtitle,
    content: b.content,
    author: b.author,
    publishDate: b.publish_date,
    category: b.category,
    readingTime: b.reading_time,
    views: b.views,
    hasVideo: b.has_video,
    hasPdf: b.has_pdf,
    videoUrl: b.video_url,
    pdfUrl: b.pdf_url,
    imageUrl: b.image_url,
  }));

  return <ArticleListing blogs={blogs} />;
}