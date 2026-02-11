import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 transition-all duration-300 mix-blend-difference text-white ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <Link href="/">
        <a className="block hover:opacity-70 transition-opacity">
          <img src="/assets/logo-brasil.png" alt="Point Of View" className="h-12 w-auto md:h-16 rounded-full" />
        </a>
      </Link>

      <div className="flex items-center gap-8 text-sm font-medium tracking-wide uppercase font-body">
        <a href="#about" className="hover:line-through decoration-1 underline-offset-4 transition-all hidden md:block">About</a>
        <a href="#events" className="hover:line-through decoration-1 underline-offset-4 transition-all hidden md:block">Events</a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300"
        >
          Follow
        </a>
      </div>
    </motion.nav>
  );
}
