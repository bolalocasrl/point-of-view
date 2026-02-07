import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-4">
          <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-4 sticky top-32">
            (01) The Concept
          </span>
        </div>
        
        <div className="md:col-span-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight text-white mb-12 font-display"
          >
            We curate immersive <span className="italic text-white/50">sonic landscapes</span> where electronic music meets visual art.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, duration: 0.8 }}
            >
              <p className="text-lg text-white/80 font-body leading-relaxed">
                Point Of View is a Barcelona-based collective exploring the intersection of underground club culture and experimental art installation. We believe the dancefloor is a space for radical expression.
              </p>
            </motion.div>
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p className="text-lg text-white/80 font-body leading-relaxed">
                Our events are not just parties; they are carefully crafted experiences designed to alter perception and challenge the conventional club format. Expect raw techno, hypnotic grooves, and immersive visuals.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
