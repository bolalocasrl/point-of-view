import { motion } from "framer-motion";
import { useRef } from "react";

export default function SocialHub() {
  const boloRef = useRef<HTMLVideoElement>(null);
  const bcnRef = useRef<HTMLVideoElement>(null);

  const EyeMask = () => (
    <svg width="0" height="0">
      <defs>
        <clipPath id="eye-mask" clipPathUnits="objectBoundingBox">
          <path d="M0.5,0 C0.5,0 0.1,0.5 0,0.5 C0.1,0.5 0.5,1 0.5,1 C0.5,1 0.9,0.5 1,0.5 C0.9,0.5 0.5,0 0.5,0 Z" />
        </clipPath>
      </defs>
    </svg>
  );

  const boloSrc = "/assets/tshbo_new.mp4";
  const bcnSrc = "/assets/tshbcn_new.mp4";

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-black text-white border-t border-white/10">
      <EyeMask />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
            (03) Collaborations
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight">
            The Social Hub <span className="text-white/30">x</span> Point of View
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center max-w-5xl mx-auto">
          {/* Bologna */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center group cursor-pointer"
            onMouseEnter={() => {
              if (boloRef.current) {
                boloRef.current.muted = false;
                boloRef.current.play().catch(() => {});
              }
            }}
            onMouseLeave={() => {
              if (boloRef.current) {
                boloRef.current.muted = true;
              }
            }}
          >
            <div className="relative w-full aspect-square md:aspect-[4/3] mb-8 overflow-hidden transition-transform duration-500 group-hover:scale-105">
              <div 
                className="absolute inset-0 bg-white/5"
                style={{ clipPath: "url(#eye-mask)" }}
              >
                <video 
                  ref={boloRef}
                  src={boloSrc}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  style={{ clipPath: "url(#eye-mask)" }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>
            </div>
            <h3 className="text-3xl font-display font-bold uppercase mb-2">TSH Bologna</h3>
            <p className="text-white/60 font-body uppercase tracking-widest text-sm">Past Event</p>
          </motion.div>

          {/* Barcelona */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center group cursor-pointer"
            onMouseEnter={() => {
              if (bcnRef.current) {
                bcnRef.current.muted = false;
                bcnRef.current.play().catch(() => {});
              }
            }}
            onMouseLeave={() => {
              if (bcnRef.current) {
                bcnRef.current.muted = true;
              }
            }}
          >
            <div className="relative w-full aspect-square md:aspect-[4/3] mb-8 overflow-hidden transition-transform duration-500 group-hover:scale-105">
              <div 
                className="absolute inset-0 bg-white/5"
                style={{ clipPath: "url(#eye-mask)" }}
              >
                <video 
                  ref={bcnRef}
                  src={bcnSrc}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  style={{ clipPath: "url(#eye-mask)" }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>
            </div>
            <h3 className="text-3xl font-display font-bold uppercase mb-2">TSH Barcelona</h3>
            <p className="text-white/60 font-body uppercase tracking-widest text-sm">Past Event</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
