import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFileContent, getFileCommitInfo } from '@/lib/git-provider';
import { parseMarkdown } from '@/lib/markdown';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 
    'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
    'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX', 'XXXI'];
  
  return `${romanNumerals[day - 1] || day} ${month}, Year ${year} A.C.`;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const fileName = `${decodeURIComponent(slug)}.md`;
  
  let content: string;
  let commitInfo;
  
  try {
    [content, commitInfo] = await Promise.all([
      getFileContent(fileName),
      getFileCommitInfo(fileName),
    ]);
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
  
  const { content: htmlContent, title, frontmatter } = parseMarkdown(content);
  const displayTitle = title || slug.replace(/[-_]/g, ' ');
  
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Aged vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(45,31,20,0.2)_100%)]" />
      
      {/* Decorative border frame */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none border border-[var(--ink-faded)]/10" />
      
      <div className="relative max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-20">
        {/* Back navigation */}
        <nav className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 text-[var(--ink-faded)] hover:text-[var(--blood-dried)] transition-colors group font-[family-name:var(--font-display)] text-sm tracking-wider uppercase"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Return to Archives</span>
          </Link>
        </nav>
        
        {/* Manuscript header */}
        <header className="mb-12 pb-10 border-b border-[var(--ink-faded)]/20 text-center">
          {/* Decorative seal */}
          <div className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-full border border-[var(--gold-ancient)]/40">
            <span className="text-2xl text-[var(--gold-ancient)]">❧</span>
          </div>
          
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] uppercase text-[var(--ink-faded)] mb-4">
            Manuscript Fragment
          </p>
          
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl text-[var(--ink-dark)] mb-8 leading-tight tracking-wide">
            {displayTitle}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--ink-faded)]">
            {commitInfo && (
              <div className="flex items-center gap-2">
                <span className="text-[var(--gold-ancient)]">✦</span>
                <span className="font-[family-name:var(--font-display)] tracking-wide">
                  Inscribed: {formatDate(commitInfo.date)}
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <span className="text-[var(--gold-ancient)]">✦</span>
              <span className="font-mono text-xs opacity-70">
                {fileName}
              </span>
            </div>
          </div>
          
          {/* Frontmatter tags */}
          {frontmatter.tags && Array.isArray(frontmatter.tags) && (
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {frontmatter.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-xs font-[family-name:var(--font-display)] tracking-wider uppercase border border-[var(--blood-dried)]/30 text-[var(--blood-dried)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        {/* Manuscript content */}
        <article 
          className="prose-codex manuscript-reveal"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        
        {/* End mark */}
        <div className="text-center mt-16 mb-12">
          <span className="text-2xl text-[var(--gold-ancient)]">⁂</span>
          <p className="mt-4 text-xs tracking-[0.2em] uppercase text-[var(--ink-faded)] font-[family-name:var(--font-display)]">
            Finis Manuscripti
          </p>
        </div>
        
        {/* Footer navigation */}
        <footer className="pt-10 border-t border-[var(--ink-faded)]/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--parchment)] border border-[var(--ink-faded)]/30 text-[var(--ink)] font-[family-name:var(--font-display)] text-sm tracking-wider uppercase hover:border-[var(--blood-dried)] hover:text-[var(--blood-dried)] transition-all"
            >
              <span>←</span>
              <span>Return to Codex</span>
            </Link>
            
            {commitInfo && (
              <p className="text-xs text-[var(--ink-faded)] italic">
                Last transcribed: {formatDate(commitInfo.date)}
              </p>
            )}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-xs text-[var(--ink-faded)]/50 italic font-[family-name:var(--font-body)]">
              &ldquo;Scientia potentia est&rdquo;
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
