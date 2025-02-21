import Hero from "@/components/landingPage/Hero";
//import Slides from "@/components/landingPage/Slides";
import About from "@/components/landingPage/About";
import Video from "@/components/landingPage/Video";

export default function Home() {
  return (
    <div className="container-fluid px-0">
      <Hero />
      {/* <Slides /> */}
      <About />
      <Video />
    </div>
  );
}
