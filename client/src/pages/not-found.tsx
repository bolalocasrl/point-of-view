import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="grain-overlay opacity-[0.05]" />
      
      <h1 className="text-[10vw] font-display font-black leading-none text-white mix-blend-difference">
        404
      </h1>
      <p className="mt-4 text-xl font-body uppercase tracking-widest text-white/50">
        Page Not Found
      </p>
      
      <Link href="/">
        <a className="mt-12 px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase text-xs tracking-widest font-bold">
          Return Home
        </a>
      </Link>
    </div>
  );
}
