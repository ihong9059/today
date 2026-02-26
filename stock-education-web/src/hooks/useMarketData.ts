'use client';

import { useState, useEffect, useCallback } from 'react';
import { MarketIndex } from '@/types';
import { marketIndices as fallbackIndices } from '@/data/stocks';

interface MarketDataState {
  indices: MarketIndex[];
  source: 'naver' | 'fallback';
  updatedAt: string;
  isLoading: boolean;
  error: string | null;
}

export function useMarketData(refreshInterval: number = 60000) {
  const [state, setState] = useState<MarketDataState>({
    indices: fallbackIndices,
    source: 'fallback',
    updatedAt: new Date().toISOString(),
    isLoading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/market', {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }

      const result = await response.json();

      if (result.success && result.data.indices.length > 0) {
        setState({
          indices: result.data.indices,
          source: result.data.source,
          updatedAt: result.data.updatedAt,
          isLoading: false,
          error: null
        });
      } else {
        // API 성공했지만 데이터 없음 - 폴백 사용
        setState(prev => ({
          ...prev,
          isLoading: false,
          source: 'fallback'
        }));
      }
    } catch (error) {
      console.error('Market data fetch error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'fallback'
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();

    // 주기적 갱신
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    ...state,
    refetch: fetchData
  };
}

// 개별 종목 데이터 훅
interface StockDataState {
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  isLoading: boolean;
  error: string | null;
}

export function useStockData(code: string, refreshInterval: number = 60000) {
  const [state, setState] = useState<StockDataState>({
    currentPrice: 0,
    change: 0,
    changePercent: 0,
    volume: 0,
    marketCap: 0,
    isLoading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    if (!code) return;

    try {
      const response = await fetch(`/api/market/stock?code=${code}`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }

      const result = await response.json();

      if (result.success) {
        setState({
          currentPrice: result.data.currentPrice,
          change: result.data.change,
          changePercent: result.data.changePercent,
          volume: result.data.volume,
          marketCap: result.data.marketCap,
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      console.error(`Stock ${code} fetch error:`, error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }, [code]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    ...state,
    refetch: fetchData
  };
}
