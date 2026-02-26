'use client';

import { useState, useEffect } from 'react';
import { getLastUpdateTime, getMarketStatus } from '@/data/stocks';
import { useMarketData } from '@/hooks/useMarketData';
import { cn, formatNumber, formatPercent } from '@/lib/utils';
import { TrendingUp, TrendingDown, Clock, Circle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

export default function MarketOverview() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [marketStatus, setMarketStatus] = useState({ status: '', message: '' });

  // 실시간 시장 데이터 훅 (1분마다 갱신)
  const { indices, source, isLoading, error, refetch } = useMarketData(60000);

  useEffect(() => {
    // 초기 시간 설정
    setCurrentTime(getLastUpdateTime());
    setMarketStatus(getMarketStatus());

    // 1분마다 시간 업데이트
    const interval = setInterval(() => {
      setCurrentTime(getLastUpdateTime());
      setMarketStatus(getMarketStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      {/* 시간 및 장 상태 표시 */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{currentTime || '로딩 중...'}</span>
          {/* 데이터 소스 표시 */}
          <span className="flex items-center gap-1 text-xs">
            {source === 'naver' ? (
              <><Wifi className="w-3 h-3 text-green-500" /> 실시간</>
            ) : (
              <><WifiOff className="w-3 h-3 text-gray-400" /> 캐시</>
            )}
          </span>
          {/* 새로고침 버튼 */}
          <button
            onClick={refetch}
            disabled={isLoading}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="새로고침"
          >
            <RefreshCw className={cn('w-3 h-3', isLoading && 'animate-spin')} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Circle
            className={cn(
              'w-2 h-2',
              marketStatus.status === 'open' ? 'fill-green-500 text-green-500' :
              marketStatus.status === 'premarket' ? 'fill-yellow-500 text-yellow-500' :
              'fill-gray-400 text-gray-400'
            )}
          />
          <span className={cn(
            'font-medium',
            marketStatus.status === 'open' ? 'text-green-600' :
            marketStatus.status === 'premarket' ? 'text-yellow-600' :
            'text-gray-500'
          )}>
            {marketStatus.message || '확인 중...'}
          </span>
        </div>
      </div>

      {/* 에러 표시 */}
      {error && (
        <div className="text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded">
          데이터 로드 실패 - 캐시된 데이터를 표시 중입니다
        </div>
      )}

      {/* 지수 카드들 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {indices.map((index) => {
          const isPositive = index.change >= 0;
          return (
            <div
              key={index.name}
              className={cn(
                "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow",
                isLoading && "animate-pulse"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">{index.name}</span>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-red-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {formatNumber(index.value, 2)}
                </span>
                <div className="text-right">
                  <div className={cn(
                    'text-sm font-medium',
                    isPositive ? 'text-red-500' : 'text-blue-500'
                  )}>
                    {isPositive ? '+' : ''}{formatNumber(index.change, 2)}
                  </div>
                  <div className={cn(
                    'text-xs',
                    isPositive ? 'text-red-400' : 'text-blue-400'
                  )}>
                    {formatPercent(index.changePercent)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
