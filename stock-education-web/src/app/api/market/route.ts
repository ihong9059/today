import { NextResponse } from 'next/server';

interface NaverIndexData {
  cd: string;      // 코드 (KOSPI, KOSDAQ)
  nv: number;      // 현재값 (100으로 나눠야 함)
  cv: number;      // 전일대비 (100으로 나눠야 함)
  cr: number;      // 등락률 (100으로 나눠야 함)
  ms: string;      // 시장 상태
}

interface NaverApiResponse {
  resultCode: string;
  result: {
    areas: {
      name: string;
      datas: NaverIndexData[];
    }[];
  };
}

// 네이버 금융 실시간 API에서 시장 지수 가져오기
async function fetchMarketIndices() {
  try {
    const indices = [];

    // KOSPI & KOSDAQ
    const indexRes = await fetch(
      'https://polling.finance.naver.com/api/realtime?query=SERVICE_INDEX:KOSPI,SERVICE_INDEX:KOSDAQ',
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        cache: 'no-store'
      }
    );

    if (indexRes.ok) {
      const indexData: NaverApiResponse = await indexRes.json();

      if (indexData.resultCode === 'success') {
        for (const area of indexData.result.areas) {
          for (const data of area.datas) {
            const value = data.nv / 100;
            const change = data.cv / 100;
            const changePercent = data.cr / 100;

            if (data.cd === 'KOSPI') {
              indices.push({
                name: 'KOSPI',
                value,
                change,
                changePercent
              });
            } else if (data.cd === 'KOSDAQ') {
              indices.push({
                name: 'KOSDAQ',
                value,
                change,
                changePercent
              });
            }
          }
        }
      }
    }

    // 환율 (USD/KRW)
    const fxRes = await fetch(
      'https://polling.finance.naver.com/api/realtime?query=SERVICE_EXCHANGE:FX_USDKRW',
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        cache: 'no-store'
      }
    );

    if (fxRes.ok) {
      const fxData: NaverApiResponse = await fxRes.json();

      if (fxData.resultCode === 'success') {
        for (const area of fxData.result.areas) {
          for (const data of area.datas) {
            if (data.cd === 'FX_USDKRW') {
              indices.push({
                name: 'USD/KRW',
                value: data.nv / 100,
                change: data.cv / 100,
                changePercent: data.cr / 100
              });
            }
          }
        }
      }
    }

    return indices;
  } catch (error) {
    console.error('Failed to fetch market indices:', error);
    return null;
  }
}

export async function GET() {
  try {
    const indices = await fetchMarketIndices();

    if (!indices || indices.length === 0) {
      // 폴백 데이터
      return NextResponse.json({
        success: true,
        data: {
          indices: [
            { name: 'KOSPI', value: 6312.85, change: 45.32, changePercent: 0.72 },
            { name: 'KOSDAQ', value: 1892.45, change: 18.67, changePercent: 1.00 },
            { name: 'USD/KRW', value: 1385.20, change: -5.30, changePercent: -0.38 },
          ],
          source: 'fallback',
          updatedAt: new Date().toISOString()
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        indices,
        source: 'naver',
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}
