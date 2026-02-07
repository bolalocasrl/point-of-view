import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import Archive from "@/components/sections/Archive";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-white selection:text-black">
      {/* Grain Overlay */}
      <div className="grain-overlay opacity-[0.03]" />
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Events />
        <Archive />
      </main>
      
      <Footer />
    </div>
  );
}
