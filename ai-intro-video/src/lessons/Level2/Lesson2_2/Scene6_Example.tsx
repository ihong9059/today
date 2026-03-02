/**
 * Scene 6: AI 학습 예시
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Example: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // w 값의 변화 (5 → 4 → 3.2 → 2.56 → ... → 0)
  const learningSteps = [
    { w: 5, gradient: 10, newW: 4 },
    { w: 4, gradient: 8, newW: 3.2 },
    { w: 3.2, gradient: 6.4, newW: 2.56 },
    { w: 2.56, gradient: 5.12, newW: 2.048 },
  ];

  // 그래프 상의 점 위치
  const stepIndex = Math.min(3, Math.floor(interpolate(frame, [200, 700], [0, 4], { extrapolateRight: "clamp" })));
  const currentW = learningSteps[stepIndex]?.newW || 0;
  const pointX = 400 + currentW * 60;
  const pointY = 250 - currentW * currentW * 8;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-2/scene6.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 30,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        실제 학습 과정 예시
      </h1>

      <div style={{ display: "flex", gap: 60 }}>
        {/* 왼쪽: 손실 함수 그래프 */}
        <div
          style={{
            flex: 1,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 30,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h2 style={{ fontSize: 32, color: "#a855f7", marginBottom: 20, textAlign: "center" }}>
            손실 함수: L(w) = w²
          </h2>

          <svg width={600} height={320}>
            {/* 좌표축 */}
            <line x1={100} y1={280} x2={550} y2={280} stroke="#6b7280" strokeWidth={2} />
            <line x1={325} y1={50} x2={325} y2={280} stroke="#6b7280" strokeWidth={2} />
            <text x={540} y={300} fill="#9ca3af" fontSize={20}>w</text>
            <text x={340} y={70} fill="#9ca3af" fontSize={20}>L</text>

            {/* 포물선 */}
            <path
              d={`M 100 ${280 - 0.3 * Math.pow(-5, 2) * 8} ${Array.from({ length: 100 }, (_, i) => {
                const w = -5 + i * 0.1;
                const y = 280 - Math.pow(w, 2) * 8;
                const x = 325 + w * 45;
                return `L ${x} ${Math.max(50, y)}`;
              }).join(' ')}`}
              stroke="#a855f7"
              strokeWidth={4}
              fill="none"
            />

            {/* 현재 점 */}
            <circle
              cx={325 + currentW * 45}
              cy={Math.max(80, 280 - Math.pow(currentW, 2) * 8)}
              r={15}
              fill="#ef4444"
              opacity={interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" })}
            />

            {/* 최솟값 표시 */}
            <circle cx={325} cy={280} r={10} fill="#22c55e" />
            <text x={335} y={275} fill="#22c55e" fontSize={18}>w=0 (최솟값)</text>

            {/* 현재 w 값 표시 */}
            <text
              x={325 + currentW * 45}
              y={Math.max(60, 280 - Math.pow(currentW, 2) * 8) - 25}
              fill="#fbbf24"
              fontSize={20}
              textAnchor="middle"
              opacity={interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" })}
            >
              w = {currentW.toFixed(2)}
            </text>
          </svg>
        </div>

        {/* 오른쪽: 계산 과정 */}
        <div
          style={{
            flex: 0.9,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              borderRadius: 15,
              padding: 20,
              opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 24, color: "#22c55e", fontWeight: "bold" }}>설정</div>
            <div style={{ fontSize: 22, color: colors.white, marginTop: 10, fontFamily: "monospace" }}>
              L(w) = w² → 미분: L'(w) = <span style={{ color: "#fbbf24" }}>2w</span>
            </div>
            <div style={{ fontSize: 22, color: colors.white, fontFamily: "monospace" }}>
              학습률 η = 0.1
            </div>
          </div>

          {/* 학습 단계들 */}
          {learningSteps.map((step, i) => {
            const delay = 200 + i * 150;
            const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
            const isActive = i === stepIndex;

            return (
              <div
                key={i}
                style={{
                  backgroundColor: isActive ? "#a855f720" : colors.gray[800],
                  border: isActive ? "2px solid #a855f7" : "none",
                  borderRadius: 15,
                  padding: "15px 20px",
                  opacity,
                }}
              >
                <div style={{ fontSize: 20, color: "#9ca3af", marginBottom: 8 }}>Step {i + 1}</div>
                <div style={{ fontSize: 22, color: colors.white, fontFamily: "monospace" }}>
                  w = {step.w} - 0.1 × {step.gradient} = <span style={{ color: "#22c55e" }}>{step.newW}</span>
                </div>
              </div>
            );
          })}

          {/* 수렴 메시지 */}
          <div
            style={{
              backgroundColor: "#fbbf2420",
              border: "2px solid #fbbf24",
              borderRadius: 15,
              padding: 20,
              opacity: interpolate(frame, [800, 830], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 26, color: "#fbbf24", fontWeight: "bold", textAlign: "center" }}>
              🎯 w → 0으로 수렴! (최솟값 도달)
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
