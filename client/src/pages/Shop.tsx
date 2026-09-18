import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram } from "lucide-react";
import {
  fetchProducts,
  formatPrice,
  FALLBACK_PRODUCTS,
  SHOP_BASE,
  type Product,
} from "@/lib/shop";

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06 }}
      className="group block border border-white/10 hover:border-white/40 bg-[#0a0a0a] transition-colors duration-300"
    >
      <div className="aspect-square overflow-hidden bg-[#141414] relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover brightness-110 group-hover:brightness-125 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-widest text-white/30">
            POV
          </div>
        )}
        <span className="absolute bottom-4 right-4 flex items-center gap-1 px-4 py-2 bg-white text-black uppercase text-[10px] tracking-widest font-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Buy now <ArrowUpRight size={12} />
        </span>
      </div>

      <div className="p-5 flex items-start justify-between gap-4">
        <h3 className="font-display font-bold uppercase text-sm md:text-base leading-tight tracking-tight">
          {product.name}
        </h3>
        <span className="font-body text-sm text-white/60 whitespace-nowrap">
          {formatPrice(product.price, product.currency)}
        </span>
      </div>
    </motion.a>
  );
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Shop | POINT OF VIEW";
    window.scrollTo(0, 0);

    const controller = new AbortController();
    fetchProducts(controller.signal)
      .then(setProducts)
      .catch(() => setProducts(FALLBACK_PRODUCTS))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-white selection:text-black">
      <div className="grain-overlay opacity-[0.03]" />

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/70 backdrop-blur-md border-b border-white/10">
        <Link href="/" className="block hover:opacity-70 transition-opacity">
          <img src="/assets/logo-v2.png" alt="Point Of View" className="h-14 w-auto md:h-16 rounded-full" />
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors hidden md:block"
          >
            Back to site
          </Link>
          <a
            href={SHOP_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 md:px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 uppercase text-xs tracking-widest font-bold"
          >
            Cart
          </a>
        </div>
      </header>

      <main className="pt-32 md:pt-44 pb-24 px-6 md:px-12">
        <section className="max-w-7xl mx-auto mb-16 md:mb-24">
          <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
            (04) Store
          </span>
          <h1 className="text-6xl md:text-[11rem] font-display font-black uppercase leading-[0.85] tracking-tighter">
            POV<br />
            <span className="text-transparent [-webkit-text-stroke:1px_white]">Merch</span>
          </h1>
          <p className="mt-8 max-w-xl text-white/60 leading-relaxed">
            Limited runs printed on heavyweight black cotton. Artwork from our nights across
            Barcelona, Bologna, Lisboa and Milano. Shipped worldwide.
          </p>
        </section>

        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {products.map((product, i) => (
              <div key={product.id} className="bg-black">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>

          {loading && (
            <p className="mt-8 text-center text-[10px] uppercase tracking-widest text-white/30">
              Syncing store…
            </p>
          )}
        </section>

        <section className="max-w-7xl mx-auto mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
          {[
            { title: "Printed on demand", text: "Every piece is made when you order it. Nothing is wasted." },
            { title: "Worldwide shipping", text: "Printed and shipped from the EU, US, UK and beyond." },
            { title: "Secure checkout", text: "Payment is handled by Fourthwall, our store partner." },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="text-sm font-display font-bold uppercase tracking-tight mb-2">{item.title}</h2>
              <p className="text-sm text-white/50 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-white/10 py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-display font-bold tracking-tight uppercase">POV</span>
          <span className="text-xs text-white/40 font-body uppercase tracking-widest">
            © {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/pointofview.events/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/50 hover:text-white transition-colors"
          >
            <Instagram size={18} />
          </a>
          <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Terms</Link>
        </div>
      </footer>
    </div>
  );
}
