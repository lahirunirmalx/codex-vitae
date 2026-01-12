import { NextRequest, NextResponse } from 'next/server';
import { getFileContent, getFileCommitInfo, CommitInfo } from '@/lib/git-provider';
import { parseMarkdown } from '@/lib/markdown';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const fileName = `${slug}.md`;
    
    const [rawContent, commitInfo]: [string, CommitInfo | null] = await Promise.all([
      getFileContent(fileName),
      getFileCommitInfo(fileName),
    ]);
    
    const parsed = parseMarkdown(rawContent);
    
    return NextResponse.json({
      success: true,
      article: {
        ...parsed,
        fileName,
        lastModified: commitInfo?.date || null,
        commitMessage: commitInfo?.message || null,
      },
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch article',
      },
      { status: 500 }
    );
  }
}
