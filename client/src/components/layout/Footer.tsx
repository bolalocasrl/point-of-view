import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacts" className="relative bg-black border-t border-white/10 text-white overflow-hidden">
      {/* Creative Logo Background / Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
        <img 
          src="/assets/logo-v2.png" 
          alt="" 
          className="w-[150vw] md:w-[80vw] max-w-[1200px] aspect-square object-contain mix-blend-screen filter grayscale"
        />
      </div>
      <div className="relative z-10 py-32 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-8">
          (05) Connection
        </span>
        
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-12 text-white">Never lose your p.o.v.</h2>

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
            href="mailto:pointofview.milan@gmail.com"
            className="flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white transition-colors duration-300 uppercase text-xs tracking-widest font-medium"
          >
            <Mail size={14} />
            pointofview.milan@gmail.com
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
          <a href="#" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
