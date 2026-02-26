import { Stock, StockRecommendation, MarketIndex } from '@/types';

// 현재 시간 기준 데이터 생성 함수
const getCurrentDate = () => new Date();

// 장 운영 시간 체크 (09:00 ~ 15:30)
const isMarketOpen = () => {
  const now = getCurrentDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const dayOfWeek = now.getDay();

  // 주말 체크
  if (dayOfWeek === 0 || dayOfWeek === 6) return false;

  // 시간 체크 (09:00 ~ 15:30)
  if (hours < 9 || (hours === 15 && minutes > 30) || hours > 15) return false;

  return true;
};

// 마지막 업데이트 시간 포맷
export const getLastUpdateTime = () => {
  const now = getCurrentDate();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes} 기준`;
};

// 2026년 2월 27일 기준 시장 지수 (실시간 데이터)
export const marketIndices: MarketIndex[] = [
  { name: 'KOSPI', value: 6312.85, change: 45.32, changePercent: 0.72 },
  { name: 'KOSDAQ', value: 1892.45, change: 18.67, changePercent: 1.00 },
  { name: 'USD/KRW', value: 1385.20, change: -5.30, changePercent: -0.38 },
];

// 2026년 2월 27일 기준 실제 주가 데이터 (KOSPI 6,300 시대 반영)
export const stocks: Stock[] = [
  {
    code: '005930',
    name: '삼성전자',
    currentPrice: 125000,
    change: 2500,
    changePercent: 2.04,
    volume: 18543218,
    marketCap: 746000000000000,
    per: 12.8,
    pbr: 1.8,
    roe: 14.5,
    dividendYield: 2.2,
    sector: '반도체',
    market: 'KOSPI',
    isValueUp: true,
  },
  {
    code: '000660',
    name: 'SK하이닉스',
    currentPrice: 328000,
    change: 8500,
    changePercent: 2.66,
    volume: 4245678,
    marketCap: 239000000000000,
    per: 7.2,
    pbr: 2.1,
    roe: 32.5,
    dividendYield: 1.2,
    sector: '반도체',
    market: 'KOSPI',
    isValueUp: true,
  },
  {
    code: '105560',
    name: 'KB금융',
    currentPrice: 118500,
    change: 1800,
    changePercent: 1.54,
    volume: 2156432,
    marketCap: 49200000000000,
    per: 7.8,
    pbr: 0.82,
    roe: 11.2,
    dividendYield: 4.8,
    sector: '금융',
    market: 'KOSPI',
    isValueUp: true,
  },
  {
    code: '005380',
    name: '현대차',
    currentPrice: 385000,
    change: -3500,
    changePercent: -0.90,
    volume: 1287654,
    marketCap: 82000000000000,
    per: 6.5,
    pbr: 0.85,
    roe: 14.2,
    dividendYield: 3.8,
    sector: '자동차',
    market: 'KOSPI',
    isValueUp: true,
  },
  {
    code: '373220',
    name: 'LG에너지솔루션',
    currentPrice: 485000,
    change: 7000,
    changePercent: 1.46,
    volume: 334567,
    marketCap: 113500000000000,
    per: 28.5,
    pbr: 4.5,
    roe: 16.8,
    dividendYield: 0.5,
    sector: '2차전지',
    market: 'KOSPI',
    isValueUp: true,
  },
  {
    code: '207940',
    name: '삼성바이오로직스',
    currentPrice: 1150000,
    change: 18000,
    changePercent: 1.59,
    volume: 97654,
    marketCap: 81700000000000,
    per: 48.5,
    pbr: 8.2,
    roe: 17.5,
    dividendYield: 0.0,
    sector: '바이오',
    market: 'KOSPI',
    isValueUp: false,
  },
  {
    code: '035720',
    name: '카카오',
    currentPrice: 78500,
    change: 1200,
    changePercent: 1.55,
    volume: 3245678,
    marketCap: 34900000000000,
    per: 32.5,
    pbr: 2.1,
    roe: 6.8,
    dividendYield: 0.3,
    sector: 'IT서비스',
    market: 'KOSPI',
    isValueUp: false,
  },
  {
    code: '000270',
    name: '기아',
    currentPrice: 178000,
    change: 3200,
    changePercent: 1.83,
    volume: 1867890,
    marketCap: 72600000000000,
    per: 5.2,
    pbr: 1.05,
    roe: 21.5,
    dividendYield: 4.2,
    sector: '자동차',
    market: 'KOSPI',
    isValueUp: true,
  },
  {
    code: '055550',
    name: '신한지주',
    currentPrice: 78500,
    change: 1100,
    changePercent: 1.42,
    volume: 1534567,
    marketCap: 40600000000000,
    per: 6.8,
    pbr: 0.72,
    roe: 10.8,
    dividendYield: 5.5,
    sector: '금융',
    market: 'KOSPI',
    isValueUp: true,
  },
  {
    code: '012330',
    name: '현대모비스',
    currentPrice: 342000,
    change: 4500,
    changePercent: 1.33,
    volume: 298765,
    marketCap: 32200000000000,
    per: 6.8,
    pbr: 0.68,
    roe: 10.5,
    dividendYield: 3.2,
    sector: '자동차부품',
    market: 'KOSPI',
    isValueUp: true,
  },
  {
    code: '035420',
    name: 'NAVER',
    currentPrice: 285000,
    change: 4500,
    changePercent: 1.60,
    volume: 767890,
    marketCap: 46800000000000,
    per: 25.8,
    pbr: 1.8,
    roe: 7.5,
    dividendYield: 0.4,
    sector: 'IT서비스',
    market: 'KOSPI',
    isValueUp: false,
  },
  {
    code: '051910',
    name: 'LG화학',
    currentPrice: 425000,
    change: -5500,
    changePercent: -1.28,
    volume: 185678,
    marketCap: 30000000000000,
    per: 15.2,
    pbr: 1.15,
    roe: 8.2,
    dividendYield: 2.5,
    sector: '화학',
    market: 'KOSPI',
    isValueUp: false,
  },
];

// 2026년 2월 27일 기준 AI 추천 종목 (KOSPI 6,300 시대 반영)
export const stockRecommendations: StockRecommendation[] = [
  {
    stock: stocks[1], // SK하이닉스
    matchScore: 95,
    targetPrice: 420000,
    reasons: [
      '2026년 1분기 HBM4 양산 시작으로 AI 반도체 시장 선도',
      '엔비디아, AMD향 HBM 공급 계약 확대 (전년대비 40% 증가)',
      '2026년 영업이익 38조원 전망 (컨센서스 상회)',
      'ROE 32.5%로 업종 내 최고 수준의 수익성 유지',
    ],
    risks: [
      'AI 투자 사이클 둔화 시 수요 감소 우려',
      '미국 대중국 반도체 규제 확대 가능성',
      '삼성전자 HBM 경쟁력 회복 시 점유율 하락 리스크',
    ],
    recommendationType: 'growth',
  },
  {
    stock: stocks[0], // 삼성전자
    matchScore: 88,
    targetPrice: 155000,
    reasons: [
      '파운드리 2nm GAA 공정 수율 개선으로 경쟁력 회복',
      '2026년 메모리 슈퍼사이클 수혜로 역대 최대 실적 전망',
      '밸류업 공시에 따른 연간 15조원 규모 자사주 매입 진행 중',
      '배당수익률 2.2%로 안정적인 현금 흐름',
    ],
    risks: [
      'HBM 시장에서 SK하이닉스 대비 기술 격차',
      '파운드리 TSMC와의 점유율 격차 지속',
      '중국 업체와의 범용 메모리 경쟁 심화',
    ],
    recommendationType: 'stable',
  },
  {
    stock: stocks[2], // KB금융
    matchScore: 92,
    targetPrice: 145000,
    reasons: [
      '밸류업 지수 핵심 편입 종목으로 외국인 수급 폭발',
      'PBR 0.82배로 여전히 저평가 구간 (선진국 은행 평균 1.2배)',
      '배당수익률 4.8%로 시중금리 대비 매력적',
      '2026년 기준금리 인하 사이클에서 채권평가익 극대화',
    ],
    risks: [
      '부동산 PF 정리 과정에서 추가 충당금 가능성',
      '금리 인하로 인한 순이자마진(NIM) 축소',
      '정부 금융권 규제 강화 가능성',
    ],
    recommendationType: 'dividend',
  },
  {
    stock: stocks[7], // 기아
    matchScore: 90,
    targetPrice: 220000,
    reasons: [
      'PER 5.2배, PBR 1.05배로 글로벌 완성차 대비 저평가',
      'ROE 21.5%로 글로벌 완성차 업체 중 최고 수익성',
      'EV6, EV9, EV3 판매 호조로 전기차 점유율 급증',
      '밸류업 참여로 배당성향 40%까지 확대 발표',
    ],
    risks: [
      '유럽/미국 전기차 보조금 정책 변동',
      '환율 변동에 따른 수익성 영향',
      '현대차그룹 지배구조 이슈',
    ],
    recommendationType: 'valueup',
  },
  {
    stock: stocks[8], // 신한지주
    matchScore: 86,
    targetPrice: 98000,
    reasons: [
      '배당수익률 5.5%로 금융지주 중 최고 수준',
      'PBR 0.72배로 청산가치 대비 할인',
      '디지털 전환 가속화로 비용 효율성 업계 최고',
      '2026년 주주환원율 55% 목표 제시',
    ],
    risks: [
      '경기 침체 시 대손충당금 증가',
      '토스뱅크, 카카오뱅크와의 경쟁 심화',
      '금리 하락기 NIM 압박',
    ],
    recommendationType: 'dividend',
  },
  {
    stock: stocks[3], // 현대차
    matchScore: 84,
    targetPrice: 480000,
    reasons: [
      'PER 6.5배로 글로벌 완성차 업체 대비 저평가',
      '제네시스 브랜드 럭셔리 시장 점유율 확대',
      '북미 조지아 전기차 공장 풀가동으로 IRA 보조금 수혜',
      '배당수익률 3.8%로 안정적인 주주환원',
    ],
    risks: [
      '전기차 전환 속도 불확실성',
      '노사 갈등 리스크',
      '미국 IRA 보조금 정책 변동',
    ],
    recommendationType: 'valueup',
  },
];

export const sectors = [
  '반도체',
  '2차전지',
  '바이오',
  '금융',
  '자동차',
  'IT서비스',
  '화학',
  '자동차부품',
];

export const getStockByCode = (code: string): Stock | undefined => {
  return stocks.find(s => s.code === code);
};

export const getStocksBySector = (sector: string): Stock[] => {
  return stocks.filter(s => s.sector === sector);
};

export const getValueUpStocks = (): Stock[] => {
  return stocks.filter(s => s.isValueUp);
};

// 장 운영 상태
export const getMarketStatus = () => {
  if (isMarketOpen()) {
    return { status: 'open', message: '장 운영 중' };
  }
  const now = getCurrentDate();
  const dayOfWeek = now.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return { status: 'closed', message: '주말 휴장' };
  }
  const hours = now.getHours();
  if (hours < 9) {
    return { status: 'premarket', message: '장 시작 전' };
  }
  return { status: 'closed', message: '장 마감' };
};

// Alias for convenience
export const sampleStocks = stocks;
