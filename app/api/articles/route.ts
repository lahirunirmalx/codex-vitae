import { NextResponse } from 'next/server';
import { getMarkdownFiles } from '@/lib/git-provider';

export async function GET() {
  try {
    const articles = await getMarkdownFiles();
    
    return NextResponse.json({
      success: true,
      articles,
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch articles',
      },
      { status: 500 }
    );
  }
}
