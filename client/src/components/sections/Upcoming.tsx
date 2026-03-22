import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const upcomingEvents = [
  {
    id: 1,
    city: "Barcelona",
    date: "April 5",
    venue: "Poblenou",
    lineup: "Nesi, Matale, E.DUE.S, Sr. Vinegar",
    image: "/assets/calbi.jpg",
    ticketOptions: [
      { name: "Resident Advisor", url: "https://it.ra.co/events/2394961" },
      { name: "Xceed", url: "#" },
      { name: "Shotgun", url: "https://shotgun.live/en/events/point-of-view-resurrection-night" },
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
              <a href={option.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors">{option.name}</a>
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
        <div className="grid grid-cols-1 gap-12">
          {upcomingEvents.map((event, index) => (
            <div key={event.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

              <div className="flex flex-col items-start gap-6 md:gap-8 order-1 md:order-2 w-full max-w-full">
                <div className="flex flex-col gap-2 border-l border-white/20 pl-4 md:pl-6 py-2 w-full">
                  <p className="text-sm text-white/50 uppercase tracking-widest font-bold mb-1 md:mb-2">Next Stop</p>
                  <h3 className="text-4xl md:text-6xl font-display uppercase font-bold tracking-tight break-words">
                    {event.city}
                  </h3>
                  <div className="text-base md:text-xl font-body text-white/80 mt-4 space-y-2">
                    <p><span className="text-white/40">Date:</span> {event.date}</p>
                    <p><span className="text-white/40">Location:</span> {event.venue}</p>
                    <p><span className="text-white/40">Line-up:</span> {event.lineup}</p>
                  </div>
                </div>
                <div className="mt-2 md:mt-4 w-full hidden md:block">
                  <TicketDropdown options={event.ticketOptions} />
                </div>
              </div>

              <div className="flex flex-col gap-4 order-2 md:order-1">
                <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden w-full relative bg-white/5">
                  <img
                    src={event.image}
                    alt={`Event in ${event.city}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="mt-2 md:hidden">
                  <TicketDropdown options={event.ticketOptions} />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}