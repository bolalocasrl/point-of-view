import { motion } from "framer-motion";
import type { Photo as PhotoData } from "@/content/story";
import Photo from "./Photo";

// Photo collage: the layout adapts to how many photos there are.
// 1 photo: wide. 2: big + narrow. 3+: big on the left, two on the right,
// the rest below in rows of three; the last row stretches so there are no gaps.
export default function Collage({ photos, onOpen }: { photos: PhotoData[]; onOpen: (index: number) => void }) {
  const layout = (i: number) => {
    const n = photos.length;
    if (n === 1) return "col-span-6 aspect-[16/10]";
    if (n === 2) return i === 0 ? "col-span-6 md:col-span-4 aspect-[4/3] md:aspect-auto" : "col-span-6 md:col-span-2 aspect-[4/3] md:aspect-[3/4]";
    if (i === 0) return "col-span-6 md:col-span-4 md:row-span-2 aspect-[4/3] md:aspect-auto";
    if (i <= 2) return "col-span-3 md:col-span-2 aspect-square";
    const rest = (n - 3) % 3;
    const inLastRow = i >= n - rest;
    if (rest === 1 && inLastRow) return "col-span-6 aspect-[16/9] md:aspect-[21/9]";
    if (rest === 2 && inLastRow) return "col-span-3 aspect-[4/3]";
    return "col-span-3 md:col-span-2 aspect-square";
  };

  return (
    <div className="grid grid-cols-6 gap-2 md:gap-3">
      {photos.map((p, i) => (
        <motion.button
          type="button"
          key={`${p.base}-${i}`}
          onClick={() => onOpen(i)}
          aria-label={`Open photo: ${p.alt}`}
          className={`group relative overflow-hidden bg-white/5 ${layout(i)}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: Math.min(i, 4) * 0.08, ease: "easeOut" }}
        >
          <Photo
            photo={p}
            sizes={photos.length === 1 || i === 0 ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 50vw"}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        </motion.button>
      ))}
    </div>
  );
}
