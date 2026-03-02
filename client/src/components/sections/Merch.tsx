import { motion } from "framer-motion";

const products = [
  { id: 1, name: "POV SIGNATURE TEE", price: "€35", image: "/assets/tshbo.jpg" }, // Placeholder, use real images if available
  { id: 2, name: "UNDERGROUND HOODIE", price: "€65", image: "/assets/tshbcn.jpg" },
  { id: 3, name: "VISION TOTE BAG", price: "€25", image: "/assets/milano.jpg" },
  { id: 4, name: "LOGO CAP", price: "€30", image: "/assets/teos.jpg" },
  { id: 5, name: "LIMITED PRINT", price: "€45", image: "/assets/inpulse.jpg" },
];

export default function Merch() {
  return (
    <section id="products" className="py-24 md:py-32 bg-black text-white border-t border-white/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end z-10 relative">
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
            (04) Store
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight">
            POV Merch
          </h2>
        </div>
        <button className="mt-8 md:mt-0 px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-all duration-300 uppercase text-xs tracking-widest font-black shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Visit E-Commerce
        </button>
      </div>

      {/* 3D Vortex Carousel */}
      <div className="relative h-[600px] w-full flex items-center justify-center perspective-[1200px] mt-10">
        <div className="relative w-full max-w-[300px] h-[400px] transform-style-3d animate-vortex">
          {products.map((product, i) => {
            const angle = (i * 360) / products.length;
            return (
              <div
                key={product.id}
                className="absolute top-0 left-0 w-full h-full origin-center group"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(350px)`,
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className="w-full h-full bg-[#0a0a0a] border border-white/10 p-4 flex flex-col transition-all duration-500 group-hover:scale-110 group-hover:border-white/40 cursor-pointer">
                  <div className="flex-1 bg-white/5 relative overflow-hidden mb-4">
                    {/* Placeholder for merch image */}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale"
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <h3 className="font-display font-bold uppercase text-lg group-hover:text-stroke transition-all">{product.name}</h3>
                    <span className="font-body text-white/60">{product.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
