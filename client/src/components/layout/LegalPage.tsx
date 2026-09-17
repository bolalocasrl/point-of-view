import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";

export const CONTACT_EMAIL = "POINTOFVIEW.MILAN@GMAIL.COM";

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-white/10 pt-8">
      <h2 className="text-lg md:text-xl font-display font-bold uppercase tracking-tight mb-4">{title}</h2>
      <div className="space-y-3 text-white/70 leading-relaxed">{children}</div>
    </section>
  );
}

export default function LegalPage({ label, title, updated, children }: {
  label: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} | POINT OF VIEW`;
  }, [title]);

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-white selection:text-black">
      <div className="grain-overlay opacity-[0.03]" />

      <header className="px-6 md:px-12 py-6 flex items-center justify-between border-b border-white/10">
        <Link href="/" className="block hover:opacity-70 transition-opacity">
          <img src="/assets/logo-v2.png" alt="Point Of View" className="h-16 w-auto md:h-20 rounded-full" />
        </Link>
        <Link
          href="/"
          className="px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 uppercase text-xs tracking-widest font-bold"
        >
          Back to site
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">{label}</span>
        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">{title}</h1>
        <p className="text-xs uppercase tracking-widest text-white/40 mb-12">Last updated: {updated}</p>
        <div className="space-y-10">{children}</div>
      </main>

      <footer className="border-t border-white/10 py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-white/40 uppercase tracking-widest">POV © {new Date().getFullYear()}</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Terms</Link>
        </div>
      </footer>
    </div>
  );
}
