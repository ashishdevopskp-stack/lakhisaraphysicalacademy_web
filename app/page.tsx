import Hero from "./hero/page";
import CategoryExplorer from "./components/CategoryExplorer";
import About from "./about/page";
import Courses from "./courses/page";
import BatchTimetable from "./components/BatchTimetable";
import ResultsWall from "./components/ResultsWall";
import BlogCarousel from "./components/BlogCarousel";
import Events from "./events/page";
import Resources from "./resources/page";
import Jobs from "./jobs/page";
import Videos from "./youtube-video/page";
import FAQSection from "./components/FAQSection";
import Contact from "./contact/page";
import { OrganizationSchema } from "./components/JsonLd";
import { getBlogs } from "./lib/action/blogs";
import { getResults } from "./lib/action/results";
import { getBatches } from "./lib/action/batches";

export default async function Home() {
  const [blogs, results, batches] = await Promise.all([
    getBlogs(),
    getResults(),
    getBatches(),
  ]);

  return (
    <main>
      <OrganizationSchema />
      <Hero />

      {/* Interactive Category & Subcategory Explorer Hub */}
      <CategoryExplorer />

      <About />
      {/* Blog carousel near the top as requested */}
      <BlogCarousel blogs={blogs} />
      <Courses />
      <BatchTimetable liveBatches={batches} />
      <ResultsWall results={results} />

      <Events />
      <Resources />
      <Jobs />
      <Videos />
      <FAQSection />
      <Contact />
    </main>
  );
}