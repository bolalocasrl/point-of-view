import { Instagram } from "lucide-react";
import { Link } from "wouter";
import LogoStage from "@/components/LogoStage";

export default function Footer() {
  return (
    <footer id="contacts" className="relative bg-black border-t border-white/10 text-white overflow-hidden">
      {/* Rotating 3D logo */}
      <LogoStage className="h-[55vh] md:h-[70vh]" />

      <div className="relative z-10 -mt-8 pb-20 md:-mt-16 md:pb-32 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-8">
          Connection
        </span>

        <div className="flex flex-col items-center gap-6">
          <a
            href="https://www.instagram.com/pointofview.events/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase text-sm tracking-widest font-bold bg-transparent"
          >
            <Instagram size={18} />
            Follow Us
          </a>
          <a
            href="mailto:POINTOFVIEW.MILAN@GMAIL.COM"
            className="text-xs tracking-widest text-white/60 hover:text-white transition-colors"
          >
            POINTOFVIEW.MILAN@GMAIL.COM
          </a>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl font-display font-bold tracking-tight uppercase">POV</span>
          <span className="text-xs text-white/40 font-body uppercase tracking-widest">
            © {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex gap-6">
          <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
