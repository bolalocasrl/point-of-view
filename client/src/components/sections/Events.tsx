import { motion } from "framer-motion";

const events = [
  {
    id: 1,
    date: "MAR 14",
    title: "SENSORY OVERLOAD",
    location: "Secret Warehouse, Poblenou",
    image: "/assets/event-1.png",
    status: "Upcoming"
  },
  {
    id: 2,
    date: "APR 02",
    title: "LIQUID METAL",
    location: "Input Dance Club",
    image: "/assets/event-2.png",
    status: "Tickets Soon"
  },
  {
    id: 3,
    date: "MAY 20",
    title: "RED SHIFT",
    location: "Razzmatazz (The Loft)",
    image: "/assets/event-3.png",
    status: "Announced"
  }
];

export default function Events() {
  return (
    <section id="events" className="py-24 md:py-32 px-6 md:px-12 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
              (02) Agenda
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight">
              Upcoming
            </h2>
          </div>
          <button className="hidden md:block px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase text-xs tracking-widest font-bold">
            View Archive
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden mb-6 bg-white/5 relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 border border-white/10 rounded-full">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white">
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-start border-b border-white/10 pb-4 group-hover:border-white/40 transition-colors">
                <div>
                  <h3 className="text-2xl font-display font-bold uppercase mb-1 group-hover:text-stroke transition-all duration-300">
                    {event.title}
                  </h3>
                  <p className="text-sm text-white/60 font-body uppercase tracking-wide">
                    {event.location}
                  </p>
                </div>
                <span className="text-xl font-display font-light text-white/80">
                  {event.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 md:hidden">
           <button className="w-full px-6 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase text-xs tracking-widest font-bold">
            View Archive
          </button>
        </div>
      </div>
    </section>
  );
}
