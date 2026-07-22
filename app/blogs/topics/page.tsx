// app/blogs/topics/page.tsx

import Container from "../../components/Container";
import { BlogSubNav } from "../_shared";
import { StaggerList, StaggerItem } from "../_BlogMotion";

export const metadata = {
  title: "Popular Topics | Academy Blog",
  description:
    "Quick-jump into the academy blog's most-read topics — running tips, physical test prep, diet plans, motivation and more.",
};

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

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

function TopicsHero() {
  return (
    <section id="top" className="pb-8 pt-16 sm:pt-24">
      <Container>
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
          Academy Blog
        </p>
        <h1 className="font-display mt-5 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px]">
          Popular <span className="text-gradient-brand">Topics</span>
        </h1>
        <div className="mt-8">
          <BlogSubNav current="/blogs/topics" />
        </div>
      </Container>
    </section>
  );
}

function TopicsGrid() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <StaggerList className="flex flex-wrap gap-2.5" staggerDelay={0.03}>
          {POPULAR_TOPICS.map((topic, i) => (
            <StaggerItem key={topic} hover>
              <a
                href={`/blogs/articles?category=${encodeURIComponent(topic)}`}
                className={`pill ${PILL_COLORS[i % PILL_COLORS.length]} font-body text-[13px] transition-transform hover:scale-[1.03]`}
              >
                {topic}
              </a>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

export default function BlogTopics() {
  return (
    <>
      <TopicsHero />
      <TopicsGrid />
    </>
  );
}