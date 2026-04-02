import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const products = [
  { id: 1, name: "POV SIGNATURE TEE", price: "€35", image: "/merch/black-t-shirts.jpg" },
  { id: 2, name: "BCN STYLE", price: "€35", image: "/merch/POV_T-SHORT_MONSTER.jpg" },
  { id: 3, name: "SOLUNA TEE", price: "€35", image: "/merch/soluna.jpg" },
  { id: 4, name: "DRAWING TEE", price: "€35", image: "/merch/T-SHORT_DRRAWING.jpg" },
  { id: 5, name: "BOLO BY NIGHT", price: "€35", image: "/merch/gnomo.jpg" },
  { id: 6, name: "HEADQUARTER, LISBOA", price: "€35", image: "/merch/maglietta_pov.jpg" },
];

export default function Merch() {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveProduct(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <section id="products" className="py-24 md:py-32 bg-black text-white border-t border-white/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end z-10 relative">
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
            (04) Store
          </span>
          <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tight">
            POV Merch
          </h2>
        </div>
        <a href="https://point-of-view-txk-shop.fourthwall.com/" target="_blank" rel="noopener noreferrer" className="hidden md:block mt-8 md:mt-0 px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-all duration-300 uppercase text-xs tracking-widest font-black shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Visit E-Commerce
        </a>
      </div>

      {/* 3D Vortex Carousel */}
      <div className="relative h-[380px] md:h-[600px] w-full flex items-center justify-center perspective-[1200px] mt-0 md:mt-10 overflow-visible">
        <div className="relative w-full max-w-[260px] md:max-w-[300px] h-[280px] md:h-[400px] transform-style-3d animate-vortex">
          {products.map((product, i) => {
            const angle = (i * 360) / products.length;
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const translateZ = isMobile ? 200 : 350;
            return (
              <div
                key={product.id}
                className={`absolute top-0 left-0 w-full h-full origin-center group ${activeProduct === product.id ? 'active' : ''}`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                  backfaceVisibility: 'hidden'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveProduct(activeProduct === product.id ? null : product.id);
                }}
              >
                <div className="w-full h-full bg-[#0a0a0a] border border-white/10 p-4 flex flex-col transition-all duration-500 md:group-hover:scale-110 group-[.active]:scale-110 md:group-hover:border-white/40 group-[.active]:border-white/40 cursor-pointer">
                  <div className="flex-1 bg-white/5 relative overflow-hidden mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover opacity-80 md:group-hover:opacity-100 group-[.active]:opacity-100 transition-all duration-300 saturate-50 md:group-hover:saturate-100 group-[.active]:saturate-100"
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <h3 className="font-display font-bold uppercase text-lg md:group-hover:text-stroke group-[.active]:text-stroke transition-all">{product.name}</h3>
                    <span className="font-body text-white/60">{product.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="flex md:hidden justify-center px-6 mt-12 mb-8 relative z-10">
        <a href="https://point-of-view-txk-shop.fourthwall.com/" target="_blank" rel="noopener noreferrer" className="w-full max-w-sm px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-all duration-300 uppercase text-xs tracking-widest font-black shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Visit E-Commerce
        </a>
      </div>
    </section>
  );
}
