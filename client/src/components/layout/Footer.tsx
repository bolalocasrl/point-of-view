import { ArrowUpRight, Instagram } from "lucide-react";
import { Link } from "wouter";
import LogoStage from "@/components/LogoStage";
import NewsletterInline from "@/components/NewsletterInline";
import { upcomingEvents } from "@/content/events";
import { openCookieSettings, TRACKING_ENABLED } from "@/lib/tracking";

export default function Footer() {
  const next = upcomingEvents()[0];
  const tickets = next?.ticketOptions.find((t) => t.url && t.url !== "#")?.url;

  return (
    <footer id="contacts" className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Rotating 3D logo */}
      <LogoStage className="h-[45vh] md:h-[60vh]" />

      {/* newsletter, always visible */}
      <div className="relative z-10 -mt-8 px-6 pb-16 md:-mt-16 md:px-12 md:pb-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-white/50">Connection</span>
          <h2 className="mb-4 font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
            Stay in<br />
            <span className="text-transparent [-webkit-text-stroke:1px_white]">the loop</span>
          </h2>
          <p className="mb-8 max-w-md text-white/60">Next dates, early tickets and merch drops. Just your email, nothing else.</p>
          <div className="flex w-full justify-center text-left">
            <NewsletterInline buttonLabel="Subscribe" />
          </div>
        </div>
      </div>

      {/* links */}
      <div className="relative z-10 border-t border-white/10 px-6 py-12 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-white/40">Next stop</span>
            {next ? (
              <>
                <p className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">{next.city}</p>
                <p className="mt-1 text-sm text-white/60">{next.date}</p>
                {tickets && (
                  <a
                    href={tickets}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-white/85"
                  >
                    Get tickets <ArrowUpRight size={14} />
                  </a>
                )}
              </>
            ) : (
              <p className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">Coming soon</p>
            )}
          </div>

          <nav aria-label="Footer">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-white/40">Explore</span>
            <ul className="space-y-1 text-sm uppercase tracking-widest">
              <li><a href="#upcoming" className="block py-2 text-white/80 transition-colors hover:text-white">Events</a></li>
              <li><Link href="/story" className="block py-2 text-white/80 transition-colors hover:text-white">Our story</Link></li>
              <li><Link href="/shop" className="block py-2 text-white/80 transition-colors hover:text-white">Shop</Link></li>
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-white/40">Contact</span>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/pointofview.events/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 uppercase tracking-widest text-white/80 transition-colors hover:text-white"
                >
                  <Instagram size={16} /> Instagram
                </a>
              </li>
              <li>
                <a href="mailto:pointofview.milan@gmail.com" className="block py-2 text-white/80 transition-colors hover:text-white">
                  pointofview.milan@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 bg-black/50 px-6 py-8 backdrop-blur-sm md:flex-row md:px-12">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-bold uppercase tracking-tight">POV</span>
          <span className="font-body text-xs uppercase tracking-widest text-white/40">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="py-2 text-[11px] uppercase tracking-widest text-white/40 transition-colors hover:text-white">Privacy</Link>
          <Link href="/terms" className="py-2 text-[11px] uppercase tracking-widest text-white/40 transition-colors hover:text-white">Terms</Link>
          {TRACKING_ENABLED && (
            <button type="button" onClick={openCookieSettings} className="py-2 text-[11px] uppercase tracking-widest text-white/40 transition-colors hover:text-white">
              Cookies
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
