import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { CHAPTERS, STORY_COVER, STORY_DRAFT, STORY_INTRO, type Photo as PhotoData } from "@/content/story";
import Photo from "@/components/story/Photo";
import Collage from "@/components/story/Collage";
import Lightbox from "@/components/story/Lightbox";

// While in draft: keep the page out of search engines
function useDraftMeta() {
  useEffect(() => {
    if (!STORY_DRAFT) return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
}

export default function Story() {
  useDraftMeta();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<{ photos: PhotoData[]; index: number; caption: string } | null>(null);

  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    document.title = "Story | POINT OF VIEW";
    window.scrollTo(0, 0);
  }, []);

  const current = CHAPTERS[active];
  const goTo = (i: number) =>
    document.getElementById(`chapter-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-black font-body text-white selection:bg-white selection:text-black">
      <div className="grain-overlay opacity-[0.03]" />

      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/60 px-6 py-4 backdrop-blur-md md:px-12">
        <Link href="/" className="block transition-opacity hover:opacity-70">
          <img src="/assets/logo-v2.png" alt="Point Of View" className="h-14 w-auto rounded-full md:h-16" />
        </Link>
        <Link
          href="/"
          className="rounded-full border-2 border-white px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 hover:bg-white hover:text-black md:px-6"
        >
          Back to site
        </Link>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">
        {STORY_COVER && (
          <motion.div className="absolute inset-0" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: "easeOut" }}>
            <Photo photo={STORY_COVER} sizes="100vw" fetchPriority="high" className="h-full w-full object-cover" />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <motion.div
          className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 md:px-12 md:pb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        >
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-white/60">(POV) Since 2016</span>
          <h1 className="font-display text-6xl font-black uppercase leading-[0.85] tracking-tighter md:text-[10rem]">
            Our<br />
            <span className="text-transparent [-webkit-text-stroke:1px_white]">Story</span>
          </h1>
          <p className="mt-8 max-w-xl leading-relaxed text-white/75 md:text-lg">{STORY_INTRO}</p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-white/40">
            {CHAPTERS[0].year} — {CHAPTERS[CHAPTERS.length - 1].year} · {CHAPTERS.length} chapters
          </p>
        </motion.div>
      </section>

      {/* TIMELINE */}
      <main ref={timelineRef} className="relative mx-auto grid max-w-[1600px] grid-cols-1 border-t border-white/10 lg:grid-cols-12">
        {/* big year, desktop */}
        <aside className="hidden border-r border-white/10 lg:col-span-4 lg:block">
          <div className="sticky top-24 flex h-[calc(100vh-6rem)] flex-col justify-between p-12 xl:p-16">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-white/40">Timeline</span>
              <motion.p
                key={current?.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-display text-8xl font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_white] xl:text-9xl"
              >
                {current?.year}
              </motion.p>
            </div>
            <ol className="space-y-3">
              {CHAPTERS.map((c, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className={`flex items-center gap-3 text-left text-sm transition-colors ${i === active ? "text-white" : "text-white/35 hover:text-white/70"}`}
                  >
                    <span className={`h-[1px] transition-all duration-500 ${i === active ? "w-10 bg-white" : "w-4 bg-white/30"}`} />
                    <span className="w-12 font-body text-xs">{c.year}</span>
                    <span className="max-w-[14rem] truncate uppercase tracking-wide">{c.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        {/* chapters */}
        <div className="relative lg:col-span-8">
          <div className="absolute bottom-0 left-6 top-0 w-[1px] bg-white/10 md:left-12" />
          <motion.div className="absolute bottom-0 left-6 top-0 w-[1px] origin-top bg-white md:left-12" style={{ scaleY: progress }} />

          {CHAPTERS.map((c, i) => (
            <motion.section
              key={i}
              id={`chapter-${i}`}
              className="relative scroll-mt-24 border-b border-white/10 py-16 pl-14 pr-6 last:border-b-0 md:py-24 md:pl-24 md:pr-12"
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: "-45% 0px -45% 0px" }}
            >
              <span
                className={`absolute left-6 top-[4.6rem] h-3 w-3 -translate-x-1/2 rounded-full border transition-colors duration-500 md:left-12 md:top-[6.6rem] ${
                  i <= active ? "border-white bg-white" : "border-white/40 bg-black"
                }`}
              />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="mb-10 max-w-2xl"
              >
                <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-white/50">{c.date}</span>
                <h2 className="mb-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">{c.title}</h2>
                <p className="text-lg leading-relaxed text-white/65">{c.text}</p>
              </motion.div>

              {c.photos.length > 0 && (
                <Collage photos={c.photos} onOpen={(index) => setOpen({ photos: c.photos, index, caption: `${c.date} — ${c.title}` })} />
              )}
            </motion.section>
          ))}
        </div>
      </main>

      {/* KEEP EXPLORING */}
      <section className="border-t border-white/10 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-white/50">Next chapter</span>
          <h2 className="mb-10 font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl">
            Be part<br />
            <span className="text-transparent [-webkit-text-stroke:1px_white]">of it</span>
          </h2>
          <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3">
            {[
              { label: "Upcoming events", text: "The next night on the calendar.", href: "/#upcoming", internal: true },
              { label: "The collection", text: "Every tee carries a night of this story.", href: "/shop", internal: true },
              { label: "Instagram", text: "Photos and videos from every night.", href: "https://www.instagram.com/pointofview.events/", internal: false },
            ].map((item) => {
              const inner = (
                <div className="group flex h-full flex-col justify-between bg-black p-6 transition-colors hover:bg-white/5 md:p-8">
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight">{item.label}</h3>
                    <p className="mt-2 text-sm text-white/50">{item.text}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center text-xs font-bold uppercase tracking-widest">
                    {item.internal ? "Go" : <><Instagram size={14} className="mr-2" /> Follow</>}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              );
              return item.internal ? (
                <a key={item.label} href={item.href} className="block">{inner}</a>
              ) : (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-center justify-between gap-6 border-t border-white/10 px-6 py-10 md:flex-row md:px-12">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-bold uppercase tracking-tight">POV</span>
          <span className="text-xs uppercase tracking-widest text-white/40">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-white/40 transition-colors hover:text-white">Privacy</Link>
          <Link href="/terms" className="text-[10px] uppercase tracking-widest text-white/40 transition-colors hover:text-white">Terms</Link>
        </div>
      </footer>

      {STORY_DRAFT && (
        <div className="fixed bottom-4 left-4 z-[60] bg-white px-3 py-2 text-[10px] font-black uppercase tracking-widest text-black shadow-lg">
          Draft — not public yet
        </div>
      )}

      <Lightbox photos={open?.photos ?? []} index={open ? open.index : null} caption={open?.caption} onClose={() => setOpen(null)} />
    </div>
  );
}
