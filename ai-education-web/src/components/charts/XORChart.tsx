'use client';

import { useEffect, useRef, useState } from 'react';

export default function XORChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showLines, setShowLines] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // XOR truth table
  const points = [
    { x: 0, y: 0, output: 0, label: '(0,0) → 0' },
    { x: 1, y: 0, output: 1, label: '(1,0) → 1' },
    { x: 0, y: 1, output: 1, label: '(0,1) → 1' },
    { x: 1, y: 1, output: 0, label: '(1,1) → 0' },
  ];

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;
    const chartSize = Math.min(width, height) - padding * 2;

    // Clear
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const pos = padding + (chartSize / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pos, padding);
      ctx.lineTo(pos, padding + chartSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(padding, pos);
      ctx.lineTo(padding + chartSize, pos);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding + chartSize);
    ctx.lineTo(padding + chartSize + 20, padding + chartSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(padding, padding - 20);
    ctx.lineTo(padding, padding + chartSize);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('x₁', padding + chartSize + 35, padding + chartSize + 5);
    ctx.fillText('x₂', padding - 5, padding - 30);

    // Axis ticks
    ctx.font = '12px sans-serif';
    ctx.fillText('0', padding, padding + chartSize + 20);
    ctx.fillText('1', padding + chartSize, padding + chartSize + 20);
    ctx.textAlign = 'right';
    ctx.fillText('0', padding - 10, padding + chartSize + 5);
    ctx.fillText('1', padding - 10, padding + 5);

    // Draw separating lines (can't do with single line!)
    if (showLines) {
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2;

      // Line 1: separates (0,0) and (1,0) from (0,1) and (1,1)... not quite right
      // Line 2: another attempt
      // Show that NO single line works

      // Diagonal line attempt 1
      ctx.beginPath();
      ctx.moveTo(padding - 20, padding + chartSize + 20);
      ctx.lineTo(padding + chartSize / 2, padding + chartSize / 2);
      ctx.stroke();

      // Diagonal line attempt 2
      ctx.beginPath();
      ctx.moveTo(padding + chartSize / 2, padding + chartSize / 2);
      ctx.lineTo(padding + chartSize + 20, padding - 20);
      ctx.stroke();

      ctx.setLineDash([]);

      // Labels for lines
      ctx.fillStyle = '#8B5CF6';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('← 직선 1', padding + chartSize * 0.2, padding + chartSize * 0.85);
      ctx.fillText('← 직선 2', padding + chartSize * 0.7, padding + chartSize * 0.25);
    }

    // Draw points
    points.forEach((point, i) => {
      const px = padding + point.x * chartSize;
      const py = padding + chartSize - point.y * chartSize;
      const isHovered = hoveredPoint === i;
      const radius = isHovered ? 20 : 15;

      // Point color based on output
      if (point.output === 0) {
        ctx.fillStyle = '#EF4444'; // Red for 0
      } else {
        ctx.fillStyle = '#3B82F6'; // Blue for 1
      }

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();

      // Border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Output label inside
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${isHovered ? 16 : 14}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(String(point.output), px, py + 5);

      // Coordinate label
      if (isHovered) {
        ctx.fillStyle = '#374151';
        ctx.font = '12px sans-serif';
        ctx.fillText(point.label, px, py + 35);
      }
    });

    // Legend
    const legendX = padding + chartSize + 50;
    const legendY = padding + 20;

    ctx.fillStyle = '#374151';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('XOR 결과:', legendX, legendY);

    ctx.fillStyle = '#3B82F6';
    ctx.beginPath();
    ctx.arc(legendX + 10, legendY + 25, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.fillText('= 1 (다름)', legendX + 25, legendY + 30);

    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(legendX + 10, legendY + 50, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#374151';
    ctx.fillText('= 0 (같음)', legendX + 25, legendY + 55);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padding = 60;
    const chartSize = Math.min(canvas.width, canvas.height) - padding * 2;

    let found = -1;
    points.forEach((point, i) => {
      const px = padding + point.x * chartSize;
      const py = padding + chartSize - point.y * chartSize;
      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
      if (dist < 25) found = i;
    });

    setHoveredPoint(found >= 0 ? found : null);
  };

  useEffect(() => {
    draw();
  }, [showLines, hoveredPoint]);

  return (
    <div className="my-6 bg-gradient-to-br from-red-50 to-blue-50 rounded-xl p-6 border border-purple-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-800 flex items-center">
          <span className="mr-2">⊕</span>
          XOR 문제 시각화
        </h4>
        <button
          onClick={() => setShowLines(!showLines)}
          className={`px-3 py-1 text-sm rounded-lg transition-colors ${
            showLines
              ? 'bg-purple-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {showLines ? '✓ 분류선 표시' : '분류선 숨김'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <canvas
          ref={canvasRef}
          width={450}
          height={350}
          className="bg-white rounded-lg border border-gray-200 cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        />

        <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200">
          <h5 className="font-semibold text-gray-800 mb-3">XOR 진리표</h5>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 text-left">x₁</th>
                <th className="px-3 py-2 text-left">x₂</th>
                <th className="px-3 py-2 text-left">XOR</th>
                <th className="px-3 py-2 text-left">의미</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-3 py-2">0</td>
                <td className="px-3 py-2">0</td>
                <td className="px-3 py-2 text-red-500 font-bold">0</td>
                <td className="px-3 py-2 text-gray-500">둘 다 거짓</td>
              </tr>
              <tr className="border-t">
                <td className="px-3 py-2">0</td>
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2 text-blue-500 font-bold">1</td>
                <td className="px-3 py-2 text-gray-500">하나만 참</td>
              </tr>
              <tr className="border-t">
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2">0</td>
                <td className="px-3 py-2 text-blue-500 font-bold">1</td>
                <td className="px-3 py-2 text-gray-500">하나만 참</td>
              </tr>
              <tr className="border-t">
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2 text-red-500 font-bold">0</td>
                <td className="px-3 py-2 text-gray-500">둘 다 참</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <strong className="text-yellow-800">🤔 문제점:</strong>
            <p className="text-sm text-yellow-700 mt-1">
              파란점(1)과 빨간점(0)을 <strong>하나의 직선</strong>으로 분리할 수 없습니다!
              → 이것이 바로 "선형 분리 불가능" 문제입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
