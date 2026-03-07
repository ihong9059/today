'use client';

import { useEffect, useRef, useState } from 'react';

interface MLPChartProps {
  variant?: 'basic' | 'xor';
}

export default function MLPChart({ variant = 'basic' }: MLPChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inputs, setInputs] = useState([1, 0]);
  const [animated, setAnimated] = useState(false);
  const animationRef = useRef<number>(0);
  const progressRef = useRef<number>(0);

  // Simple simulation of XOR with hidden layer
  const computeXOR = (x1: number, x2: number) => {
    // Hidden layer
    const nand = x1 === 1 && x2 === 1 ? 0 : 1; // NAND gate
    const or = x1 === 1 || x2 === 1 ? 1 : 0; // OR gate
    // Output layer
    const xor = nand === 1 && or === 1 ? 1 : 0; // AND gate
    return { nand, or, xor };
  };

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

    const { nand, or, xor } = computeXOR(inputs[0], inputs[1]);

    // Layout
    const inputX = 100;
    const hiddenX = 350;
    const outputX = 600;
    const centerY = height / 2;

    // Layer labels
    ctx.fillStyle = '#6B7280';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('입력층', inputX, 25);
    ctx.fillText('은닉층', hiddenX, 25);
    ctx.fillText('출력층', outputX, 25);

    // Draw input nodes
    const inputLabels = ['x₁', 'x₂'];
    const inputY = [centerY - 50, centerY + 50];

    inputs.forEach((input, i) => {
      const y = inputY[i];

      ctx.fillStyle = input === 1 ? '#3B82F6' : '#9CA3AF';
      ctx.beginPath();
      ctx.arc(inputX, y, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(inputLabels[i], inputX, y + 5);

      ctx.fillStyle = '#374151';
      ctx.font = '11px sans-serif';
      ctx.fillText(`= ${input}`, inputX, y + 40);
    });

    // Draw connections to hidden layer
    if (progress > 0.1) {
      const connProgress = Math.min(1, (progress - 0.1) * 2);
      ctx.globalAlpha = connProgress;

      const hiddenY = [centerY - 50, centerY + 50];

      // Draw lines from inputs to hidden nodes
      inputY.forEach((iy) => {
        hiddenY.forEach((hy) => {
          ctx.strokeStyle = '#CBD5E1';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(inputX + 25, iy);
          ctx.lineTo(hiddenX - 30, hy);
          ctx.stroke();
        });
      });

      ctx.globalAlpha = 1;
    }

    // Draw hidden layer nodes
    if (progress > 0.3) {
      const hiddenProgress = Math.min(1, (progress - 0.3) * 2);
      ctx.globalAlpha = hiddenProgress;

      // NAND node
      const nandY = centerY - 50;
      ctx.fillStyle = nand === 1 ? '#10B981' : '#9CA3AF';
      ctx.beginPath();
      ctx.arc(hiddenX, nandY, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('NAND', hiddenX, nandY + 5);

      ctx.fillStyle = '#374151';
      ctx.font = '11px sans-serif';
      ctx.fillText(`= ${nand}`, hiddenX, nandY + 45);

      // OR node
      const orY = centerY + 50;
      ctx.fillStyle = or === 1 ? '#10B981' : '#9CA3AF';
      ctx.beginPath();
      ctx.arc(hiddenX, orY, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('OR', hiddenX, orY + 5);

      ctx.fillStyle = '#374151';
      ctx.font = '11px sans-serif';
      ctx.fillText(`= ${or}`, hiddenX, orY + 45);

      ctx.globalAlpha = 1;
    }

    // Draw connections to output
    if (progress > 0.5) {
      const connProgress = Math.min(1, (progress - 0.5) * 2);
      ctx.globalAlpha = connProgress;

      const hiddenY = [centerY - 50, centerY + 50];

      hiddenY.forEach((hy) => {
        ctx.strokeStyle = '#CBD5E1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(hiddenX + 30, hy);
        ctx.lineTo(outputX - 30, centerY);
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
    }

    // Draw output node
    if (progress > 0.7) {
      const outputProgress = Math.min(1, (progress - 0.7) * 3);
      ctx.globalAlpha = outputProgress;

      ctx.fillStyle = xor === 1 ? '#8B5CF6' : '#9CA3AF';
      ctx.beginPath();
      ctx.arc(outputX, centerY, 35, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('AND', outputX, centerY - 5);
      ctx.font = '11px sans-serif';
      ctx.fillText('(XOR)', outputX, centerY + 12);

      ctx.fillStyle = '#374151';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(`= ${xor}`, outputX, centerY + 55);

      ctx.globalAlpha = 1;
    }

    // Formula explanation
    if (progress >= 1) {
      ctx.fillStyle = '#6B7280';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`XOR(${inputs[0]}, ${inputs[1]}) = AND(NAND(${inputs[0]},${inputs[1]}), OR(${inputs[0]},${inputs[1]}))`, 80, height - 20);
      ctx.fillText(`= AND(${nand}, ${or}) = ${xor}`, 310, height - 20);
    }
  };

  const animate = () => {
    progressRef.current += 0.03;
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

  useEffect(() => {
    draw(1);
    return () => cancelAnimationFrame(animationRef.current);
  }, [inputs]);

  const toggleInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = newInputs[index] === 1 ? 0 : 1;
    setInputs(newInputs);
    progressRef.current = 1;
  };

  return (
    <div className="my-6 bg-gradient-to-br from-green-50 to-purple-50 rounded-xl p-6 border border-green-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-800 flex items-center">
          <span className="mr-2">🔗</span>
          다층 퍼셉트론 (MLP) - XOR 해결
        </h4>
        <button
          onClick={startAnimation}
          className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
        >
          ▶ 애니메이션
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={700}
        height={250}
        className="w-full bg-white rounded-lg border border-gray-200"
      />

      <div className="mt-4 flex flex-wrap gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h5 className="font-semibold text-gray-700 mb-2">입력값 변경</h5>
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

        <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200">
          <h5 className="font-semibold text-gray-700 mb-2">해결 원리</h5>
          <p className="text-sm text-gray-600">
            <strong>은닉층</strong>을 추가하여 XOR 문제를 해결합니다:
            <br />
            • NAND: 둘 다 1일 때만 0 출력
            <br />
            • OR: 하나라도 1이면 1 출력
            <br />
            • AND: 둘 다 1일 때만 1 출력 → XOR 완성!
          </p>
        </div>
      </div>
    </div>
  );
}
