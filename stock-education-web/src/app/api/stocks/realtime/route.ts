import { NextResponse } from 'next/server';

interface NaverStockData {
  cd: string;
  nm: string;
  nv: number;
  cv: number;
  cr: number;
  sv: number;
  ov: number;
  hv: number;
  lv: number;
  aq: number;
  aa: number;
  ms: string;
  rf: string;
}

interface NaverApiResponse {
  resultCode: string;
  result: {
    areas: {
      name: string;
      datas: NaverStockData[];
    }[];
  };
}

// 주요 종목 코드 목록
const MAJOR_STOCKS = [
  '005930', // 삼성전자
  '000660', // SK하이닉스
  '005380', // 현대차
  '000270', // 기아
  '105560', // KB금융
  '055550', // 신한지주
  '035420', // NAVER
  '035720', // 카카오
  '373220', // LG에너지솔루션
  '207940', // 삼성바이오로직스
];

// 단일 종목 가져오기
async function fetchSingleStock(code: string) {
  try {
    const res = await fetch(
      `https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:${code}`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        cache: 'no-store'
      }
    );

    if (!res.ok) return null;

    const data: NaverApiResponse = await res.json();
    if (data.resultCode !== 'success') return null;

    for (const area of data.result.areas) {
      for (const stock of area.datas) {
        if (stock.cd === code) {
          const isDown = stock.rf === '4' || stock.rf === '5';
          return {
            code: stock.cd,
            name: stock.nm,
            currentPrice: stock.nv,
            change: isDown ? -Math.abs(stock.cv) : stock.cv,
            changePercent: isDown ? -Math.abs(stock.cr) : stock.cr,
            volume: stock.aq,
            tradingValue: stock.aa,
            open: stock.ov || stock.sv,
            high: stock.hv,
            low: stock.lv,
            marketStatus: stock.ms
          };
        }
      }
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch stock ${code}:`, error);
    return null;
  }
}

// 네이버 금융 실시간 API에서 여러 종목 가져오기 (병렬 호출)
async function fetchMultipleStocks(codes: string[]) {
  try {
    const promises = codes.map(code => fetchSingleStock(code));
    const results = await Promise.all(promises);
    return results.filter(stock => stock !== null);
  } catch (error) {
    console.error('Failed to fetch multiple stocks:', error);
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codesParam = searchParams.get('codes');

  // 요청된 코드가 있으면 사용, 없으면 기본 주요 종목 사용
  const codes = codesParam ? codesParam.split(',') : MAJOR_STOCKS;

  try {
    const stocks = await fetchMultipleStocks(codes);

    if (!stocks || stocks.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch stock data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        stocks,
        source: 'naver',
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}
