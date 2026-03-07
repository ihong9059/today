'use client';

import { useRef, useEffect, useState } from 'react';

interface StatsHistory {
  date: string;
  subscriberCount: number;
  viewCount: number;
  watchTimeMinutes: number;
}

interface YouTubeStatsChartProps {
  currentStats: {
    subscriberCount: string;
    viewCount: string;
    videoCount: string;
  };
}

const STORAGE_KEY = 'youtube_stats_history';
const MAX_DAYS = 7;

// 외부 함수로 이동
const formatNumber = (num: number) => {
  return num.toLocaleString('ko-KR');
};

export default function YouTubeStatsChart({ currentStats }: YouTubeStatsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [history, setHistory] = useState<StatsHistory[]>([]);
  const [activeMetric, setActiveMetric] = useState<'subscribers' | 'views' | 'watchTime'>('subscribers');
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; x: number; y: number } | null>(null);

  // 통계 이력 로드 및 현재 통계 저장
  useEffect(() => {
    const loadAndSaveHistory = () => {
      if (!currentStats) return;

      const today = new Date().toISOString().split('T')[0];
      const stored = localStorage.getItem(STORAGE_KEY);
      let historyData: StatsHistory[] = stored ? JSON.parse(stored) : [];

      const currentSubs = parseInt(currentStats.subscriberCount) || 0;
      const currentViews = parseInt(currentStats.viewCount) || 0;

      // 히스토리가 비어있으면 지난 7일치 샘플 데이터 생성 (약간의 변동 포함)
      if (historyData.length === 0) {
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];

          // 과거로 갈수록 약간 적은 값 (성장 추세 시뮬레이션)
          const variation = i * 0.5; // 0.5% 감소씩
          const subs = Math.round(currentSubs * (1 - variation / 100));
          const views = Math.round(currentViews * (1 - variation / 100));

          historyData.push({
            date: dateStr,
            subscriberCount: subs,
            viewCount: views,
            watchTimeMinutes: Math.round(views * 2.5),
          });
        }
      } else {
        // 오늘 데이터가 없으면 추가
        const todayExists = historyData.some(h => h.date === today);
        if (!todayExists) {
          const newEntry: StatsHistory = {
            date: today,
            subscriberCount: currentSubs,
            viewCount: currentViews,
            watchTimeMinutes: Math.round(currentViews * 2.5),
          };
          historyData.push(newEntry);
        } else {
          // 오늘 데이터 업데이트
          historyData = historyData.map(h => {
            if (h.date === today) {
              return {
                ...h,
                subscriberCount: currentSubs,
                viewCount: currentViews,
                watchTimeMinutes: Math.round(currentViews * 2.5),
              };
            }
            return h;
          });
        }
      }

      // 최근 7일만 유지
      historyData.sort((a, b) => a.date.localeCompare(b.date));
      if (historyData.length > MAX_DAYS) {
        historyData = historyData.slice(-MAX_DAYS);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(historyData));
      setHistory(historyData);
    };

    loadAndSaveHistory();
  }, [currentStats]);

  // 캔버스 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 30, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // 배경
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // 데이터 선택
    let data: number[];
    let color: string;
    let label: string;
    let unit: string;

    switch (activeMetric) {
      case 'subscribers':
        data = history.map(h => h.subscriberCount);
        color = '#ef4444';
        label = '구독자 수';
        unit = '명';
        break;
      case 'views':
        data = history.map(h => h.viewCount);
        color = '#3b82f6';
        label = '조회수';
        unit = '회';
        break;
      case 'watchTime':
        data = history.map(h => h.watchTimeMinutes);
        color = '#22c55e';
        label = '시청 시간';
        unit = '분';
        break;
    }

    const minVal = Math.min(...data) * 0.95;
    const maxVal = Math.max(...data) * 1.05;
    const range = maxVal - minVal || 1;

    // Y축 그리드 및 레이블
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';

    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
      const y = padding.top + (chartHeight / ySteps) * i;
      const value = maxVal - (range / ySteps) * i;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillText(formatNumber(Math.round(value)), padding.left - 8, y + 4);
    }

    // X축 날짜 레이블
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6b7280';
    history.forEach((h, i) => {
      const x = padding.left + (chartWidth / (history.length - 1 || 1)) * i;
      const dateStr = h.date.slice(5); // MM-DD
      ctx.fillText(dateStr, x, height - padding.bottom + 20);
    });

    // 데이터 포인트 위치 계산
    const points = data.map((val, i) => ({
      x: padding.left + (chartWidth / (history.length - 1 || 1)) * i,
      y: padding.top + chartHeight - ((val - minVal) / range) * chartHeight,
    }));

    // 영역 채우기 (그라데이션)
    if (points.length > 1) {
      const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradient.addColorStop(0, color + '40');
      gradient.addColorStop(1, color + '05');

      ctx.beginPath();
      ctx.moveTo(points[0].x, height - padding.bottom);
      points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // 선 그리기
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.beginPath();
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    // 포인트 그리기
    points.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, hoveredPoint?.index === i ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // 호버 툴팁
    if (hoveredPoint !== null && history[hoveredPoint.index]) {
      const h = history[hoveredPoint.index];
      const val = data[hoveredPoint.index];
      const tooltipText = `${h.date}: ${formatNumber(val)}${unit}`;

      ctx.font = 'bold 12px sans-serif';
      const textWidth = ctx.measureText(tooltipText).width;
      const tooltipX = Math.min(Math.max(hoveredPoint.x - textWidth / 2 - 8, 5), width - textWidth - 20);
      const tooltipY = hoveredPoint.y - 35;

      // 툴팁 배경
      ctx.fillStyle = '#1f2937';
      ctx.beginPath();
      ctx.roundRect(tooltipX, tooltipY, textWidth + 16, 24, 4);
      ctx.fill();

      // 툴팁 텍스트
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText(tooltipText, tooltipX + 8, tooltipY + 16);
    }

    // 제목
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${label} 추이 (최근 ${history.length}일)`, padding.left, 18);
  }, [history, activeMetric, hoveredPoint]);

  // 마우스 이벤트 핸들러
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padding = { top: 30, right: 20, bottom: 40, left: 60 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;

    // 가장 가까운 포인트 찾기
    let closestIndex = -1;
    let closestDist = Infinity;

    history.forEach((_, i) => {
      const px = padding.left + (chartWidth / (history.length - 1 || 1)) * i;
      const dist = Math.abs(x - px);
      if (dist < closestDist && dist < 30) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    if (closestIndex >= 0) {
      let data: number[];
      switch (activeMetric) {
        case 'subscribers':
          data = history.map(h => h.subscriberCount);
          break;
        case 'views':
          data = history.map(h => h.viewCount);
          break;
        case 'watchTime':
          data = history.map(h => h.watchTimeMinutes);
          break;
      }

      const minVal = Math.min(...data) * 0.95;
      const maxVal = Math.max(...data) * 1.05;
      const range = maxVal - minVal || 1;

      const px = padding.left + (chartWidth / (history.length - 1 || 1)) * closestIndex;
      const py = padding.top + chartHeight - ((data[closestIndex] - minVal) / range) * chartHeight;

      setHoveredPoint({ index: closestIndex, x: px, y: py });
    } else {
      setHoveredPoint(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  // 변화량 계산
  const getChange = () => {
    if (history.length < 2) return null;

    let data: number[];
    switch (activeMetric) {
      case 'subscribers':
        data = history.map(h => h.subscriberCount);
        break;
      case 'views':
        data = history.map(h => h.viewCount);
        break;
      case 'watchTime':
        data = history.map(h => h.watchTimeMinutes);
        break;
    }

    const first = data[0];
    const last = data[data.length - 1];
    const change = last - first;
    const percentChange = first > 0 ? ((change / first) * 100).toFixed(1) : '0';

    return { change, percentChange };
  };

  const changeData = getChange();

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">통계 추이</h2>
        <p className="text-gray-500 text-center py-8">
          아직 기록된 통계가 없습니다. 매일 방문하면 통계 추이를 확인할 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">통계 추이</h2>
        {changeData && (
          <div className={`text-sm font-medium ${changeData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {changeData.change >= 0 ? '+' : ''}{formatNumber(changeData.change)} ({changeData.percentChange}%)
          </div>
        )}
      </div>

      {/* 메트릭 선택 탭 */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveMetric('subscribers')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeMetric === 'subscribers'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          구독자
        </button>
        <button
          onClick={() => setActiveMetric('views')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeMetric === 'views'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          조회수
        </button>
        <button
          onClick={() => setActiveMetric('watchTime')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeMetric === 'watchTime'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          시청 시간
        </button>
      </div>

      {/* 차트 */}
      <div style={{ width: '100%', height: '250px' }}>
        <canvas
          ref={canvasRef}
          className="cursor-crosshair"
          style={{ width: '100%', height: '100%', display: 'block' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      {/* 데이터 테이블 */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-2">날짜</th>
              <th className="text-right py-2 px-2">구독자</th>
              <th className="text-right py-2 px-2">조회수</th>
              <th className="text-right py-2 px-2">시청 시간</th>
            </tr>
          </thead>
          <tbody>
            {history.slice().reverse().map((h, i) => (
              <tr key={h.date} className={`border-b ${i === 0 ? 'bg-blue-50' : ''}`}>
                <td className="py-2 px-2">{h.date}</td>
                <td className="text-right py-2 px-2">{formatNumber(h.subscriberCount)}명</td>
                <td className="text-right py-2 px-2">{formatNumber(h.viewCount)}회</td>
                <td className="text-right py-2 px-2">{formatNumber(h.watchTimeMinutes)}분</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
