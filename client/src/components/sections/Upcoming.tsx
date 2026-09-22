import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import NewsletterInline from "@/components/NewsletterInline";
import { upcomingEvents } from "@/content/events";

function TicketDropdown({ options }: { options: { name: string; url: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const validOptions = options.filter(option => option.url && option.url !== "#");

  useEffect(() => {
    if (validOptions.length === 0) return;
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [validOptions.length]);

  if (validOptions.length === 0) {
    return (
      <span className="inline-block px-6 py-2 border border-white/30 text-white/50 uppercase text-xs tracking-widest font-bold">
        Tickets coming soon
      </span>
    );
  }

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
              {validOptions.map((option, idx) => (
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
  // re-evaluated on every visit: a finished event drops off on its own
  const events = upcomingEvents();

  return (
    <section id="upcoming" className="py-24 md:py-32 px-6 md:px-12 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
            (02) Next
          </span>
          <SectionTitle solid="Upcoming" outline="Events" />
        </div>
        {events.length === 0 && (
          <div className="grid grid-cols-1 items-end gap-10 border-l border-white/20 pl-4 md:grid-cols-2 md:pl-8">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-white/50">Next Stop</p>
              <h3 className="font-display text-4xl font-bold uppercase leading-none tracking-tight md:text-6xl">
                Coming<br />
                <span className="text-transparent [-webkit-text-stroke:1px_white]">soon</span>
              </h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
                We are working on the next date. Join the list and you will be the first to know — early tickets included.
              </p>
            </div>
            <NewsletterInline buttonLabel="Notify me" />
          </div>
        )}
        <div className="grid grid-cols-1 gap-12">
          {events.map((event) => (
            <div key={event.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

              <div className="flex flex-col items-start gap-6 md:gap-8 order-1 md:order-2 w-full max-w-full">
                <div className="flex flex-col gap-2 border-l border-white/20 pl-4 md:pl-6 py-2 w-full">
                  <p className="text-sm text-white/50 uppercase tracking-widest font-bold mb-1 md:mb-2">Next Stop</p>
                  <h3 className="text-4xl md:text-6xl font-display uppercase font-bold tracking-tight break-words">
                    {event.city}
                  </h3>
                  <p className="text-lg md:text-2xl font-display uppercase font-bold tracking-tight text-white/70 mt-1">
                    {event.title}
                  </p>
                  <div className="text-base md:text-xl font-body text-white/80 mt-4 space-y-2">
                    <p><span className="text-white/40">Date:</span> {event.date}</p>
                    <p><span className="text-white/40">Location:</span> {event.venue}</p>
                    <p><span className="text-white/40">Line-up:</span> {event.lineup}</p>
                    <p className="text-sm md:text-base text-white/50 pt-2 leading-relaxed">{event.blurb}</p>
                  </div>
                </div>
                <div className="mt-2 md:mt-4 w-full hidden md:block">
                  <TicketDropdown options={event.ticketOptions} />
                </div>
              </div>

              <div className="flex flex-col gap-4 order-2 md:order-1">
                <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden w-full relative bg-white/5">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={`Event in ${event.city}`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 border border-white/10 flex flex-col items-center justify-center gap-4 text-center p-8">
                      <span className="text-xs font-bold uppercase tracking-widest text-white/40">Flyer</span>
                      <span className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-transparent [-webkit-text-stroke:1px_white]">
                        Coming<br />Soon
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-white/40">{event.city} — 02.10</span>
                    </div>
                  )}
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