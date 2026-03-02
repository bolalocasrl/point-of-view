export default function Footer() {
  return (
    <footer id="contacts" className="py-12 px-6 md:px-12 bg-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="text-2xl font-display font-bold tracking-tight uppercase">Point Of View</h2>
          <p className="text-xs text-white/40 font-body uppercase tracking-widest">
            © {new Date().getFullYear()} Barcelona
          </p>
        </div>

        <div className="flex gap-8">
          <a href="#" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">Instagram</a>
          <a href="#" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">Resident Advisor</a>
          <a href="#" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
