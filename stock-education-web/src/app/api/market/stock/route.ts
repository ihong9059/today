import { NextResponse } from 'next/server';

interface NaverStockData {
  cd: string;      // 종목 코드
  nm: string;      // 종목명
  nv: number;      // 현재가
  cv: number;      // 전일대비
  cr: number;      // 등락률
  sv: number;      // 시가
  ov: number;      // 시가
  hv: number;      // 고가
  lv: number;      // 저가
  aq: number;      // 거래량
  aa: number;      // 거래대금
  ms: string;      // 시장 상태
  rf: string;      // 등락 구분 (1: 상한, 2: 상승, 3: 보합, 4: 하락, 5: 하한)
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

// 네이버 금융 실시간 API에서 개별 종목 가져오기
async function fetchStockPrice(code: string) {
  try {
    const res = await fetch(
      `https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:${code}`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        cache: 'no-store'
      }
    );

    if (!res.ok) {
      return null;
    }

    const data: NaverApiResponse = await res.json();

    if (data.resultCode !== 'success') {
      return null;
    }

    for (const area of data.result.areas) {
      for (const stock of area.datas) {
        if (stock.cd === code) {
          // 등락 부호 결정
          const isUp = stock.rf === '1' || stock.rf === '2';
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { success: false, error: 'Stock code is required' },
      { status: 400 }
    );
  }

  try {
    const stockData = await fetchStockPrice(code);

    if (!stockData) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch stock data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...stockData,
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
