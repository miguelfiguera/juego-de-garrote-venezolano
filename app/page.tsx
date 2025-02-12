import Navbar from "@/components/GeneralUse/Navbar";
import Hero from "@/components/landingPage/Hero";
import Slides from "@/components/landingPage/Slides";
import Footer from "@/components/GeneralUse/Footer";

export default function Home() {
  return (
    <div className="container-fluid px-0">
      <Navbar />
      <Hero />
      <Slides />
      <Footer />
    </div>
  );
}
