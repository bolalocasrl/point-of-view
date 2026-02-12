import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const upcomingEvents = [
  {
    id: 1,
    date: "29 March – Barcelona",
    image: "/assets/calbi.jpg",
    ticketOptions: [
      { name: "Resident Advisor", url: "#" },
      { name: "Xceed", url: "#" },
      { name: "Shotgun", url: "#" },
      { name: "Dice", url: "#" }
    ]
  },
  {
    id: 2,
    date: "10 April – Lisbon",
    image: "/assets/forum.jpg",
    ticketOptions: [
      { name: "Resident Advisor", url: "#" },
      { name: "Xceed", url: "#" },
      { name: "Shotgun", url: "#" },
      { name: "Dice", url: "#" }
    ]
  }
];

function TicketDropdown({ options }: { options: { name: string; url: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-2 border border-white bg-transparent text-white uppercase text-xs tracking-widest font-bold hover:bg-white hover:text-black transition-colors duration-300"
      >
        Tickets
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-48 bg-black border border-white/20 z-50 shadow-xl"
          >
            <ul className="py-2">
              {options.map((option, idx) => (
                <li key={idx}>
                  <a
                    href={option.url}
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {option.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Upcoming() {
  return (
    <section id="upcoming" className="py-24 md:py-32 px-6 md:px-12 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
            (01.5) Next
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight">
            Upcoming Events
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {upcomingEvents.map((event, index) => (
            <div key={event.id} className="group relative flex flex-col gap-6">
              <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden w-full relative bg-white/5">
                 <img
                  src={event.image}
                  alt={`Event in ${event.date}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="flex flex-col items-start gap-4">
                <h3 className="text-2xl font-display uppercase font-medium">
                  {event.date}
                </h3>
                <TicketDropdown options={event.ticketOptions} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
