import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const events = [
  {
    id: 1,
    date: "FEB 2025",
    title: "HOUSE NATION",
    location: "Bologna",
    video: "/assets/bolognahousenation.webm",
    status: "Italy"
  },
  {
    id: 2,
    date: "JUL 2025",
    title: "CAPARICA",
    location: "Lisbon",
    video: "/assets/guiporatosito.webm",
    status: "Portugal"
  },
  {
    id: 3,
    date: "NOV 2025",
    title: "FORUM STATION",
    location: "Barcelona",
    video: "/assets/forumstationsito.webm",
    status: "Spain"
  }
];

function VideoCard({ event, index, isActive, onToggle }: { event: typeof events[0], index: number, isActive: boolean, onToggle: (e: React.MouseEvent) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
    }
  }, [isActive]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches && videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches && videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`group relative cursor-pointer ${isActive ? 'active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onToggle}
    >
      <div className="aspect-[3/4] overflow-hidden mb-6 bg-white/5 relative">
        <div className="absolute inset-0 bg-black/20 md:group-hover:bg-transparent group-[.active]:bg-transparent transition-colors z-10 pointer-events-none" />
        
        <div className="w-full h-full transition-transform duration-700 ease-[0.16,1,0.3,1] md:group-hover:scale-105 group-[.active]:scale-105">
             <video 
              ref={videoRef}
              src={event.video}
              preload="none"
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-80 md:group-hover:opacity-100 group-[.active]:opacity-100 transition-all duration-500 grayscale md:group-hover:grayscale-0 group-[.active]:grayscale-0"
            />
        </div>

        {/* Overlay Badge */}
        <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 border border-white/10 rounded-full">
          <span className="text-[10px] uppercase tracking-widest font-bold text-white">
            {event.status}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-start border-b border-white/10 pb-4 md:group-hover:border-white/40 group-[.active]:border-white/40 transition-colors">
        <div>
          <h3 className="text-2xl font-display font-bold uppercase mb-1 md:group-hover:text-stroke group-[.active]:text-stroke transition-all duration-300">
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
  );
}

export default function Events() {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveEvent(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <section id="events" className="py-24 md:py-32 px-6 md:px-12 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
              (02) Agenda
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight">
              Around Europe
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <VideoCard 
              key={event.id} 
              event={event} 
              index={index} 
              isActive={activeEvent === event.id}
              onToggle={(e) => {
                e.stopPropagation();
                setActiveEvent(activeEvent === event.id ? null : event.id);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
