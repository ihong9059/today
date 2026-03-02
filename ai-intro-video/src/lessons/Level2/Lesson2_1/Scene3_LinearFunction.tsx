/**
 * Scene 3: 1차 함수 (선형 함수)
 * y = ax + b
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_LinearFunction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const formulaScale = spring({ frame: frame - 30, fps, from: 0, to: 1, durationInFrames: 30 });

  // 그래프 그리기 애니메이션
  const lineProgress = interpolate(frame, [90, 180], [0, 1], { extrapolateRight: "clamp" });

  // 설명 애니메이션
  const slopeOpacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });
  const interceptOpacity = interpolate(frame, [260, 290], [0, 1], { extrapolateRight: "clamp" });
  const aiOpacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1e3a5f 0%, #1e1b4b 100%)`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        gap: 80,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-1/scene3.mp3")} />

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
          1차 함수 (선형 함수)
        </h2>

        {/* 수식 */}
        <div
          style={{
            fontSize: 64,
            color: "#60a5fa",
            fontWeight: "bold",
            marginBottom: 40,
            transform: `scale(${Math.max(0, formulaScale)})`,
            fontFamily: "monospace",
          }}
        >
          y = <span style={{ color: "#f59e0b" }}>a</span>x + <span style={{ color: "#22c55e" }}>b</span>
        </div>

        {/* 그래프 */}
        <svg width={500} height={350}>
          {/* 그리드 */}
          {Array.from({ length: 11 }, (_, i) => (
            <g key={i}>
              <line x1={50 + i * 40} y1={50} x2={50 + i * 40} y2={300} stroke="#374151" strokeWidth={1} />
              <line x1={50} y1={50 + i * 25} x2={450} y2={50 + i * 25} stroke="#374151" strokeWidth={1} />
            </g>
          ))}

          {/* 좌표축 */}
          <line x1={50} y1={175} x2={450} y2={175} stroke="#9ca3af" strokeWidth={2} />
          <line x1={250} y1={50} x2={250} y2={300} stroke="#9ca3af" strokeWidth={2} />

          {/* 축 레이블 */}
          <text x={440} y={195} fill="#9ca3af" fontSize={20}>x</text>
          <text x={260} y={65} fill="#9ca3af" fontSize={20}>y</text>

          {/* 1차 함수 그래프 (y = 0.5x + 1) */}
          <line
            x1={50}
            y1={225}
            x2={50 + lineProgress * 400}
            y2={225 - lineProgress * 100}
            stroke="#3b82f6"
            strokeWidth={4}
            strokeLinecap="round"
          />

          {/* 기울기 표시 */}
          {frame > 200 && (
            <g opacity={slopeOpacity}>
              <line x1={250} y1={175} x2={330} y2={175} stroke="#f59e0b" strokeWidth={3} strokeDasharray="5,5" />
              <line x1={330} y1={175} x2={330} y2={155} stroke="#f59e0b" strokeWidth={3} strokeDasharray="5,5" />
              <text x={280} y={195} fill="#f59e0b" fontSize={18}>Δx</text>
              <text x={340} y={170} fill="#f59e0b" fontSize={18}>Δy</text>
            </g>
          )}

          {/* y절편 표시 */}
          {frame > 260 && (
            <g opacity={interceptOpacity}>
              <circle cx={250} cy={150} r={8} fill="#22c55e" />
              <text x={260} y={145} fill="#22c55e" fontSize={18}>b (절편)</text>
            </g>
          )}
        </svg>
      </div>

      {/* 오른쪽: 설명 */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            padding: "25px 35px",
            backgroundColor: "rgba(245,158,11,0.2)",
            borderRadius: 15,
            border: "2px solid #f59e0b",
            marginBottom: 25,
            opacity: slopeOpacity,
          }}
        >
          <div style={{ color: "#fbbf24", fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
            a = 기울기 (slope)
          </div>
          <div style={{ color: colors.white, fontSize: 22 }}>
            x가 1 증가할 때 y가 얼마나 변하는가
          </div>
        </div>

        <div
          style={{
            padding: "25px 35px",
            backgroundColor: "rgba(34,197,94,0.2)",
            borderRadius: 15,
            border: "2px solid #22c55e",
            marginBottom: 25,
            opacity: interceptOpacity,
          }}
        >
          <div style={{ color: "#4ade80", fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
            b = y절편 (intercept)
          </div>
          <div style={{ color: colors.white, fontSize: 22 }}>
            x가 0일 때 y의 값 (시작점)
          </div>
        </div>

        <div
          style={{
            padding: "25px 35px",
            backgroundColor: "rgba(168,85,247,0.2)",
            borderRadius: 15,
            border: "2px solid #a855f7",
            opacity: aiOpacity,
          }}
        >
          <div style={{ color: "#c084fc", fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
            🤖 AI에서 활용
          </div>
          <div style={{ color: colors.white, fontSize: 22 }}>
            뉴런의 기본 연산: y = wx + b<br/>
            w는 가중치, b는 편향!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
