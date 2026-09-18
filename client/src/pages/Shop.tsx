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
import { cardFor, RARITY_LABEL } from "@/lib/cards";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 shrink-0 text-[9px] uppercase tracking-widest text-white/40">{label}</span>
      <span className="relative h-[3px] flex-1 bg-white/10">
        <span className="absolute inset-y-0 left-0 bg-white/70" style={{ width: `${value}%` }} />
      </span>
      <span className="w-6 text-right font-body text-[10px] text-white/50">{value}</span>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const card = cardFor(product.slug);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06 }}
      className="group relative flex flex-col border border-white/15 bg-gradient-to-b from-[#141414] to-black p-3 transition-colors duration-300 hover:border-white/50"
    >
      {/* holo sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.10) 45%, rgba(255,255,255,0.02) 55%, transparent 70%)",
        }}
      />

      {/* header */}
      <header className="relative flex items-start justify-between gap-2 px-1 pb-3">
        <div>
          <h3 className="font-display text-sm font-bold uppercase leading-tight tracking-tight md:text-base">
            {product.name}
          </h3>
          <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/40">
            {card.serie} · {card.city}
          </p>
        </div>
        <span className="shrink-0 border border-white/20 px-2 py-1 text-[9px] uppercase tracking-widest text-white/50">
          {RARITY_LABEL[card.rarity]}
        </span>
      </header>

      {/* image window */}
      <div className="relative aspect-square overflow-hidden border border-white/10 bg-[#141414]">
        {product.image ? (
          <>
            <img
              src={product.image}
              alt={`${product.name} — back print`}
              loading="lazy"
              className="h-full w-full object-cover brightness-125 transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
            />
            {product.imageAlt && (
              <img
                src={product.imageAlt}
                alt={`${product.name} — worn`}
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-widest text-white/30">
            POV
          </div>
        )}
        <span className="absolute left-0 top-0 bg-white px-2 py-1 font-body text-[10px] font-black uppercase tracking-widest text-black">
          {formatPrice(product.price, product.currency)}
        </span>
      </div>

      {/* stats */}
      <div className="relative space-y-1.5 py-4">
        <Stat label="Groove" value={card.stats.groove} />
        <Stat label="Depth" value={card.stats.depth} />
        <Stat label="Night" value={card.stats.night} />
      </div>

      {/* ability */}
      <div className="relative flex-1 border-t border-white/10 pt-3">
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Special ability</p>
        <p className="mt-1 font-display text-xs font-bold uppercase tracking-tight text-white">
          {card.ability}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-white/50">{card.lore}</p>
      </div>

      {/* buy */}
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-4 flex items-center justify-center gap-1 bg-white px-4 py-3 font-body text-[10px] font-black uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-white/80"
      >
        Buy now <ArrowUpRight size={12} />
      </a>
    </motion.article>
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

      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/70 px-6 py-4 backdrop-blur-md md:px-12">
        <Link href="/" className="block transition-opacity hover:opacity-70">
          <img src="/assets/logo-v2.png" alt="Point Of View" className="h-14 w-auto rounded-full md:h-16" />
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="hidden text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white md:block">
            Back to site
          </Link>
          <a
            href={SHOP_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-white px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 hover:bg-white hover:text-black md:px-6"
          >
            Cart
          </a>
        </div>
      </header>

      <main className="px-6 pb-24 pt-32 md:px-12 md:pt-44">
        {/* hero */}
        <section className="mx-auto mb-14 max-w-7xl md:mb-20">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-white/50">(04) Store</span>
          <h1 className="font-display text-6xl font-black uppercase leading-[0.85] tracking-tighter md:text-[11rem]">
            POV<br />
            <span className="text-transparent [-webkit-text-stroke:1px_white]">Merch</span>
          </h1>
          <p className="mt-8 max-w-xl leading-relaxed text-white/60">
            Every drop is a card: one artwork, one city, one night behind it. Printed on heavyweight
            black cotton, made to order, shipped worldwide.
          </p>
        </section>

        {/* cards */}
        <section className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4">
            <h2 className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl">The collection</h2>
            <span className="text-[10px] uppercase tracking-widest text-white/40">
              {products.length} cards
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {loading && (
            <p className="mt-8 text-center text-[10px] uppercase tracking-widest text-white/30">Syncing store…</p>
          )}
        </section>

        {/* rewards */}
        <section className="mx-auto mt-20 max-w-7xl border border-white/15 p-6 md:mt-28 md:p-12">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-white/50">(05) Collect</span>
          <h2 className="font-display text-4xl font-black uppercase leading-[0.85] tracking-tighter md:text-7xl">
            Unlock<br />
            <span className="text-transparent [-webkit-text-stroke:1px_white]">Rewards</span>
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-white/60">
            The cards are not only cotton. Collect them and the dancefloor gives something back.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3">
            {[
              {
                n: "02",
                title: "A drink on us",
                text: "Two cards: your first drink is covered at any POV night.",
              },
              {
                n: "05",
                title: "Personal open bar",
                text: "Five cards: one POV night with your bar tab on us, agreed with us in advance.",
              },
              {
                n: "ALL",
                title: "POV Tour",
                text: "The full collection: we host you on the road for two years, wherever we can make it happen.",
              },
            ].map((tier) => (
              <div key={tier.n} className="bg-black p-6 md:p-8">
                <span className="font-display text-5xl font-black leading-none text-white/15">{tier.n}</span>
                <h3 className="mt-4 font-display text-base font-bold uppercase tracking-tight">{tier.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{tier.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <h3 className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/40">How it works</h3>
            <ul className="grid grid-cols-1 gap-2 text-sm leading-relaxed text-white/50 md:grid-cols-2">
              <li>Keep your order confirmations — they are your proof.</li>
              <li>Write to pointofview.milan@gmail.com before the night you want to use it.</li>
              <li>No expiry: use it at the POV night you prefer, not necessarily the next one.</li>
              <li>Open bar and POV Tour are agreed in advance, so we know you are coming.</li>
              <li>Rewards are personal and cannot be resold.</li>
              <li>POV Tour means a place to stay where we can organise it — travel is on you.</li>
            </ul>
          </div>
        </section>

        {/* info */}
        <section className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-8 border-t border-white/10 pt-12 md:mt-28 md:grid-cols-3">
          {[
            { title: "Printed on demand", text: "Every piece is made when you order it. Nothing is wasted." },
            { title: "Worldwide shipping", text: "Printed and shipped from the EU, US, UK and beyond." },
            { title: "Secure checkout", text: "Payment is handled by Fourthwall, our store partner." },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-tight">{item.title}</h2>
              <p className="text-sm leading-relaxed text-white/50">{item.text}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="flex flex-col items-center justify-between gap-6 border-t border-white/10 px-6 py-10 md:flex-row md:px-12">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-bold uppercase tracking-tight">POV</span>
          <span className="font-body text-xs uppercase tracking-widest text-white/40">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/pointofview.events/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/50 transition-colors hover:text-white"
          >
            <Instagram size={18} />
          </a>
          <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-white/40 transition-colors hover:text-white">Privacy</Link>
          <Link href="/terms" className="text-[10px] uppercase tracking-widest text-white/40 transition-colors hover:text-white">Terms</Link>
        </div>
      </footer>
    </div>
  );
}
