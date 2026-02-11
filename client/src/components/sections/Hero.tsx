import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the tilt
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Transform mouse position to rotation degrees
  // Range: -20 to 20 degrees tilt
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-20deg", "20deg"]);

  // Add subtle movement (parallax)
  const moveX = useTransform(mouseX, [-0.5, 0.5], ["-20px", "20px"]);
  const moveY = useTransform(mouseY, [-0.5, 0.5], ["-20px", "20px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    const mouseXVal = (e.clientX - rect.left) / width - 0.5;
    const mouseYVal = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseXVal);
    y.set(mouseYVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black perspective-[1000px]"
      style={{ perspective: 1000 }}
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
        style={{ 
          rotateX, 
          rotateY, 
          x: moveX, 
          y: moveY,
          transformStyle: "preserve-3d" 
        }}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[80vw] max-w-[600px] aspect-[16/9] flex items-center justify-center"
        >
          {/* 
            Using mix-blend-mode: screen to effectively remove the black background 
            from the white logo. This is efficient and requires no external processing.
          */}
          <img 
            src="/assets/logo-final.png" 
            alt="POINT OF VIEW" 
            className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
