export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Aged vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(45,31,20,0.2)_100%)]" />
      
      {/* Decorative border frame */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none border border-[var(--ink-faded)]/10" />
      
      <div className="relative max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-20">
        {/* Back navigation skeleton */}
        <nav className="mb-12">
          <div className="w-40 h-5 skeleton" />
        </nav>
        
        {/* Header skeleton */}
        <header className="mb-12 pb-10 border-b border-[var(--ink-faded)]/20 text-center">
          <div className="w-16 h-16 skeleton rounded-full mx-auto mb-8" />
          <div className="w-32 h-4 skeleton mx-auto mb-4" />
          <div className="w-3/4 h-12 skeleton mx-auto mb-8" />
          <div className="flex justify-center gap-6">
            <div className="w-40 h-5 skeleton" />
            <div className="w-24 h-5 skeleton" />
          </div>
        </header>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="w-full h-6 skeleton" />
          <div className="w-full h-6 skeleton" />
          <div className="w-5/6 h-6 skeleton" />
          <div className="w-full h-6 skeleton" />
          <div className="w-4/6 h-6 skeleton" />
          
          <div className="w-full h-40 skeleton my-8" />
          
          <div className="w-full h-6 skeleton" />
          <div className="w-full h-6 skeleton" />
          <div className="w-3/4 h-6 skeleton" />
        </div>
        
        {/* Footer placeholder */}
        <div className="text-center mt-16">
          <span className="text-2xl text-[var(--gold-ancient)] opacity-30">⁂</span>
          <p className="mt-4 text-xs tracking-[0.2em] uppercase text-[var(--ink-faded)]/50 font-[family-name:var(--font-display)]">
            Recovering manuscript...
          </p>
        </div>
      </div>
    </main>
  );
}
