import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nextTicketUrl } from "@/content/events";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const tickets = nextTicketUrl();

  // lock the page behind the open menu; Escape closes it
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

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

  const links = [
    { label: "Events", href: "#upcoming" },
    { label: "Vision", href: "#vision" },
    { label: "Story", href: "/story" },
    { label: "Shop", href: "/shop" },
    { label: "Contacts", href: "#contacts" },
  ];

  return (
    <>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 transition-colors duration-300 mix-blend-difference text-white ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      {/* Logo always visible, but absolute positioned so it stays when nav translates up */}
      <Link href="/" className={`fixed top-4 left-6 md:left-12 block hover:opacity-70 transition-opacity z-[60]`}>
        <img src="/assets/logo-v2.png" alt="Point Of View" className="h-16 w-auto md:h-20 rounded-full" />
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium tracking-wide uppercase font-body ml-auto">
        <a href="#events" className="hover:line-through decoration-1 underline-offset-4 transition-all hidden md:block py-2">Events</a>
        <a href="#vision" className="hover:line-through decoration-1 underline-offset-4 transition-all hidden md:block py-2">Vision</a>
        <Link href="/story" className="hover:line-through decoration-1 underline-offset-4 transition-all hidden md:block py-2">Story</Link>
        <Link href="/shop" className="hover:line-through decoration-1 underline-offset-4 transition-all hidden md:block py-2">Shop</Link>
        <a 
          href="#contacts" 
          className="hidden md:block px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 font-bold"
        >
          Contacts
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="md:hidden flex h-12 w-12 items-center justify-center rounded-full border-2 border-white"
        >
          <Menu size={20} />
        </button>
      </div>
    </motion.nav>

    {/* phone menu: full-screen panel, outside the nav so the blend mode does not apply */}
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-black px-6 pb-10 pt-6 text-white md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex items-center justify-between">
            <img src="/assets/logo-v2.png" alt="Point Of View" className="h-16 w-auto rounded-full" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white"
            >
              <X size={20} />
            </button>
          </div>

          <ul className="mt-12 flex flex-1 flex-col justify-center gap-2">
            {links.map((link, i) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
              >
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-1 font-display text-5xl font-black uppercase leading-[1] tracking-tighter ${
                    i % 2 === 1 ? "text-transparent [-webkit-text-stroke:1px_white]" : ""
                  }`}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col gap-3">
            {tickets && (
              <a
                href={tickets}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-white py-4 text-xs font-black uppercase tracking-widest text-black"
              >
                Get tickets <ArrowUpRight size={14} />
              </a>
            )}
            <a
              href="https://www.instagram.com/pointofview.events/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full border-2 border-white py-4 text-xs font-bold uppercase tracking-widest"
            >
              Instagram
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
