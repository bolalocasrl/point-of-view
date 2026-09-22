import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "wouter";
import { getConsent, loadPixel, setConsent, trackPageView, TRACKING_ENABLED } from "@/lib/tracking";

// Shown only when a Meta Pixel ID is configured and the visitor has not chosen yet.
// "Only necessary" is as easy to press as "Accept" (GDPR: no nudging).
export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    if (!TRACKING_ENABLED) return;
    if (getConsent() === null) setOpen(true);
    else loadPixel();
    const reopen = () => setOpen(true);
    window.addEventListener("pov-cookie-settings", reopen);
    return () => window.removeEventListener("pov-cookie-settings", reopen);
  }, []);

  // single-page app: tell Meta about every page change
  useEffect(() => {
    trackPageView();
  }, [location]);

  if (!TRACKING_ENABLED) return null;

  const choose = (value: "all" | "necessary") => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-3 bottom-3 z-[105] border border-white/20 bg-black p-5 text-white shadow-[0_0_40px_rgba(0,0,0,0.6)] md:inset-x-auto md:bottom-6 md:right-6 md:max-w-md md:p-6"
        >
          <p className="mb-1 font-display text-sm font-bold uppercase tracking-tight">Cookies</p>
          <p className="mb-5 text-sm leading-relaxed text-white/70">
            We use a Meta pixel to understand which of our ads bring people here. It only runs if you accept.{" "}
            <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => choose("all")}
              className="flex-1 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-white/85"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose("necessary")}
              className="flex-1 rounded-full border-2 border-white px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
            >
              Only necessary
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
