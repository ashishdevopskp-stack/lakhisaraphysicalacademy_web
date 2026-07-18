import Navbar from "./components/Navbar";
import About from "./about/page";
import Admission from "./admission-form/page";
import Blog from "./blogs/page";
import Courses from "./courses/page";
import Events from "./events/page";
import Hero from "./hero/page";
import HostelSubNav from "./hostel/page";
import Jobs from "./jobs/page";
import Notifications from "./notification/page";
import Resources from "./resources/page";
import Results from "./result/page";
import Store from "./store/page";
import Videos from "./youtube-video/page";
import Contact from "./contact/page";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
     
      <Hero />
      <About />
      <Courses />
      <HostelSubNav />
       <Notifications />
      <Store  />
      <Blog />
      <Events />
      <Results />

      <Resources />
     
      <Jobs />
      <Videos />
      <Admission />
      <Contact />
      <Footer />
    </main>
  );
}