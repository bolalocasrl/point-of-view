import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { upcomingEvents } from "@/content/events";

// Full-screen looping video.
// - Wide screens: the video covers the whole hero (1080p file on big screens).
// - Portrait phones: covering would zoom a 16:9 video ~3.5x and blur it, so the
//   video is shown whole and sharp across the width, floating on a blurred,
//   darkened still of itself.
const WIDE_SRC = "/assets/hero-loop-1080.mp4";
const DEFAULT_SRC = "/assets/hero-loop.mp4";
const POSTER = "/assets/hero-poster.jpg";
const BACKDROP = "/assets/hero-blur.jpg";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const next = upcomingEvents()[0];
  // "Friday, October 2 — 19:00 to 02:00" → "Oct 2"
  const nextDate = (() => {
    const day = next?.date.split("—")[0].split(",")[1]?.trim();
    if (!day) return next?.date.split("—")[0].trim();
    const [month, num] = day.split(" ");
    return `${month.slice(0, 3)} ${num}`;
  })();

  useEffect(() => {
    setSrc(window.matchMedia("(min-width: 1280px)").matches ? WIDE_SRC : DEFAULT_SRC);
  }, []);

  // Some phones block autoplay (e.g. iPhone in Low Power Mode). Keep retrying
  // on the visitor's first touch or scroll, so the loop starts as soon as it may.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    video.muted = true;
    const tryPlay = () => { video.play().catch(() => {}); };
    const events = ["touchstart", "scroll", "click", "keydown"];
    const onFirst = () => {
      tryPlay();
      if (!video.paused) events.forEach((e) => window.removeEventListener(e, onFirst));
    };
    video.addEventListener("loadeddata", tryPlay);
    events.forEach((e) => window.addEventListener(e, onFirst, { passive: true }));
    tryPlay();
    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      events.forEach((e) => window.removeEventListener(e, onFirst));
    };
  }, [src]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* the brand name lives inside the video: this heading is for search engines and screen readers */}
      <h1 className="sr-only">Point of View — art and music events in Barcelona, Lisbon, Milan and Bologna</h1>

      {/* portrait backdrop: a blurred, darkened still of the video */}
      <div
        aria-hidden
        className="absolute inset-0 hidden scale-125 bg-cover bg-center opacity-70 blur-2xl portrait:block"
        style={{ backgroundImage: `url(${BACKDROP})` }}
      />

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {src && (
          <video
            ref={videoRef}
            key={src}
            src={src}
            poster={POSTER}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className="hero-video h-full w-full object-cover portrait:h-auto portrait:w-[125%] portrait:max-w-none portrait:object-contain portrait:[mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]"
          />
        )}
      </div>

      {/* vignette: dark fade at the top and bottom, clear in the middle */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-black via-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* phones: the empty band above the video gives a reason to scroll */}
      <motion.a
        href="#upcoming"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute inset-x-0 top-[17%] z-10 mx-auto hidden w-fit flex-col items-center gap-3 px-6 text-center portrait:flex"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50">Art & music events · since 2016</span>
        <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-black/30 px-5 py-3 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          {next ? <>Next stop: {next.city} · {nextDate}</> : <>Next date coming soon</>}
          <ArrowDown size={14} />
        </span>
      </motion.a>

      {/* scroll cue: bigger and animated on phones, discreet on desktop */}
      <motion.a
        href="#vision"
        aria-label="Scroll down"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 portrait:bottom-[9%]"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/60 portrait:text-xs portrait:font-bold portrait:tracking-[0.3em] portrait:text-white/80">
          <span className="portrait:hidden">Scroll</span>
          <span className="hidden portrait:inline">Scroll to enter</span>
        </span>
        <span className="relative h-12 w-[1px] overflow-hidden bg-white/20 portrait:h-20">
          <motion.span
            className="absolute left-1/2 top-0 h-3 w-[3px] -translate-x-1/2 rounded-full bg-white portrait:h-5"
            animate={{ y: ["-100%", "400%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
