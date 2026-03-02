import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Upcoming from "@/components/sections/Upcoming";
import Events from "@/components/sections/Events";
import Archive from "@/components/sections/Archive";
import SocialHub from "@/components/sections/SocialHub";
import Merch from "@/components/sections/Merch";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-white selection:text-black">
      {/* Grain Overlay */}
      <div className="grain-overlay opacity-[0.03]" />
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Upcoming />
        <Events />
        <Archive />
        <SocialHub />
        <Merch />
      </main>
      
      <Footer />
    </div>
  );
}
