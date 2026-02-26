'use client';

import { Stock } from '@/types';
import { cn, formatNumber, formatPercent, formatPrice } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

interface StockCardProps {
  stock: Stock;
  onClick?: () => void;
  showDetails?: boolean;
}

export default function StockCard({ stock, onClick, showDetails = false }: StockCardProps) {
  const isPositive = stock.change >= 0;

  return (
    <Card hover onClick={onClick} className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{stock.name}</h3>
              {stock.isValueUp && (
                <Badge variant="info" className="text-xs">밸류업</Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">{stock.code}</p>
          </div>
          <div className={cn(
            'flex items-center gap-1 px-2 py-1 rounded-lg',
            isPositive ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
          )}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {formatPercent(stock.changePercent)}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(stock.currentPrice)}
            </p>
            <p className={cn(
              'text-sm',
              isPositive ? 'text-red-500' : 'text-blue-500'
            )}>
              {isPositive ? '+' : ''}{formatNumber(stock.change)}원
            </p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>거래량 {formatNumber(stock.volume)}</p>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-xs text-gray-500">PER</p>
              <p className="font-medium text-gray-900">{stock.per}배</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">PBR</p>
              <p className="font-medium text-gray-900">{stock.pbr}배</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">ROE</p>
              <p className="font-medium text-gray-900">{stock.roe}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">배당률</p>
              <p className="font-medium text-gray-900">{stock.dividendYield}%</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
