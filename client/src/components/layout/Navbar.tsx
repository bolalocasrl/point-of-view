import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for styling
      setScrolled(currentScrollY > 50);
      
      // Hide on scroll down, show on scroll up (or top of page)
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 transition-colors duration-300 mix-blend-difference text-white ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      {/* Logo always visible, but absolute positioned so it stays when nav translates up */}
      <Link href="/">
        <a className={`fixed top-4 left-6 md:left-12 block hover:opacity-70 transition-opacity z-[60]`}>
          <img src="/assets/logo-v2.png" alt="Point Of View" className="h-16 w-auto md:h-20 rounded-full" />
        </a>
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium tracking-wide uppercase font-body ml-auto">
        <a href="#events" className="hover:line-through decoration-1 underline-offset-4 transition-all hidden md:block">Events</a>
        <a href="#vision" className="hover:line-through decoration-1 underline-offset-4 transition-all hidden md:block">Vision</a>
        <a href="#products" className="hover:line-through decoration-1 underline-offset-4 transition-all hidden md:block">Products</a>
        <a 
          href="#contacts" 
          className="px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 font-bold"
        >
          Contacts
        </a>
      </div>
    </motion.nav>
  );
}
