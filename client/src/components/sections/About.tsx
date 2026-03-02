import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="vision" className="py-24 md:py-32 px-6 md:px-12 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-4">
          <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-4 sticky top-32">
            (01) Vision
          </span>
        </div>
        
        <div className="md:col-span-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight text-white mb-16 font-display"
          >
            Immersive experiences where <span className="italic text-white/50">electronic music and art</span> coexist in a single point of view.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6 opacity-80">History</h3>
              <p className="text-lg text-white/90 font-body leading-relaxed mb-4">
                Point Of View was born in 2016.
              </p>
              <p className="text-lg text-white/60 font-body leading-relaxed">
                Milan — Lisbon — Barcelona — Formentera — Bologna.
              </p>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3, duration: 0.8 }}
            >
               <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6 opacity-80">Focus</h3>
              <p className="text-lg text-white/90 font-body leading-relaxed mb-4">
                Not just music, but a visual, sonic and spatial experience.
              </p>
              <p className="text-lg text-white/60 font-body leading-relaxed mb-2">
                DJs — Scenographers — Performance — Visual & Light Design.
              </p>
              <p className="text-base text-white/40 font-body leading-relaxed mt-4">
                The audience doesn't observe, they are part of the environment.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
