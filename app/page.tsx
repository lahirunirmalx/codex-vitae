import Link from 'next/link';
import { getMarkdownFiles, ArticleInfo } from '@/lib/git-provider';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  
  // Roman numeral for day (simplified)
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 
    'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
    'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX', 'XXXI'];
  
  return `${romanNumerals[day - 1] || day} ${month}, ${year} A.C.`;
}

function FeaturedManuscript({ article, index }: { article: ArticleInfo; index: number }) {
  const slug = article.name.replace('.md', '');
  const numerals = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'];
  
  return (
    <Link href={`/article/${encodeURIComponent(slug)}`} className="group block manuscript-reveal" style={{ animationDelay: `${index * 150}ms` }}>
      <article className="relative p-6 md:p-8 bg-[var(--parchment)] border border-[var(--ink-faded)]/30 transition-all duration-500 hover:border-[var(--gold-ancient)] hover:shadow-[0_0_30px_rgba(184,134,11,0.15)]">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--ink-faded)]/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--ink-faded)]/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--ink-faded)]/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--ink-faded)]/40" />
        
        {/* Manuscript number seal */}
        <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[var(--blood-dried)] flex items-center justify-center shadow-lg">
          <span className="text-[var(--parchment-light)] font-[var(--font-display)] text-lg">{numerals[index]}</span>
        </div>
        
        <div className="flex items-center gap-3 mb-4 text-xs tracking-[0.2em] uppercase text-[var(--ink-faded)] font-[family-name:var(--font-display)]">
          <span className="text-[var(--gold-ancient)]">✦</span>
          <time dateTime={article.lastModified}>{formatDate(article.lastModified)}</time>
          <span className="text-[var(--gold-ancient)]">✦</span>
        </div>
        
        <h2 className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-[var(--ink-dark)] mb-4 leading-tight group-hover:text-[var(--blood-dried)] transition-colors">
          {article.title}
        </h2>
        
        <p className="text-[var(--ink-faded)] leading-relaxed text-base italic">
          &ldquo;{article.summary}&rdquo;
        </p>
        
        <div className="mt-6 flex items-center gap-2 text-[var(--blood-dried)] font-[family-name:var(--font-display)] text-sm tracking-wider group-hover:gap-4 transition-all">
          <span>LEGERE</span>
          <span className="text-[var(--gold-ancient)]">→</span>
        </div>
      </article>
    </Link>
  );
}

function ArchiveEntry({ article, index }: { article: ArticleInfo; index: number }) {
  const slug = article.name.replace('.md', '');
  
  return (
    <Link href={`/article/${encodeURIComponent(slug)}`} className="group block manuscript-reveal" style={{ animationDelay: `${(index + 2) * 100}ms` }}>
      <div className="flex items-start gap-4 py-5 px-4 border-b border-[var(--ink-faded)]/20 hover:bg-[var(--parchment)]/50 transition-all">
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[var(--gold-ancient)] font-[family-name:var(--font-ancient)] text-lg">
          ❧
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--ink)] group-hover:text-[var(--blood-dried)] transition-colors leading-tight">
            {article.title}
          </h3>
          <p className="text-sm text-[var(--ink-faded)] mt-1 tracking-wide font-[family-name:var(--font-display)]">
            Inscribed: {formatDate(article.lastModified)}
          </p>
        </div>
        <div className="flex-shrink-0 text-[var(--ink-faded)] group-hover:text-[var(--blood-dried)] transition-colors">
          ⟶
        </div>
      </div>
    </Link>
  );
}

export default async function Home() {
  let articles: ArticleInfo[] = [];
  let error: string | null = null;
  
  try {
    articles = await getMarkdownFiles();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to retrieve manuscripts';
    console.error('Error loading articles:', e);
  }
  
  const latestArticles = articles.slice(0, 2);
  const otherArticles = articles.slice(2);
  
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Aged vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(45,31,20,0.15)_100%)]" />
      
      {/* Decorative border frame */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none border border-[var(--ink-faded)]/10" />
      
      <div className="relative max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Header */}
        <header className="text-center mb-20">
          {/* Ancient seal */}
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full border-2 border-[var(--blood-dried)]/60 relative">
            <span className="font-[family-name:var(--font-ancient)] text-3xl text-[var(--blood-dried)]">CV</span>
            <div className="absolute inset-0 rounded-full border border-[var(--gold-ancient)]/30 scale-110" />
          </div>
          
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl text-[var(--ink-dark)] tracking-[0.1em] mb-4">
            CODEX VITAE
          </h1>
          
          <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.3em] uppercase text-[var(--ink-faded)] mb-6">
            Chronicles of the Lost Age
          </p>
          
          <div className="divider-ancient max-w-md mx-auto">
            <span>Anno Domini MMXXVI</span>
          </div>
          
          <p className="mt-8 text-[var(--ink-faded)] italic max-w-xl mx-auto leading-relaxed">
            &ldquo;These fragments we have preserved against the ruin of all things. 
            Read carefully, for not all knowledge was meant to survive.&rdquo;
          </p>
          
          <p className="mt-4 text-xs tracking-[0.2em] uppercase text-[var(--ink-faded)]/60 font-[family-name:var(--font-display)]">
            — The Order of Archivists
          </p>
        </header>
        
        {error ? (
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-[var(--parchment)] border border-[var(--blood-dried)]/30">
              <div className="text-4xl mb-4 text-[var(--blood-dried)]">☠</div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink-dark)] mb-3 tracking-wide">
                MANUSCRIPTS INACCESSIBLE
              </h2>
              <p className="text-[var(--ink-faded)] italic">
                {error}
              </p>
              <p className="mt-4 text-xs tracking-[0.15em] uppercase text-[var(--ink-faded)]">
                Verify the sacred configurations in .env.local
              </p>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-[var(--parchment)] border border-[var(--ink-faded)]/30">
              <div className="text-4xl mb-4 text-[var(--gold-ancient)]">⚱</div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink-dark)] mb-3 tracking-wide">
                THE ARCHIVES ARE EMPTY
              </h2>
              <p className="text-[var(--ink-faded)] italic">
                No manuscripts have been recovered from the repository.
              </p>
              <p className="mt-4 text-xs tracking-[0.15em] uppercase text-[var(--ink-faded)]">
                Add .md scrolls to your pages folder
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Latest Manuscripts */}
            {latestArticles.length > 0 && (
              <section className="mb-16">
                <div className="divider-ancient mb-10">
                  <span>Recently Recovered</span>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2">
                  {latestArticles.map((article, index) => (
                    <FeaturedManuscript key={article.name} article={article} index={index} />
                  ))}
                </div>
              </section>
            )}
            
            {/* Archive Index */}
            {otherArticles.length > 0 && (
              <section>
                <div className="divider-ancient mb-8">
                  <span>The Archive Index</span>
                </div>
                
                <div className="bg-[var(--parchment)]/30 border border-[var(--ink-faded)]/20">
                  {otherArticles.map((article, index) => (
                    <ArchiveEntry key={article.name} article={article} index={index} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
        
        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-[var(--ink-faded)]/20 text-center">
          <div className="text-[var(--gold-ancient)] text-2xl mb-4">⁂</div>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[var(--ink-faded)]">
            Preserved by the Order • Synchronized from the Sacred Repository
          </p>
          <p className="mt-4 text-xs text-[var(--ink-faded)]/50 italic">
            &ldquo;In verbis virtus&rdquo;
          </p>
        </footer>
      </div>
    </main>
  );
}
