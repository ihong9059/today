import { NextResponse } from 'next/server';
import { sampleStocks, marketIndices } from '@/data/stocks';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        stocks: sampleStocks,
        indices: marketIndices,
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stocks' },
      { status: 500 }
    );
  }
}
