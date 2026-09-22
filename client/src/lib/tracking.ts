// Cookie consent + Meta Pixel.
//
// The pixel is only loaded when BOTH are true:
//  1. VITE_META_PIXEL_ID is set on Vercel (the ID from Meta Events Manager — it is
//     public by nature, it ends up in the page anyway), and
//  2. the visitor pressed "Accept" in the cookie banner.
// Without an ID there is no banner and nothing is tracked.

export const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() || "";
export const TRACKING_ENABLED = PIXEL_ID !== "";

const KEY = "pov-consent";
export type Consent = "all" | "necessary";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[]; loaded: boolean; version: string; push: unknown };
declare global {
  interface Window { fbq?: Fbq; _fbq?: Fbq }
}

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try { localStorage.setItem(KEY, value); } catch {}
  window.dispatchEvent(new CustomEvent("pov-consent", { detail: value }));
  if (value === "all") loadPixel();
}

// Lets the footer link reopen the banner
export function openCookieSettings() {
  window.dispatchEvent(new Event("pov-cookie-settings"));
}

let loaded = false;
export function loadPixel() {
  if (loaded || !TRACKING_ENABLED || getConsent() !== "all") return;
  loaded = true;
  // standard Meta snippet, written out so it only runs after consent
  const fbq = function (...args: unknown[]) {
    fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

export function trackPageView() {
  if (loaded) window.fbq?.("track", "PageView");
}

// Newsletter signup = the conversion the ads optimise for
export function trackLead(source: string) {
  if (loaded) window.fbq?.("track", "Lead", { content_name: `newsletter-${source}` });
}
