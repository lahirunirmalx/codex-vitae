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

export function parseMarkdown(rawContent: string): ParsedMarkdown {
  // Parse frontmatter
  const { data, content } = matter(rawContent);
  
  // Convert markdown to HTML
  const htmlContent = marked.parse(content) as string;
  
  // Extract title from frontmatter or first heading
  let title = data.title as string || '';
  if (!title) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      title = titleMatch[1];
    }
  }
  
  return {
    content: htmlContent,
    title,
    frontmatter: data,
  };
}
