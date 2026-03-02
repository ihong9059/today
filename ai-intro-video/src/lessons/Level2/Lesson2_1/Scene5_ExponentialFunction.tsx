/**
 * Scene 5: 지수 함수
 * y = eˣ
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_ExponentialFunction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const formulaScale = spring({ frame: frame - 30, fps, from: 0, to: 1, durationInFrames: 30 });

  // 그래프 애니메이션
  const curveProgress = interpolate(frame, [90, 200], [0, 1], { extrapolateRight: "clamp" });

  // 설명 애니메이션
  const eOpacity = interpolate(frame, [230, 260], [0, 1], { extrapolateRight: "clamp" });
  const propertyOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const aiOpacity = interpolate(frame, [380, 410], [0, 1], { extrapolateRight: "clamp" });

  // 지수함수 경로 생성
  const generateExpPath = (progress: number) => {
    const points = [];
    const totalPoints = Math.floor(progress * 100);
    for (let i = 0; i <= totalPoints; i++) {
      const t = (i / 100) * 4 - 2; // -2 to 2
      const x = 250 + t * 80;
      const y = 300 - Math.exp(t) * 20;
      if (y < 50) continue;
      if (i === 0 || points.length === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }
    return points.join(' ');
  };

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #4c1d95 100%)`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        gap: 80,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-1/scene5.mp3")} />

      {/* 왼쪽: 그래프 */}
      <div style={{ flex: 1 }}>
        <h2
          style={{
            fontSize: 56,
            color: colors.white,
            fontWeight: "bold",
            marginBottom: 30,
            opacity: titleOpacity,
          }}
        >
          지수 함수
        </h2>

        {/* 수식 */}
        <div
          style={{
            fontSize: 72,
            color: "#fbbf24",
            fontWeight: "bold",
            marginBottom: 40,
            transform: `scale(${Math.max(0, formulaScale)})`,
            fontFamily: "monospace",
          }}
        >
          y = e<sup style={{ fontSize: 48 }}>x</sup>
        </div>

        {/* 그래프 */}
        <svg width={500} height={350}>
          {/* 그리드 */}
          {Array.from({ length: 11 }, (_, i) => (
            <g key={i}>
              <line x1={50 + i * 40} y1={50} x2={50 + i * 40} y2={320} stroke="#374151" strokeWidth={1} />
              <line x1={50} y1={50 + i * 27} x2={450} y2={50 + i * 27} stroke="#374151" strokeWidth={1} />
            </g>
          ))}

          {/* 좌표축 */}
          <line x1={50} y1={300} x2={450} y2={300} stroke="#9ca3af" strokeWidth={2} />
          <line x1={250} y1={50} x2={250} y2={320} stroke="#9ca3af" strokeWidth={2} />

          {/* y=1 기준선 */}
          <line x1={50} y1={280} x2={450} y2={280} stroke="#6b7280" strokeWidth={1} strokeDasharray="4,4" />
          <text x={55} y={275} fill="#9ca3af" fontSize={16}>1</text>

          {/* 지수함수 그래프 */}
          <path
            d={generateExpPath(curveProgress)}
            stroke="#fbbf24"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />

          {/* (0, 1) 점 표시 */}
          {frame > 150 && (
            <g opacity={interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" })}>
              <circle cx={250} cy={280} r={8} fill="#22c55e" />
              <text x={260} y={275} fill="#22c55e" fontSize={16}>(0, 1)</text>
            </g>
          )}
        </svg>
      </div>

      {/* 오른쪽: 설명 */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            padding: "25px 35px",
            backgroundColor: "rgba(251,191,36,0.2)",
            borderRadius: 15,
            border: "2px solid #fbbf24",
            marginBottom: 25,
            opacity: eOpacity,
          }}
        >
          <div style={{ color: "#fcd34d", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            자연상수 e ≈ 2.718
          </div>
          <div style={{ color: colors.white, fontSize: 22, lineHeight: 1.5 }}>
            수학에서 가장 중요한 상수 중 하나<br/>
            미분해도 자기 자신이 되는 특별한 수!
          </div>
        </div>

        <div
          style={{
            padding: "25px 35px",
            backgroundColor: "rgba(168,85,247,0.2)",
            borderRadius: 15,
            border: "2px solid #a855f7",
            marginBottom: 25,
            opacity: propertyOpacity,
          }}
        >
          <div style={{ color: "#c084fc", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            📈 지수함수 특징
          </div>
          <div style={{ color: colors.white, fontSize: 22, lineHeight: 1.5 }}>
            • 항상 양수 (0보다 큼)<br/>
            • 급격하게 증가<br/>
            • x=0일 때 y=1
          </div>
        </div>

        <div
          style={{
            padding: "25px 35px",
            backgroundColor: "rgba(59,130,246,0.2)",
            borderRadius: 15,
            border: "2px solid #3b82f6",
            opacity: aiOpacity,
          }}
        >
          <div style={{ color: "#60a5fa", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            🤖 AI: Softmax 함수
          </div>
          <div style={{ color: colors.white, fontSize: 22, lineHeight: 1.5 }}>
            확률 계산에 필수!<br/>
            <span style={{ color: "#fbbf24" }}>e^x / Σe^x = 확률로 변환</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
