'use client';

import { useEffect, useRef, useState } from 'react';

export default function NeuronFlowChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animated, setAnimated] = useState(false);
  const animationRef = useRef<number>(0);
  const progressRef = useRef<number>(0);

  const draw = (progress: number = 1) => {
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
    const inputX = 80;
    const cellBodyX = 280;
    const axonX = 450;
    const synapseX = 550;
    const outputX = 650;
    const centerY = height / 2;

    // Draw input signals
    const signals = ['신호 A', '신호 B', '신호 C'];
    const signalColors = ['#3B82F6', '#10B981', '#F59E0B'];

    signals.forEach((signal, i) => {
      const y = centerY - 60 + i * 60;

      // Signal box
      ctx.fillStyle = signalColors[i];
      ctx.fillRect(inputX - 40, y - 15, 80, 30);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(signal, inputX, y + 5);

      // Arrow to cell body
      const arrowProgress = Math.min(1, progress * 3 - i * 0.3);
      if (arrowProgress > 0) {
        const endX = inputX + 40 + (cellBodyX - 60 - inputX - 40) * arrowProgress;
        ctx.strokeStyle = signalColors[i];
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(inputX + 40, y);
        ctx.lineTo(endX, y);
        ctx.stroke();

        if (arrowProgress >= 1) {
          // Arrow head
          ctx.beginPath();
          ctx.moveTo(cellBodyX - 60, y);
          ctx.lineTo(cellBodyX - 70, y - 6);
          ctx.lineTo(cellBodyX - 70, y + 6);
          ctx.closePath();
          ctx.fillStyle = signalColors[i];
          ctx.fill();
        }
      }
    });

    // Cell body (soma)
    if (progress > 0.3) {
      const cellProgress = Math.min(1, (progress - 0.3) * 2);
      ctx.save();
      ctx.globalAlpha = cellProgress;

      // Gradient circle for cell body
      const gradient = ctx.createRadialGradient(cellBodyX, centerY, 0, cellBodyX, centerY, 50);
      gradient.addColorStop(0, '#EC4899');
      gradient.addColorStop(1, '#BE185D');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cellBodyX, centerY, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('세포체', cellBodyX, centerY - 5);
      ctx.fillText('(합산 & 판단)', cellBodyX, centerY + 12);
      ctx.restore();
    }

    // Axon
    if (progress > 0.5) {
      const axonProgress = Math.min(1, (progress - 0.5) * 2);
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cellBodyX + 50, centerY);
      ctx.lineTo(cellBodyX + 50 + (axonX - cellBodyX - 50) * axonProgress, centerY);
      ctx.stroke();

      if (axonProgress >= 1) {
        ctx.fillStyle = '#8B5CF6';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('축삭돌기', (cellBodyX + 50 + axonX) / 2, centerY - 15);
      }
    }

    // Synapse
    if (progress > 0.7) {
      const synapseProgress = Math.min(1, (progress - 0.7) * 3);
      ctx.save();
      ctx.globalAlpha = synapseProgress;

      ctx.fillStyle = '#F97316';
      ctx.beginPath();
      ctx.arc(synapseX, centerY, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('시냅스', synapseX, centerY + 4);
      ctx.restore();
    }

    // Output arrow
    if (progress > 0.85) {
      const outputProgress = Math.min(1, (progress - 0.85) * 5);
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(synapseX + 20, centerY);
      ctx.lineTo(synapseX + 20 + (outputX - synapseX - 20) * outputProgress, centerY);
      ctx.stroke();

      if (outputProgress >= 1) {
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(outputX, centerY);
        ctx.lineTo(outputX - 10, centerY - 6);
        ctx.lineTo(outputX - 10, centerY + 6);
        ctx.closePath();
        ctx.fillStyle = '#EF4444';
        ctx.fill();

        ctx.fillStyle = '#EF4444';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('다음 뉴런으로!', outputX + 10, centerY + 5);
      }
    }

    // Labels at top
    ctx.fillStyle = '#6B7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('여러 신호가 들어옴', inputX, 30);
    ctx.fillText('신호를 모아서 판단', cellBodyX, 30);
    ctx.fillText('결정을 전달', (axonX + outputX) / 2, 30);
  };

  const animate = () => {
    progressRef.current += 0.02;
    draw(progressRef.current);

    if (progressRef.current < 1) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const startAnimation = () => {
    progressRef.current = 0;
    setAnimated(true);
    animate();
  };

  const resetAnimation = () => {
    cancelAnimationFrame(animationRef.current);
    progressRef.current = 1;
    setAnimated(false);
    draw(1);
  };

  useEffect(() => {
    draw(1);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="my-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-800 flex items-center">
          <span className="mr-2">🧠</span>
          뉴런의 신호 전달 과정
        </h4>
        <div className="flex gap-2">
          <button
            onClick={startAnimation}
            className="px-3 py-1 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors"
          >
            ▶ 애니메이션
          </button>
          <button
            onClick={resetAnimation}
            className="px-3 py-1 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
          >
            ↺ 리셋
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={750}
        height={200}
        className="w-full bg-white rounded-lg border border-gray-200"
      />

      <div className="mt-3 text-sm text-gray-600 bg-white/50 rounded-lg p-3">
        <strong>💡 핵심:</strong> 여러 입력 신호가 세포체에서 합쳐지고, 임계값을 넘으면 축삭돌기를 통해 다음 뉴런으로 전달됩니다.
      </div>
    </div>
  );
}
