import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      {/* Aged vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(45,31,20,0.25)_100%)]" />
      
      {/* Decorative border frame */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none border border-[var(--ink-faded)]/10" />
      
      <div className="relative text-center px-6 py-16">
        {/* Ancient warning symbol */}
        <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full border-2 border-[var(--blood-dried)]/50 relative">
          <span className="font-[family-name:var(--font-ancient)] text-4xl text-[var(--blood-dried)]">☠</span>
          <div className="absolute inset-0 rounded-full border border-[var(--blood-dried)]/20 scale-110" />
        </div>
        
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] uppercase text-[var(--blood-dried)] mb-4">
          Manuscript Not Found
        </p>
        
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--ink-dark)] tracking-wide mb-6">
          FRAGMENTUM PERDITUM
        </h1>
        
        <div className="max-w-md mx-auto mb-10">
          <p className="text-[var(--ink-faded)] italic leading-relaxed">
            &ldquo;This manuscript has been lost to the ages, consumed by the fires of the Great Collapse, 
            or perhaps it never existed in this realm.&rdquo;
          </p>
          <p className="mt-4 text-xs tracking-[0.15em] uppercase text-[var(--ink-faded)]/60 font-[family-name:var(--font-display)]">
            — Notation from the Archivist
          </p>
        </div>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--parchment)] border border-[var(--ink-faded)]/30 text-[var(--ink)] font-[family-name:var(--font-display)] text-sm tracking-wider uppercase hover:border-[var(--gold-ancient)] hover:text-[var(--blood-dried)] transition-all"
        >
          <span>⟵</span>
          <span>Return to the Archives</span>
        </Link>
        
        <div className="mt-16">
          <span className="text-2xl text-[var(--gold-ancient)]">⁂</span>
        </div>
      </div>
    </main>
  );
}
