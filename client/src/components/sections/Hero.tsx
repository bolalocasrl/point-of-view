import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Logopovattina";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw mouse position — only ever written by event handlers, so they start at exactly 0
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Guarantee zero at mount before any animation frame runs.
  // useSpring can carry stale internal physics state across Strict Mode remounts;
  // this flush prevents a non-zero initial transform.
  useEffect(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  // Springs for smooth ROTATION only — these drive tilt, not position
  const springX = useSpring(x, { stiffness: 80, damping: 20, restDelta: 0.001 });
  const springY = useSpring(y, { stiffness: 80, damping: 20, restDelta: 0.001 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-20deg", "20deg"]);

  // Parallax translation derived from RAW x/y — never spring-driven, so always exactly 0
  // at mount. Only non-zero after the first mousemove/orientation event.
  const moveX = useTransform(x, [-0.5, 0.5], [-5, 5]);
  const moveY = useTransform(y, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Gyroscope effect for mobile
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;

      // Beta: front-to-back tilt [-180, 180]. 45° is a normal holding position.
      // Gamma: left-to-right tilt [-90, 90]
      const yVal = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 45));
      const xVal = Math.max(-0.5, Math.min(0.5, e.gamma / 45));

      x.set(xVal);
      y.set(yVal);
    };

    const requestPermission = async () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch (error) {
          console.error("Error requesting device orientation permission", error);
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    const handleFirstTouch = () => {
      requestPermission();
      window.removeEventListener("touchstart", handleFirstTouch);
      window.removeEventListener("click", handleFirstTouch);
    };

    window.addEventListener("touchstart", handleFirstTouch);
    window.addEventListener("click", handleFirstTouch);

    return () => {
      window.removeEventListener("touchstart", handleFirstTouch);
      window.removeEventListener("click", handleFirstTouch);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [x, y]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
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
          ease: "easeInOut",
        }}
        className="absolute w-[500px] h-[500px] bg-white rounded-full blur-[120px] opacity-10 pointer-events-none"
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          x: moveX,
          y: moveY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 flex flex-col items-center justify-center w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-[100] w-full max-w-[900px] h-[60vh] md:h-[70vh] flex items-center justify-center mx-auto"
        >
          <Canvas
            camera={{ position: [0, 0, 10], fov: 45 }}
            style={{ width: "100%", height: "100%", background: "transparent" }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={2} />
              <directionalLight position={[10, 10, 10]} intensity={3} />
              <directionalLight position={[-10, -10, -10]} intensity={1.5} />
              <Model />
            </Suspense>
          </Canvas>
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
