"use client";

import { motion } from "framer-motion";
import Container from "../../components/Container";
import { BlogSubNav } from "../page";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

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
        <div className="flex flex-wrap gap-2.5">
          {POPULAR_TOPICS.map((topic, i) => (
            <motion.a
              key={topic}
              href={`/blogs/articles?category=${encodeURIComponent(topic)}`}
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

export default function BlogTopics() {
  return (
    <>
      <TopicsHero />
      <TopicsGrid />
    </>
  );
}