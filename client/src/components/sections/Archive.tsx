import { motion } from "framer-motion";

const archiveItems = [
  "/assets/archive-1.png",
  "/assets/archive-2.png",
  "/assets/archive-3.png",
  "/assets/archive-4.png",
  "/assets/archive-5.png",
  "/assets/archive-6.png",
  "/assets/archive-1.png", // Duplicate for fullness if needed
  "/assets/archive-2.png", // Duplicate for fullness if needed
];

export default function Archive() {
  return (
    <section className="relative h-[80vh] w-full bg-black overflow-hidden flex items-center justify-center perspective-1000 border-t border-white/10">
      {/* Center Content */}
      <div className="absolute z-20 text-center pointer-events-none mix-blend-difference text-white">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight mb-2"
        >
          Past Events
        </motion.h2>
        <p className="text-sm md:text-base font-body uppercase tracking-[0.3em] opacity-60">
          Archives of Sound & Vision
        </p>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative w-full h-full flex items-center justify-center preserve-3d">
        <div className="carousel-container relative w-[300px] h-[400px] preserve-3d animate-spin-slow">
          {archiveItems.map((src, index) => {
            // Calculate rotation for each item based on total items
            const rotateY = index * (360 / archiveItems.length);
            const translateZ = 450; // Distance from center

            return (
              <div
                key={index}
                className="absolute inset-0 w-full h-full backface-hidden"
                style={{
                  transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                }}
              >
                <div className="w-full h-full bg-neutral-900 border border-white/10 overflow-hidden group hover:border-white/40 transition-colors duration-300">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <img
                    src={src}
                    alt={`Archive poster ${index + 1}`}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS for custom 3D animations */}
      <style>{`
        .perspective-1000 {
          perspective: 1200px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          /* Webkit fix for some browsers */
          -webkit-backface-visibility: hidden; 
        }
        
        @keyframes spin-slow {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
        
        .animate-spin-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Vignette Overlay for depth integration */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_30%,#000000_100%)] z-10" />
    </section>
  );
}
