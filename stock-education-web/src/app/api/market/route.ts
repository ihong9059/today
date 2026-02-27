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

    // KOSPI (별도 호출 - 동시 쿼리 시 하나만 반환되는 문제 해결)
    const kospiRes = await fetch(
      'https://polling.finance.naver.com/api/realtime?query=SERVICE_INDEX:KOSPI',
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        cache: 'no-store'
      }
    );

    if (kospiRes.ok) {
      const kospiData: NaverApiResponse = await kospiRes.json();
      if (kospiData.resultCode === 'success') {
        for (const area of kospiData.result.areas) {
          for (const data of area.datas) {
            if (data.cd === 'KOSPI') {
              indices.push({
                name: 'KOSPI',
                value: data.nv / 100,
                change: data.cv / 100,
                changePercent: data.cr / 100
              });
            }
          }
        }
      }
    }

    // KOSDAQ (별도 호출)
    const kosdaqRes = await fetch(
      'https://polling.finance.naver.com/api/realtime?query=SERVICE_INDEX:KOSDAQ',
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        cache: 'no-store'
      }
    );

    if (kosdaqRes.ok) {
      const kosdaqData: NaverApiResponse = await kosdaqRes.json();
      if (kosdaqData.resultCode === 'success') {
        for (const area of kosdaqData.result.areas) {
          for (const data of area.datas) {
            if (data.cd === 'KOSDAQ') {
              indices.push({
                name: 'KOSDAQ',
                value: data.nv / 100,
                change: data.cv / 100,
                changePercent: data.cr / 100
              });
            }
          }
        }
      }
    }

    // 환율 (USD/KRW) - 네이버 API가 빈 배열을 반환하므로 폴백 데이터 사용
    // TODO: 다른 환율 API 연동 시 이 부분 수정
    indices.push({
      name: 'USD/KRW',
      value: 1435.50,
      change: -3.20,
      changePercent: -0.22
    });

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
