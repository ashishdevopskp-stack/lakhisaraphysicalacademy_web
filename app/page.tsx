import Navbar from "./components/Navbar";
import Hero from "./sections/hero/page";
import About from "./sections/about/page";
import Courses from "./sections/courses/page";
import ResultsPage from "./sections/result/page";
import Jobs from "./sections/jobs/page";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Courses />
      <Jobs />
      <ResultsPage />



    </main>
  );
}