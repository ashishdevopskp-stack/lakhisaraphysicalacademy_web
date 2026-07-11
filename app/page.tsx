import Navbar from "./components/Navbar";
import About from "./sections/about/page";
import Blog from "./sections/blogs/page";
import Courses from "./sections/courses/page";
import Events from "./sections/events/page";
import Hero from "./sections/hero/page";
import Hostel from "./sections/hostel/page";
import Notifications from "./sections/notification/page";
import Resources from "./sections/resources/page";
import Results from "./sections/result/page";
import Store from "./sections/store/page";

export default function Home() {
  return (
    <main>
      {/* <Navbar /> */}
      <Hero />
      <About />
      <Courses />
      <Hostel />
      <Blog />
      <Events />
      <Results />
      <Store />
      <Resources />
      <Notifications />
    </main>
  );
}