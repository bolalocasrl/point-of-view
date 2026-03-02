import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contacts" className="relative bg-black border-t border-white/10 text-white overflow-hidden">
      {/* Creative Logo Background / Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-[150vw] md:w-[80vw] max-w-[1200px] aspect-square flex items-center justify-center">
        <motion.img 
          src="/assets/logo-v2.png" 
          alt="" 
          className="w-full h-full object-contain mix-blend-screen filter grayscale"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 py-32 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-8">
          (05) Connection
        </span>
        
        <a 
          href="https://www.instagram.com/pointofview.events/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group block mb-12"
        >
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-display font-black uppercase tracking-tighter leading-none hover:text-transparent hover:text-stroke transition-all duration-500">
            Follow<br />The Vision
          </h2>
        </a>

        <a 
          href="mailto:pointofview.milan@gmail.com"
          className="text-lg md:text-xl font-body text-white/60 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1"
        >
          pointofview.milan@gmail.com
        </a>
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
