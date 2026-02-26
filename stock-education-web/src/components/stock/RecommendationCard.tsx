'use client';

import { StockRecommendation } from '@/types';
import { cn, formatPrice, formatPercent } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Target,
  BarChart3
} from 'lucide-react';

interface RecommendationCardProps {
  recommendation: StockRecommendation;
  rank?: number;
  onViewDetail?: () => void;
  onAddToWatchlist?: () => void;
}

const typeLabels = {
  stable: { label: '안정형', variant: 'success' as const },
  growth: { label: '성장형', variant: 'info' as const },
  valueup: { label: '밸류업', variant: 'warning' as const },
  dividend: { label: '배당형', variant: 'default' as const },
};

export default function RecommendationCard({
  recommendation,
  rank,
  onViewDetail,
  onAddToWatchlist,
}: RecommendationCardProps) {
  const { stock, matchScore, targetPrice, reasons, risks, recommendationType } = recommendation;
  const isPositive = stock.change >= 0;
  const upside = ((targetPrice - stock.currentPrice) / stock.currentPrice) * 100;
  const typeInfo = typeLabels[recommendationType];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {rank && (
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {rank}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl">{stock.name}</CardTitle>
                <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
                {stock.isValueUp && <Badge variant="info">밸류업</Badge>}
              </div>
              <p className="text-sm text-gray-500">{stock.code} | {stock.sector}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">매칭도</span>
              <span className="text-2xl font-bold text-blue-600">{matchScore}%</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Price Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-500 mb-1">현재가</p>
            <p className="text-xl font-bold text-gray-900">{formatPrice(stock.currentPrice)}</p>
            <p className={cn(
              'text-sm font-medium',
              isPositive ? 'text-red-500' : 'text-blue-500'
            )}>
              {formatPercent(stock.changePercent)}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-blue-600 mb-1 flex items-center gap-1">
              <Target className="w-4 h-4" />
              목표가
            </p>
            <p className="text-xl font-bold text-blue-600">{formatPrice(targetPrice)}</p>
            <p className="text-sm font-medium text-blue-500">
              +{upside.toFixed(1)}% 상승 여력
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-2 mb-6 text-center">
          <div className="p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">PER</p>
            <p className="font-semibold">{stock.per}배</p>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">PBR</p>
            <p className="font-semibold">{stock.pbr}배</p>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">ROE</p>
            <p className="font-semibold">{stock.roe}%</p>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">배당률</p>
            <p className="font-semibold">{stock.dividendYield}%</p>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              추천 이유
            </h4>
            <ul className="space-y-1">
              {reasons.slice(0, 3).map((reason, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              투자 리스크
            </h4>
            <ul className="space-y-1">
              {risks.slice(0, 2).map((risk, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={onViewDetail} className="flex-1">
            <BarChart3 className="w-4 h-4 mr-2" />
            상세 분석
          </Button>
          <Button variant="outline" onClick={onAddToWatchlist}>
            모의투자
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
