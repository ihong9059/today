import { NextRequest, NextResponse } from 'next/server';
import { glossaryTerms } from '@/data/education';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');

    let filteredTerms = [...glossaryTerms];

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredTerms = filteredTerms.filter(term =>
        term.term.toLowerCase().includes(lowerQuery) ||
        term.definition.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      filteredTerms = filteredTerms.filter(term => term.category === category);
    }

    // Sort alphabetically
    filteredTerms.sort((a, b) => a.term.localeCompare(b.term, 'ko'));

    return NextResponse.json({
      success: true,
      data: {
        terms: filteredTerms,
        total: filteredTerms.length,
        categories: ['basic', 'indicator', 'analysis', 'trading', 'policy']
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch glossary' },
      { status: 500 }
    );
  }
}
