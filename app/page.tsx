import Hero from "./hero/page";
import About from "./about/page";
import Courses from "./courses/page";
import BatchTimetable from "./components/BatchTimetable";
import ResultsWall from "./components/ResultsWall";
import Blog from "./blogs/page";
import Events from "./events/page";
import Resources from "./resources/page";
import Jobs from "./jobs/page";
import Videos from "./youtube-video/page";
import FAQSection from "./components/FAQSection";
import Contact from "./contact/page";
import { OrganizationSchema } from "./components/JsonLd";

export default function Home() {
  return (
    <main>
      <OrganizationSchema />
      <Hero />
      <About />
      <Courses />
      <BatchTimetable />
      <ResultsWall />
      <Blog />
      <Events />
      <Resources />
      <Jobs />
      <Videos />
      <FAQSection />
      <Contact />
    </main>
  );
}