import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { srcSetPhoto, urlPhoto, type Photo } from "@/content/story";

type Props = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  caption?: string;
};

// Full-screen viewer: arrows, keyboard and swipe
export default function Lightbox({ photos, index, onClose, caption }: Props) {
  const [current, setCurrent] = useState(index ?? 0);
  const [direction, setDirection] = useState(0);
  const isOpen = index !== null;

  useEffect(() => {
    if (index !== null) setCurrent(index);
  }, [index]);

  const go = (step: number) => {
    setDirection(step);
    setCurrent((i) => (i + step + photos.length) % photos.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, photos.length]);

  const item = photos[current];

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col bg-black/95 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between p-4 md:p-6">
            <span className="font-body text-xs tracking-widest text-white/60">
              {String(current + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={onClose} aria-label="Close" className="p-2 transition-colors hover:text-white/60">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 md:px-20" onClick={onClose}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={item.base}
                src={urlPhoto(item, 2400)}
                srcSet={srcSetPhoto(item)}
                sizes="100vw"
                alt={item.alt}
                custom={direction}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -80 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                drag={photos.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  if (info.offset.x > 80) go(-1);
                }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full cursor-grab select-none object-contain active:cursor-grabbing"
                draggable={false}
              />
            </AnimatePresence>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => { e.stopPropagation(); go(-1); }}
                  className="absolute left-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-black md:flex"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => { e.stopPropagation(); go(1); }}
                  className="absolute right-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-black md:flex"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div className="min-h-[3.5rem] p-4 text-center font-body text-xs uppercase tracking-widest text-white/60 md:p-6">
            {caption ?? item.alt}
            {photos.length > 1 && <span className="mt-1 block text-[10px] text-white/30 md:hidden">Swipe to change photo</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
