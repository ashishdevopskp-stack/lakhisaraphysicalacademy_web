// app/blogs/articles/page.tsx

import { Suspense } from "react";
import { getBlogs } from "@/app/lib/action/blogs";
import Container from "../../components/Container";
import { BlogSubNav } from "../_shared";
import ArticleListing from "./ArticleListing";
import type { BlogPost } from "@/app/lib/blogs-data";

export const metadata = {
  title: "Latest Articles | Academy Blog",
  description:
    "Search and filter every article from Lakhisarai Physical Academy's blog, newest first.",
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

export default async function ArticlesPage() {
  let blogs = [] as BlogPost[];
  let blogsError = false;

  try {
    blogs = (await getBlogs()) as unknown as BlogPost[];
  } catch (err) {
    console.error("Failed to load blog posts:", err);
    blogsError = true;
  }

  return (
    <>
      <ArticlesHero />
      <Suspense fallback={null}>
        <ArticleListing blogs={blogs} blogsError={blogsError} />
      </Suspense>
    </>
  );
}