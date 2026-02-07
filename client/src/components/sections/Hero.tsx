import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_70%)]" />
      
      {/* Animated Gradient Blob */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute w-[500px] h-[500px] bg-white rounded-full blur-[120px] opacity-10 pointer-events-none"
      />

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-sm md:text-base uppercase tracking-[0.5em] mb-4 text-white/60 font-body"
        >
          Art & Music Events
        </motion.p>
        
        <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter text-white font-display mix-blend-difference">
          <span className="block overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              POINT
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block italic text-stroke text-transparent hover:text-white transition-colors duration-500 cursor-default"
            >
              OF VIEW
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
