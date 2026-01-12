import { marked } from 'marked';
import matter from 'gray-matter';

export interface ParsedMarkdown {
  content: string;
  title: string;
  frontmatter: Record<string, unknown>;
}

// Configure marked options
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
});

/**
 * Strip markdown formatting from text
 * Removes bold, italic, links, etc. to get plain text
 */
export function stripMarkdown(text: string): string {
  return text
    // Remove bold/italic (***text***, **text**, *text*, ___text___, __text__, _text_)
    .replace(/\*\*\*(.+?)\*\*\*/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/___(.+?)___/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    // Remove inline code
    .replace(/`(.+?)`/g, '$1')
    // Remove links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract a clean summary from markdown content
 */
export function extractSummary(content: string, maxLength: number = 200): string {
  const lines = content.split('\n');
  const contentLines: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip empty lines
    if (!trimmed) continue;
    
    // Skip headings
    if (trimmed.startsWith('#')) continue;
    
    // Skip horizontal rules
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') continue;
    
    // Skip blockquotes
    if (trimmed.startsWith('>')) continue;
    
    // Skip list items that are just markers
    if (/^[-*+]\s*$/.test(trimmed)) continue;
    
    // Skip frontmatter markers
    if (trimmed === '---') continue;
    
    // This looks like actual content
    const cleanLine = stripMarkdown(trimmed);
    if (cleanLine.length > 10) { // Only add substantial lines
      contentLines.push(cleanLine);
    }
    
    // Stop after getting enough content
    if (contentLines.join(' ').length >= maxLength) break;
  }
  
  let summary = contentLines.join(' ').substring(0, maxLength);
  
  // Clean up the summary
  summary = summary.replace(/\s+/g, ' ').trim();
  
  // Add ellipsis if truncated
  if (summary.length >= maxLength) {
    // Try to cut at a word boundary
    const lastSpace = summary.lastIndexOf(' ');
    if (lastSpace > maxLength * 0.7) {
      summary = summary.substring(0, lastSpace);
    }
    summary += '...';
  }
  
  return summary || 'No preview available';
}

/**
 * Extract title from markdown content
 */
export function extractTitle(content: string, filename: string): string {
  // Try to find the first heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    return stripMarkdown(titleMatch[1]);
  }
  
  // Fall back to filename
  return filename.replace('.md', '').replace(/[-_]/g, ' ');
}

export function parseMarkdown(rawContent: string): ParsedMarkdown {
  // Parse frontmatter
  const { data, content } = matter(rawContent);
  
  // Convert markdown to HTML
  const htmlContent = marked.parse(content) as string;
  
  // Extract title from frontmatter or first heading
  let title = '';
  if (data.title && typeof data.title === 'string') {
    title = stripMarkdown(data.title);
  } else {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      title = stripMarkdown(titleMatch[1]);
    }
  }
  
  return {
    content: htmlContent,
    title,
    frontmatter: data,
  };
}
