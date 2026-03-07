'use client';

import { useEffect, useRef, useState } from 'react';

interface ChartData {
  name: string;
  color: string;
  description: string;
  formula: string;
}

const activationFunctions: ChartData[] = [
  {
    name: '계단 함수 (Step)',
    color: '#3B82F6', // blue
    description: '0 이하면 0, 0 초과면 1',
    formula: 'f(z) = 0 if z ≤ 0, 1 if z > 0'
  },
  {
    name: '시그모이드 (Sigmoid)',
    color: '#EF4444', // red
    description: '0~1 사이의 부드러운 곡선',
    formula: 'f(z) = 1 / (1 + e^(-z))'
  },
  {
    name: 'ReLU',
    color: '#22C55E', // green
    description: '0 이하면 0, 0 초과면 그대로',
    formula: 'f(z) = max(0, z)'
  }
];

// 활성화 함수 계산
function step(z: number): number {
  return z > 0 ? 1 : 0;
}

function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

function relu(z: number): number {
  return Math.max(0, z);
}

export default function ActivationFunctionChart() {
  const canvasRefs = [useRef<HTMLCanvasElement>(null), useRef<HTMLCanvasElement>(null), useRef<HTMLCanvasElement>(null)];
  const [hoveredPoint, setHoveredPoint] = useState<{ chart: number; z: number; y: number } | null>(null);

  const drawChart = (canvas: HTMLCanvasElement, funcType: number, highlight?: { z: number; y: number }) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let i = -5; i <= 5; i++) {
      const x = padding + ((i + 5) / 10) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    const yRange = funcType === 2 ? 6 : 1.2; // ReLU needs larger range
    const ySteps = funcType === 2 ? 6 : 4;
    for (let i = 0; i <= ySteps; i++) {
      const y = height - padding - (i / ySteps) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;

    // X-axis
    const yZero = height - padding - (funcType === 2 ? 0 : 0) * chartHeight / yRange;
    const actualYZero = funcType === 2
      ? height - padding
      : height - padding - (0 / yRange) * chartHeight;

    ctx.beginPath();
    ctx.moveTo(padding, actualYZero);
    ctx.lineTo(width - padding, actualYZero);
    ctx.stroke();

    // Y-axis (at z=0, which is center)
    const xZero = padding + 0.5 * chartWidth;
    ctx.beginPath();
    ctx.moveTo(xZero, padding);
    ctx.lineTo(xZero, height - padding);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('z', width - padding + 15, actualYZero + 4);
    ctx.fillText('출력', xZero, padding - 10);

    // X-axis ticks
    ctx.font = '10px sans-serif';
    for (let i = -5; i <= 5; i += 2) {
      if (i === 0) continue;
      const x = padding + ((i + 5) / 10) * chartWidth;
      ctx.fillText(String(i), x, actualYZero + 15);
    }
    ctx.fillText('0', xZero, actualYZero + 15);

    // Y-axis ticks
    ctx.textAlign = 'right';
    if (funcType === 2) {
      // ReLU: 0 to 5
      for (let i = 1; i <= 5; i++) {
        const y = height - padding - (i / yRange) * chartHeight;
        ctx.fillText(String(i), padding - 5, y + 4);
      }
    } else {
      // Step/Sigmoid: 0 to 1
      ctx.fillText('0', padding - 5, height - padding + 4);
      ctx.fillText('0.5', padding - 5, height - padding - chartHeight / 2 + 4);
      ctx.fillText('1', padding - 5, padding + 4);
    }

    // Draw function
    ctx.strokeStyle = activationFunctions[funcType].color;
    ctx.lineWidth = 3;
    ctx.beginPath();

    const func = funcType === 0 ? step : funcType === 1 ? sigmoid : relu;

    for (let px = 0; px <= chartWidth; px++) {
      const z = (px / chartWidth) * 10 - 5; // -5 to 5
      let y = func(z);

      // Normalize y to chart coordinates
      const normalizedY = funcType === 2
        ? y / yRange
        : y / yRange;

      const canvasY = height - padding - normalizedY * chartHeight;
      const canvasX = padding + px;

      if (px === 0) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();

    // Highlight point on hover
    if (highlight) {
      const px = ((highlight.z + 5) / 10) * chartWidth;
      const normalizedY = funcType === 2
        ? highlight.y / yRange
        : highlight.y / yRange;
      const py = height - padding - normalizedY * chartHeight;

      ctx.fillStyle = activationFunctions[funcType].color;
      ctx.beginPath();
      ctx.arc(padding + px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      // Tooltip
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      const tooltipX = padding + px + 10;
      const tooltipY = py - 10;
      ctx.fillText(`z=${highlight.z.toFixed(1)}, y=${highlight.y.toFixed(2)}`, tooltipX, tooltipY);
    }
  };

  useEffect(() => {
    canvasRefs.forEach((ref, idx) => {
      if (ref.current) {
        const highlight = hoveredPoint?.chart === idx ? { z: hoveredPoint.z, y: hoveredPoint.y } : undefined;
        drawChart(ref.current, idx, highlight);
      }
    });
  }, [hoveredPoint]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>, chartIndex: number) => {
    const canvas = canvasRefs[chartIndex].current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;

    if (x < padding || x > canvas.width - padding) {
      setHoveredPoint(null);
      return;
    }

    const z = ((x - padding) / chartWidth) * 10 - 5;
    const func = chartIndex === 0 ? step : chartIndex === 1 ? sigmoid : relu;
    const y = func(z);

    setHoveredPoint({ chart: chartIndex, z, y });
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <div className="my-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-blue-200 shadow-sm">
      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">📊</span>
        활성화 함수 시각화
        <span className="ml-2 text-sm font-normal text-gray-500">(마우스를 올려 값 확인)</span>
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activationFunctions.map((func, idx) => (
          <div key={func.name} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: func.color }}
              />
              <span className="font-semibold text-gray-800 text-sm">{func.name}</span>
            </div>

            <canvas
              ref={canvasRefs[idx]}
              width={280}
              height={200}
              className="w-full cursor-crosshair rounded border border-gray-200"
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={handleMouseLeave}
            />

            <div className="mt-2 text-xs text-gray-600">
              <div className="font-mono bg-gray-100 px-2 py-1 rounded mb-1">
                {func.formula}
              </div>
              <div className="text-gray-500">{func.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600 bg-white/50 rounded-lg p-3">
        <strong>💡 팁:</strong> 각 그래프 위에 마우스를 올리면 해당 지점의 z값과 출력값을 확인할 수 있어요!
      </div>
    </div>
  );
}
