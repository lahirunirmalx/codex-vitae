export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Aged vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(45,31,20,0.15)_100%)]" />
      
      {/* Decorative border frame */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none border border-[var(--ink-faded)]/10" />
      
      <div className="relative max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Header skeleton */}
        <header className="text-center mb-20">
          <div className="w-20 h-20 skeleton rounded-full mx-auto mb-8" />
          <div className="w-64 h-12 skeleton mx-auto mb-4" />
          <div className="w-48 h-4 skeleton mx-auto mb-6" />
          <div className="w-80 h-px bg-[var(--ink-faded)]/20 mx-auto mb-8" />
          <div className="w-96 h-16 skeleton mx-auto" />
        </header>
        
        {/* Featured manuscripts skeleton */}
        <section className="mb-16">
          <div className="divider-ancient mb-10">
            <span className="text-[var(--ink-faded)]/50">Summoning manuscripts...</span>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="p-8 bg-[var(--parchment)]/50 border border-[var(--ink-faded)]/20">
                <div className="w-32 h-4 skeleton mb-4" />
                <div className="w-3/4 h-8 skeleton mb-4" />
                <div className="space-y-2">
                  <div className="w-full h-5 skeleton" />
                  <div className="w-5/6 h-5 skeleton" />
                </div>
                <div className="w-24 h-5 skeleton mt-6" />
              </div>
            ))}
          </div>
        </section>
        
        {/* Archive skeleton */}
        <section>
          <div className="divider-ancient mb-8">
            <span className="text-[var(--ink-faded)]/50">Indexing archives...</span>
          </div>
          
          <div className="bg-[var(--parchment)]/30 border border-[var(--ink-faded)]/20">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 py-5 px-4 border-b border-[var(--ink-faded)]/10 last:border-b-0">
                <div className="w-6 h-6 skeleton rounded-full" />
                <div className="flex-1">
                  <div className="w-48 h-6 skeleton mb-2" />
                  <div className="w-32 h-4 skeleton" />
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Footer loading indicator */}
        <div className="text-center mt-16">
          <span className="text-2xl text-[var(--gold-ancient)] opacity-30 animate-pulse">⁂</span>
        </div>
      </div>
    </main>
  );
}
