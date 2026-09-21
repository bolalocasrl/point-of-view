import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "@/components/sections/Logopovattina";

const SPRING = { type: "spring", stiffness: 80, damping: 20 } as const;

// The rotating 3D POV logo with mouse / gyroscope parallax.
// The WebGL canvas is only mounted once the stage gets close to the viewport,
// so it costs nothing while the visitor is at the top of the page.
export default function LogoStage({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-20deg", "20deg"]);
  const moveX = useTransform(x, [-0.5, 0.5], [-5, 5]);
  const moveY = useTransform(y, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // gyroscope parallax on phones (iOS asks permission on first touch)
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      animate(x, Math.max(-0.5, Math.min(0.5, e.gamma / 45)), SPRING);
      animate(y, Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 45)), SPRING);
    };
    const requestPermission = async () => {
      const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
      if (typeof DOE.requestPermission === "function") {
        try {
          if ((await DOE.requestPermission()) === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch {
          // permission refused: the logo still rotates on its own
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };
    const onFirstTouch = () => {
      requestPermission();
      window.removeEventListener("touchstart", onFirstTouch);
      window.removeEventListener("click", onFirstTouch);
    };
    window.addEventListener("touchstart", onFirstTouch);
    window.addEventListener("click", onFirstTouch);
    return () => {
      window.removeEventListener("touchstart", onFirstTouch);
      window.removeEventListener("click", onFirstTouch);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [x, y]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    animate(x, (e.clientX - rect.left) / rect.width - 0.5, SPRING);
    animate(y, (e.clientY - rect.top) / rect.height - 0.5, SPRING);
  };
  const onLeave = () => {
    animate(x, 0, SPRING);
    animate(y, 0, SPRING);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`relative ${className}`}>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-10 blur-[120px]"
      />
      <motion.div
        style={{ rotateX, rotateY, x: moveX, y: moveY, transformStyle: "preserve-3d", perspective: 1000 }}
        className="relative z-10 mx-auto h-full w-full max-w-[900px]"
      >
        {visible && (
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
        )}
      </motion.div>
    </div>
  );
}
