/**
 * Scene 4: 2차 함수
 * y = ax² + bx + c
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_QuadraticFunction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const formulaScale = spring({ frame: frame - 30, fps, from: 0, to: 1, durationInFrames: 30 });

  // 포물선 그리기 애니메이션
  const curveProgress = interpolate(frame, [90, 200], [0, 1], { extrapolateRight: "clamp" });

  // 최솟값 표시
  const minOpacity = interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" });
  const lossOpacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });

  // 포물선 경로 생성
  const generateParabolaPath = (progress: number) => {
    const points = [];
    const totalPoints = Math.floor(progress * 100);
    for (let i = 0; i <= totalPoints; i++) {
      const t = (i / 100) * 2 - 1; // -1 to 1
      const x = 300 + t * 180;
      const y = 280 - (1 - t * t) * 180; // 뒤집힌 포물선
      if (i === 0) {
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
        background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        gap: 80,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-1/scene4.mp3")} />

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
          2차 함수
        </h2>

        {/* 수식 */}
        <div
          style={{
            fontSize: 56,
            color: "#c084fc",
            fontWeight: "bold",
            marginBottom: 40,
            transform: `scale(${Math.max(0, formulaScale)})`,
            fontFamily: "monospace",
          }}
        >
          y = ax² + bx + c
        </div>

        {/* 그래프 */}
        <svg width={600} height={400}>
          {/* 그리드 */}
          {Array.from({ length: 13 }, (_, i) => (
            <g key={i}>
              <line x1={60 + i * 40} y1={40} x2={60 + i * 40} y2={360} stroke="#374151" strokeWidth={1} />
              <line x1={60} y1={40 + i * 26} x2={540} y2={40 + i * 26} stroke="#374151" strokeWidth={1} />
            </g>
          ))}

          {/* 좌표축 */}
          <line x1={60} y1={280} x2={540} y2={280} stroke="#9ca3af" strokeWidth={2} />
          <line x1={300} y1={40} x2={300} y2={360} stroke="#9ca3af" strokeWidth={2} />

          {/* 축 레이블 */}
          <text x={530} y={300} fill="#9ca3af" fontSize={20}>x</text>
          <text x={310} y={55} fill="#9ca3af" fontSize={20}>y</text>

          {/* 포물선 */}
          <path
            d={generateParabolaPath(curveProgress)}
            stroke="#a855f7"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />

          {/* 최솟값 점 */}
          {frame > 250 && (
            <g opacity={minOpacity}>
              <circle cx={300} cy={100} r={10} fill="#22c55e" />
              <text x={320} y={95} fill="#22c55e" fontSize={20} fontWeight="bold">최솟값</text>

              {/* 수직선 */}
              <line x1={300} y1={100} x2={300} y2={280} stroke="#22c55e" strokeWidth={2} strokeDasharray="8,4" />
            </g>
          )}
        </svg>
      </div>

      {/* 오른쪽: 설명 */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            padding: "25px 35px",
            backgroundColor: "rgba(168,85,247,0.2)",
            borderRadius: 15,
            border: "2px solid #a855f7",
            marginBottom: 30,
            opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ color: "#c084fc", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            포물선 특징
          </div>
          <div style={{ color: colors.white, fontSize: 24, lineHeight: 1.6 }}>
            • U자 또는 ∩자 모양<br/>
            • 꼭짓점에서 최솟값/최댓값
          </div>
        </div>

        <div
          style={{
            padding: "25px 35px",
            backgroundColor: "rgba(34,197,94,0.2)",
            borderRadius: 15,
            border: "2px solid #22c55e",
            marginBottom: 30,
            opacity: minOpacity,
          }}
        >
          <div style={{ color: "#4ade80", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            💡 핵심 포인트
          </div>
          <div style={{ color: colors.white, fontSize: 24, lineHeight: 1.6 }}>
            최솟값 또는 최댓값이 존재!<br/>
            이 점을 찾는 것이 중요
          </div>
        </div>

        <div
          style={{
            padding: "30px 35px",
            backgroundColor: "rgba(239,68,68,0.2)",
            borderRadius: 15,
            border: "2px solid #ef4444",
            opacity: lossOpacity,
          }}
        >
          <div style={{ color: "#f87171", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            🤖 AI: 손실 함수
          </div>
          <div style={{ color: colors.white, fontSize: 24, lineHeight: 1.6 }}>
            MSE = Σ(예측 - 실제)²<br/>
            <span style={{ color: "#fbbf24" }}>→ 최솟값을 찾아야 학습 완료!</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
