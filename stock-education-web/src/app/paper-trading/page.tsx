'use client';

import { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Plus,
  Minus,
  AlertTriangle
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import StockCard from '@/components/stock/StockCard';
import { sampleStocks } from '@/data/stocks';
import { cn, formatNumber, formatPrice, formatPercent } from '@/lib/utils';
import { PaperPortfolio, PaperTrade, Stock } from '@/types';

const initialPortfolio: PaperPortfolio = {
  cash: 100000000,
  totalValue: 100000000,
  holdings: [],
  totalReturn: 0,
  totalReturnPercent: 0,
  trades: []
};

export default function PaperTradingPage() {
  const [portfolio, setPortfolio] = useState<PaperPortfolio>(initialPortfolio);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState(1);
  const [showTradeModal, setShowTradeModal] = useState(false);

  const handleSelectStock = (stock: Stock) => {
    setSelectedStock(stock);
    setShowTradeModal(true);
    setQuantity(1);
    setTradeType('buy');
  };

  const handleTrade = () => {
    if (!selectedStock) return;

    const totalCost = selectedStock.currentPrice * quantity;

    if (tradeType === 'buy') {
      if (totalCost > portfolio.cash) {
        alert('잔고가 부족합니다.');
        return;
      }

      const existingHolding = portfolio.holdings.find(h => h.stock.code === selectedStock.code);
      let newHoldings;

      if (existingHolding) {
        const newQuantity = existingHolding.quantity + quantity;
        const newAvgPrice = (existingHolding.avgPrice * existingHolding.quantity + totalCost) / newQuantity;
        newHoldings = portfolio.holdings.map(h =>
          h.stock.code === selectedStock.code
            ? { ...h, quantity: newQuantity, avgPrice: newAvgPrice }
            : h
        );
      } else {
        newHoldings = [...portfolio.holdings, {
          stock: selectedStock,
          quantity,
          avgPrice: selectedStock.currentPrice,
          currentValue: totalCost,
          returnPercent: 0
        }];
      }

      const newTrade: PaperTrade = {
        id: Date.now().toString(),
        stock: selectedStock,
        type: 'buy',
        quantity,
        price: selectedStock.currentPrice,
        totalAmount: totalCost,
        timestamp: new Date()
      };

      setPortfolio(prev => ({
        ...prev,
        cash: prev.cash - totalCost,
        holdings: newHoldings,
        trades: [newTrade, ...prev.trades]
      }));
    } else {
      const existingHolding = portfolio.holdings.find(h => h.stock.code === selectedStock.code);
      if (!existingHolding || existingHolding.quantity < quantity) {
        alert('보유 수량이 부족합니다.');
        return;
      }

      const newQuantity = existingHolding.quantity - quantity;
      let newHoldings;

      if (newQuantity === 0) {
        newHoldings = portfolio.holdings.filter(h => h.stock.code !== selectedStock.code);
      } else {
        newHoldings = portfolio.holdings.map(h =>
          h.stock.code === selectedStock.code
            ? { ...h, quantity: newQuantity }
            : h
        );
      }

      const newTrade: PaperTrade = {
        id: Date.now().toString(),
        stock: selectedStock,
        type: 'sell',
        quantity,
        price: selectedStock.currentPrice,
        totalAmount: totalCost,
        timestamp: new Date()
      };

      setPortfolio(prev => ({
        ...prev,
        cash: prev.cash + totalCost,
        holdings: newHoldings,
        trades: [newTrade, ...prev.trades]
      }));
    }

    setShowTradeModal(false);
    setSelectedStock(null);
  };

  const handleReset = () => {
    if (confirm('모의투자를 초기화하시겠습니까? 모든 거래 내역이 삭제됩니다.')) {
      setPortfolio(initialPortfolio);
    }
  };

  // Calculate total portfolio value
  const holdingsValue = portfolio.holdings.reduce((sum, h) => sum + h.stock.currentPrice * h.quantity, 0);
  const totalValue = portfolio.cash + holdingsValue;
  const totalReturn = totalValue - 100000000;
  const totalReturnPercent = (totalReturn / 100000000) * 100;

  const getHoldingForStock = (stockCode: string) => {
    return portfolio.holdings.find(h => h.stock.code === stockCode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <PieChart className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">모의투자</h1>
          <p className="text-green-100 max-w-2xl mx-auto">
            1억원 가상 자금으로 실전처럼 투자를 연습해보세요. 리스크 없이 투자 감각을 키울 수 있습니다.
          </p>
        </div>
      </section>

      {/* Portfolio Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">총 자산</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(totalValue)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <PieChart className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">투자금액</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(holdingsValue)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">현금</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(portfolio.cash)}
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            'shadow-lg',
            totalReturn >= 0 ? 'bg-red-50' : 'bg-blue-50'
          )}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                {totalReturn >= 0 ? (
                  <ArrowUpRight className="w-5 h-5 text-red-500" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-blue-500" />
                )}
                <span className="text-sm text-gray-500">총 수익</span>
              </div>
              <div className={cn(
                'text-2xl font-bold',
                totalReturn >= 0 ? 'text-red-600' : 'text-blue-600'
              )}>
                {totalReturn >= 0 ? '+' : ''}{formatPrice(totalReturn)}
                <span className="text-sm ml-2">
                  ({formatPercent(totalReturnPercent)})
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Holdings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">보유 종목</h2>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            초기화
          </Button>
        </div>

        {portfolio.holdings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <PieChart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">보유 종목이 없습니다</h3>
              <p className="text-gray-500 mb-4">아래 종목 목록에서 원하는 종목을 선택하여 투자해보세요.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.holdings.map((holding) => {
              const currentValue = holding.stock.currentPrice * holding.quantity;
              const investedValue = holding.avgPrice * holding.quantity;
              const returnValue = currentValue - investedValue;
              const returnPercent = (returnValue / investedValue) * 100;
              const isPositive = returnValue >= 0;

              return (
                <Card key={holding.stock.code} hover onClick={() => handleSelectStock(holding.stock)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{holding.stock.name}</h3>
                        <p className="text-sm text-gray-500">{holding.stock.code}</p>
                      </div>
                      <Badge variant={isPositive ? 'danger' : 'info'}>
                        {isPositive ? '+' : ''}{returnPercent.toFixed(2)}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">수량</p>
                        <p className="font-medium">{holding.quantity}주</p>
                      </div>
                      <div>
                        <p className="text-gray-500">평균단가</p>
                        <p className="font-medium">{formatPrice(holding.avgPrice)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">평가금액</p>
                        <p className="font-medium">{formatPrice(currentValue)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">평가손익</p>
                        <p className={cn(
                          'font-medium',
                          isPositive ? 'text-red-600' : 'text-blue-600'
                        )}>
                          {isPositive ? '+' : ''}{formatPrice(returnValue)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Stock List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">종목 목록</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleStocks.map((stock) => (
            <div key={stock.code} className="relative">
              <StockCard
                stock={stock}
                onClick={() => handleSelectStock(stock)}
                showDetails
              />
              {getHoldingForStock(stock.code) && (
                <div className="absolute top-2 right-2">
                  <Badge variant="success">보유중</Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Trade History */}
      {portfolio.trades.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">거래 내역</h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">종목</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">유형</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">수량</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">단가</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">금액</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">시간</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {portfolio.trades.slice(0, 10).map((trade) => (
                      <tr key={trade.id}>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{trade.stock.name}</div>
                          <div className="text-sm text-gray-500">{trade.stock.code}</div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={trade.type === 'buy' ? 'danger' : 'info'}>
                            {trade.type === 'buy' ? '매수' : '매도'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">{trade.quantity}주</td>
                        <td className="px-4 py-3 text-right">{formatPrice(trade.price)}</td>
                        <td className="px-4 py-3 text-right font-medium">{formatPrice(trade.totalAmount)}</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-500">
                          {trade.timestamp.toLocaleString('ko-KR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Trade Modal */}
      {showTradeModal && selectedStock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>주문하기</CardTitle>
              <CardDescription>
                {selectedStock.name} ({selectedStock.code})
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Trade Type Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setTradeType('buy')}
                  className={cn(
                    'flex-1 py-3 rounded-lg font-medium transition-all',
                    tradeType === 'buy'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  )}
                >
                  매수
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={cn(
                    'flex-1 py-3 rounded-lg font-medium transition-all',
                    tradeType === 'sell'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  )}
                >
                  매도
                </button>
              </div>

              {/* Stock Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500">현재가</span>
                  <span className="text-xl font-bold">{formatPrice(selectedStock.currentPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">등락률</span>
                  <span className={cn(
                    'font-medium',
                    selectedStock.change >= 0 ? 'text-red-500' : 'text-blue-500'
                  )}>
                    {formatPercent(selectedStock.changePercent)}
                  </span>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  수량
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 text-center text-xl font-bold border rounded-lg py-2"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">총 주문금액</span>
                  <span className="text-xl font-bold">
                    {formatPrice(selectedStock.currentPrice * quantity)}
                  </span>
                </div>
                {tradeType === 'buy' && (
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-gray-500">주문 가능</span>
                    <span className="text-gray-600">{formatPrice(portfolio.cash)}</span>
                  </div>
                )}
                {tradeType === 'sell' && (
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-gray-500">보유 수량</span>
                    <span className="text-gray-600">
                      {getHoldingForStock(selectedStock.code)?.quantity || 0}주
                    </span>
                  </div>
                )}
              </div>

              {/* Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    모의투자는 가상의 거래이며, 실제 주식 시장과 다를 수 있습니다.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowTradeModal(false)}
                >
                  취소
                </Button>
                <Button
                  className={cn(
                    'flex-1',
                    tradeType === 'buy' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                  )}
                  onClick={handleTrade}
                >
                  {tradeType === 'buy' ? '매수하기' : '매도하기'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
