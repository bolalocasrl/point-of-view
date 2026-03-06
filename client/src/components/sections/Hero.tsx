import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import logoModelUrl from "@assets/logopovattina.glb?url";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

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

  // Gyroscope effect for mobile
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      
      // Beta: front-to-back tilt [-180, 180]. 45 deg is a normal holding position.
      // Gamma: left-to-right tilt [-90, 90]
      let yVal = (e.beta - 45) / 45; 
      let xVal = e.gamma / 45;
      
      // Clamp values
      yVal = Math.max(-0.5, Math.min(0.5, yVal));
      xVal = Math.max(-0.5, Math.min(0.5, xVal));
      
      x.set(xVal);
      y.set(yVal);
    };

    const requestPermission = async () => {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.error("Error requesting device orientation permission", error);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    // Request permission on first touch interaction
    const handleFirstTouch = () => {
      requestPermission();
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };
    
    window.addEventListener('touchstart', handleFirstTouch);
    window.addEventListener('click', handleFirstTouch);
    
    return () => {
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [x, y]);

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
          className="relative z-[100] w-[120px] md:w-[160px] h-[80px] flex items-center justify-center mx-auto"
        >
          <model-viewer
            src={logoModelUrl}
            alt="POINT OF VIEW 3D Logo"
            bounds="tight"
            reveal="auto"
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="10deg"
            shadow-intensity="1"
            exposure="1.2"
            environment-image="neutral"
            disable-zoom
            disable-pan
            disable-tap
            camera-controls="false"
            interaction-prompt="none"
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          ></model-viewer>
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
