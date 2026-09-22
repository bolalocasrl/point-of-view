import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/60">Scroll</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-white to-transparent opacity-50" />
      </motion.div>
    </section>
  );
}
