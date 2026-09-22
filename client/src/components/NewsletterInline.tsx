import { useState, type FormEvent } from "react";
import { trackLead } from "@/lib/tracking";

// Inline newsletter form: same endpoint as the popup (/api/subscribe → Brevo).
export default function NewsletterInline({ buttonLabel = "Join the list" }: { buttonLabel?: string }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, website: "" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      try { localStorage.setItem("pov-newsletter", JSON.stringify({ status: "subscribed", at: Date.now() })); } catch {}
      trackLead(buttonLabel.toLowerCase().replace(/\s+/g, "-"));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="font-display text-xl font-bold uppercase tracking-tight">
        You're in. <span className="text-white/50">We'll write when the next date is out.</span>
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-xl flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="YOUR@EMAIL.COM"
          aria-label="Email address"
          className="flex-1 border border-white/30 bg-transparent px-5 py-4 text-sm tracking-widest outline-none transition-colors placeholder:text-white/30 focus:border-white"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-white/85 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : buttonLabel}
        </button>
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-white/60">
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
      {status === "error" && <p className="text-xs text-red-400">Something went wrong. Please try again.</p>}
    </form>
  );
}
