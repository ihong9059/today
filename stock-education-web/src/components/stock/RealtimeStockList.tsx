'use client';

import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { cn, formatNumber, formatPercent } from '@/lib/utils';

interface RealtimeStock {
  code: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketStatus: string;
}

interface RealtimeStockListProps {
  codes?: string[];
  limit?: number;
  refreshInterval?: number;
}

// 종목 코드와 한글 이름 매핑 (네이버 API 인코딩 문제 해결)
const STOCK_NAMES: Record<string, string> = {
  '005930': '삼성전자',
  '000660': 'SK하이닉스',
  '005380': '현대차',
  '000270': '기아',
  '105560': 'KB금융',
  '055550': '신한지주',
  '035420': 'NAVER',
  '035720': '카카오',
  '373220': 'LG에너지솔루션',
  '207940': '삼성바이오로직스',
  '051910': 'LG화학',
  '012330': '현대모비스',
};

const DEFAULT_CODES = ['005930', '000660', '105560'];

export default function RealtimeStockList({
  codes = DEFAULT_CODES,
  limit = 3,
  refreshInterval = 60000
}: RealtimeStockListProps) {
  const [stocks, setStocks] = useState<RealtimeStock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchStocks = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/stocks/realtime?codes=${codes.slice(0, limit).join(',')}`,
        { cache: 'no-store' }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch stocks');
      }

      const result = await response.json();

      if (result.success && result.data.stocks) {
        setStocks(result.data.stocks);
        setLastUpdated(new Date().toLocaleTimeString('ko-KR'));
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [codes, limit]);

  useEffect(() => {
    fetchStocks();

    const interval = setInterval(fetchStocks, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchStocks, refreshInterval]);

  if (error && stocks.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        데이터를 불러올 수 없습니다
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>실시간 시세</span>
        <button
          onClick={fetchStocks}
          disabled={isLoading}
          className="flex items-center gap-1 hover:text-gray-700"
        >
          <RefreshCw className={cn('w-3 h-3', isLoading && 'animate-spin')} />
          <span>{lastUpdated || '로딩 중...'}</span>
        </button>
      </div>

      {stocks.map((stock) => {
        const isPositive = stock.change >= 0;
        const displayName = STOCK_NAMES[stock.code] || stock.name;

        return (
          <div
            key={stock.code}
            className={cn(
              "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all",
              isLoading && "opacity-70"
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">{displayName}</div>
                <div className="text-xs text-gray-500">{stock.code}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {formatNumber(stock.currentPrice)}원
                </div>
                <div className={cn(
                  'flex items-center justify-end gap-1 text-sm',
                  isPositive ? 'text-red-500' : 'text-blue-500'
                )}>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>
                    {isPositive ? '+' : ''}{formatNumber(stock.change)}
                  </span>
                  <span className="text-xs">
                    ({formatPercent(stock.changePercent)})
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
