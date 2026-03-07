'use client';

import { useEffect, useRef, useState } from 'react';

interface PerceptronChartProps {
  variant?: 'basic' | 'full';
}

export default function PerceptronChart({ variant = 'basic' }: PerceptronChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [weights, setWeights] = useState([0.5, 0.3, 0.2]);
  const [bias, setBias] = useState(0.1);
  const [inputs, setInputs] = useState([1, 0, 1]);

  const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Layout
    const inputX = 100;
    const sumX = 350;
    const activationX = 500;
    const outputX = 650;
    const centerY = height / 2;

    // Calculate values
    const weightedSum = inputs.reduce((sum, x, i) => sum + x * weights[i], 0) + bias;
    const output = sigmoid(weightedSum);

    // Draw input nodes
    const inputLabels = ['x₁', 'x₂', 'x₃'];
    const inputColors = ['#3B82F6', '#10B981', '#F59E0B'];

    inputs.forEach((input, i) => {
      const y = centerY - 80 + i * 80;

      // Input circle
      ctx.fillStyle = inputColors[i];
      ctx.beginPath();
      ctx.arc(inputX, y, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(inputLabels[i], inputX, y + 6);

      // Input value below
      ctx.fillStyle = '#374151';
      ctx.font = '12px sans-serif';
      ctx.fillText(`= ${input}`, inputX, y + 45);

      // Arrow with weight
      ctx.strokeStyle = inputColors[i];
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(inputX + 25, y);

      // Curve to sum node
      const cpX = (inputX + sumX) / 2;
      ctx.quadraticCurveTo(cpX, y, sumX - 35, centerY);
      ctx.stroke();

      // Weight label
      ctx.fillStyle = '#6B7280';
      ctx.font = '11px sans-serif';
      ctx.fillText(`w${i + 1}=${weights[i].toFixed(1)}`, cpX - 20, y + (centerY - y) * 0.3);
    });

    // Sum node
    const gradient = ctx.createRadialGradient(sumX, centerY, 0, sumX, centerY, 35);
    gradient.addColorStop(0, '#EC4899');
    gradient.addColorStop(1, '#BE185D');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(sumX, centerY, 35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Σ', sumX, centerY + 5);

    // Bias annotation
    if (variant === 'full') {
      ctx.fillStyle = '#8B5CF6';
      ctx.font = '12px sans-serif';
      ctx.fillText(`+b (${bias.toFixed(1)})`, sumX, centerY + 55);
    }

    // Sum value
    ctx.fillStyle = '#374151';
    ctx.font = '11px sans-serif';
    ctx.fillText(`z = ${weightedSum.toFixed(2)}`, sumX, centerY - 45);

    // Arrow to activation
    ctx.strokeStyle = '#EC4899';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sumX + 35, centerY);
    ctx.lineTo(activationX - 35, centerY);
    ctx.stroke();

    // Arrow head
    ctx.beginPath();
    ctx.moveTo(activationX - 35, centerY);
    ctx.lineTo(activationX - 45, centerY - 6);
    ctx.lineTo(activationX - 45, centerY + 6);
    ctx.closePath();
    ctx.fill();

    // Activation function node
    const actGradient = ctx.createRadialGradient(activationX, centerY, 0, activationX, centerY, 35);
    actGradient.addColorStop(0, '#8B5CF6');
    actGradient.addColorStop(1, '#6D28D9');
    ctx.fillStyle = actGradient;
    ctx.beginPath();
    ctx.arc(activationX, centerY, 35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('f(z)', activationX, centerY + 5);

    // Arrow to output
    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(activationX + 35, centerY);
    ctx.lineTo(outputX - 35, centerY);
    ctx.stroke();

    // Arrow head
    ctx.beginPath();
    ctx.moveTo(outputX - 35, centerY);
    ctx.lineTo(outputX - 45, centerY - 6);
    ctx.lineTo(outputX - 45, centerY + 6);
    ctx.closePath();
    ctx.fill();

    // Output node
    const outGradient = ctx.createRadialGradient(outputX, centerY, 0, outputX, centerY, 30);
    outGradient.addColorStop(0, '#22C55E');
    outGradient.addColorStop(1, '#16A34A');
    ctx.fillStyle = outGradient;
    ctx.beginPath();
    ctx.arc(outputX, centerY, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('y', outputX, centerY + 6);

    // Output value
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(`= ${output.toFixed(3)}`, outputX, centerY + 50);

    // Labels at top
    ctx.fillStyle = '#6B7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('입력층', inputX, 25);
    ctx.fillText('가중합', sumX, 25);
    ctx.fillText('활성화 함수', activationX, 25);
    ctx.fillText('출력', outputX, 25);
  };

  useEffect(() => {
    draw();
  }, [weights, bias, inputs]);

  const toggleInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = newInputs[index] === 1 ? 0 : 1;
    setInputs(newInputs);
  };

  return (
    <div className="my-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-800 flex items-center">
          <span className="mr-2">🔮</span>
          퍼셉트론 구조 {variant === 'full' ? '(전체)' : ''}
        </h4>
      </div>

      <canvas
        ref={canvasRef}
        width={750}
        height={280}
        className="w-full bg-white rounded-lg border border-gray-200"
      />

      {/* Interactive controls */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h5 className="font-semibold text-gray-700 mb-2">입력값 (클릭하여 변경)</h5>
          <div className="flex gap-2">
            {inputs.map((input, i) => (
              <button
                key={i}
                onClick={() => toggleInput(i)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                  input === 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                x{i + 1} = {input}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h5 className="font-semibold text-gray-700 mb-2">가중치 조절</h5>
          <div className="space-y-2">
            {weights.map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm w-12">w{i + 1}:</span>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={w}
                  onChange={(e) => {
                    const newWeights = [...weights];
                    newWeights[i] = parseFloat(e.target.value);
                    setWeights(newWeights);
                  }}
                  className="flex-1"
                />
                <span className="text-sm w-10 font-mono">{w.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-600 bg-white/50 rounded-lg p-3">
        <strong>💡 실험해보세요:</strong> 입력값과 가중치를 변경하면서 출력이 어떻게 바뀌는지 관찰해보세요!
      </div>
    </div>
  );
}
