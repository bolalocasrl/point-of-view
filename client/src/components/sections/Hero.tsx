import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Full-screen looping video. Phones get a lighter 720p file.
const DESKTOP_SRC = "/assets/hero-loop.mp4";
const MOBILE_SRC = "/assets/hero-loop-mobile.mp4";
const POSTER = "/assets/hero-poster.jpg";

export default function Hero() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(window.matchMedia("(max-width: 767px)").matches ? MOBILE_SRC : DESKTOP_SRC);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        {src && (
          <video
            ref={(el) => { if (el) el.muted = true; }}
            key={src}
            src={src}
            poster={POSTER}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        )}
        {/* vignette: dark fade at the top and bottom, clear in the middle */}
        <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-black via-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

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
