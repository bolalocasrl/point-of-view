import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { getConsent, TRACKING_ENABLED, trackLead } from "@/lib/tracking";

// Signups go to /api/subscribe, which adds them to the Brevo list server-side
// (see api/subscribe.js). The Brevo key never reaches the browser.
const SUBSCRIBE_URL = "/api/subscribe";

const STORAGE_KEY = "pov-newsletter";
const DISMISS_DAYS = 7;
const SCROLL_TRIGGER = 0.35; // share of the page the visitor must scroll
const DELAY_MS = 4000; // wait after the scroll trigger

function readState(): { status: string; at: number } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(status: "dismissed" | "subscribed") {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ status, at: Date.now() }));
  } catch {
    // storage not available: the popup may show again, that's fine
  }
}

function shouldShow() {
  // wait until the visitor has answered the cookie banner
  if (TRACKING_ENABLED && getConsent() === null) return false;
  const state = readState();
  if (!state) return true;
  if (state.status === "subscribed") return false;
  return Date.now() - state.at > DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    if (!shouldShow()) return;
    let timer: number | undefined;

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0 || window.scrollY / scrollable < SCROLL_TRIGGER) return;
      window.removeEventListener("scroll", onScroll);
      timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    if (status !== "done") saveState("dismissed");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setStatus("sending");

    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, website: "" }),
      });
      if (!res.ok) throw new Error(`subscribe: ${res.status}`);
      saveState("subscribed");
      trackLead("popup");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="newsletter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-black border border-white/20 text-white p-8 md:p-12 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
              (POV) Newsletter
            </span>

            {status === "done" ? (
              <>
                <h2 id="newsletter-title" className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-4">
                  You're in
                </h2>
                <p className="text-white/70 mb-8">We'll let you know about the next events and merch drops first.</p>
                <button
                  onClick={close}
                  className="px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-all duration-300 uppercase text-xs tracking-widest font-black"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h2 id="newsletter-title" className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-4">
                  Stay in the <span className="text-transparent [-webkit-text-stroke:1px_white]">loop</span>
                </h2>
                <p className="text-white/70 mb-8">
                  Next events, early tickets and merch drops. Just your email, nothing else.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR@EMAIL.COM"
                    aria-label="Email address"
                    className="w-full bg-transparent border border-white/30 focus:border-white outline-none px-5 py-4 text-sm tracking-widest placeholder:text-white/30 transition-colors"
                  />
                  <label className="flex items-start gap-3 text-xs text-white/60 leading-relaxed cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 accent-white"
                    />
                    <span>
                      I agree to receive emails from Point of View. I can unsubscribe at any time.{" "}
                      <a href="/privacy" target="_blank" className="underline hover:text-white">Privacy Policy</a>
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-2 px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 disabled:opacity-60 transition-all duration-300 uppercase text-xs tracking-widest font-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  >
                    {status === "sending" ? "Sending..." : "Subscribe"}
                  </button>
                  {status === "error" && (
                    <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
