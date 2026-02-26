import { NextRequest, NextResponse } from 'next/server';
import { stockRecommendations } from '@/data/stocks';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const risk = searchParams.get('risk');

    let filteredRecommendations = [...stockRecommendations];

    // Filter by investment type
    if (type && ['stable', 'growth', 'valueup', 'dividend'].includes(type)) {
      filteredRecommendations = filteredRecommendations.filter(
        rec => rec.recommendationType === type
      );
    }

    // Sort by match score
    filteredRecommendations.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      success: true,
      data: {
        recommendations: filteredRecommendations,
        total: filteredRecommendations.length,
        filters: { type, risk }
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recommendations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { investmentType, riskLevel, investmentTerm, investmentAmount } = body;

    let filteredRecommendations = [...stockRecommendations];

    // Filter by investment type
    if (investmentType) {
      filteredRecommendations = filteredRecommendations.filter(
        rec => rec.recommendationType === investmentType
      );
    }

    // Adjust match scores based on risk level
    filteredRecommendations = filteredRecommendations.map(rec => {
      let adjustedScore = rec.matchScore;

      // Adjust based on risk preference
      if (riskLevel === 'low') {
        if (rec.recommendationType === 'stable' || rec.recommendationType === 'dividend') {
          adjustedScore += 5;
        }
      } else if (riskLevel === 'high') {
        if (rec.recommendationType === 'growth') {
          adjustedScore += 5;
        }
      }

      return {
        ...rec,
        matchScore: Math.min(100, adjustedScore)
      };
    });

    // Sort by adjusted match score
    filteredRecommendations.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      success: true,
      data: {
        recommendations: filteredRecommendations.slice(0, 5),
        profile: {
          investmentType,
          riskLevel,
          investmentTerm,
          investmentAmount
        }
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
