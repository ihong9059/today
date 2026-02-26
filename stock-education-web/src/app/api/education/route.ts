import { NextRequest, NextResponse } from 'next/server';
import { lessons, glossaryTerms, levels } from '@/data/education';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');

    let filteredLessons = [...lessons];

    if (level && ['beginner', 'intermediate', 'advanced'].includes(level)) {
      filteredLessons = filteredLessons.filter(lesson => lesson.level === level);
    }

    return NextResponse.json({
      success: true,
      data: {
        lessons: filteredLessons,
        levels,
        total: filteredLessons.length
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch education data' },
      { status: 500 }
    );
  }
}
