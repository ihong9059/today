/**
 * Scene 7: ReLU 함수
 * f(x) = max(0, x)
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_ReLUFunction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const formulaScale = spring({ frame: frame - 30, fps, from: 0, to: 1, durationInFrames: 30 });

  // 그래프 애니메이션
  const leftLineProgress = interpolate(frame, [90, 140], [0, 1], { extrapolateRight: "clamp" });
  const rightLineProgress = interpolate(frame, [140, 200], [0, 1], { extrapolateRight: "clamp" });

  // 설명 애니메이션
  const simpleOpacity = interpolate(frame, [230, 260], [0, 1], { extrapolateRight: "clamp" });
  const advantageOpacity = interpolate(frame, [310, 340], [0, 1], { extrapolateRight: "clamp" });
  const aiOpacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1e3a5f 0%, #1e1b4b 50%, #312e81 100%)`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        gap: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-1/scene7.mp3")} />

      {/* 왼쪽: 그래프 */}
      <div style={{ flex: 1 }}>
        <h2
          style={{
            fontSize: 56,
            color: colors.white,
            fontWeight: "bold",
            marginBottom: 20,
            opacity: titleOpacity,
          }}
        >
          ReLU 함수
        </h2>

        {/* 수식 */}
        <div
          style={{
            fontSize: 48,
            color: "#f97316",
            fontWeight: "bold",
            marginBottom: 30,
            transform: `scale(${Math.max(0, formulaScale)})`,
            fontFamily: "monospace",
          }}
        >
          f(x) = max(0, x)
        </div>

        {/* 그래프 */}
        <svg width={500} height={380}>
          {/* 그리드 */}
          {Array.from({ length: 11 }, (_, i) => (
            <g key={i}>
              <line x1={50 + i * 40} y1={50} x2={50 + i * 40} y2={330} stroke="#374151" strokeWidth={1} />
              <line x1={50} y1={50 + i * 28} x2={450} y2={50 + i * 28} stroke="#374151" strokeWidth={1} />
            </g>
          ))}

          {/* 좌표축 */}
          <line x1={50} y1={190} x2={450} y2={190} stroke="#9ca3af" strokeWidth={2} />
          <line x1={250} y1={50} x2={250} y2={330} stroke="#9ca3af" strokeWidth={2} />

          {/* 축 레이블 */}
          <text x={440} y={210} fill="#9ca3af" fontSize={20}>x</text>
          <text x={260} y={65} fill="#9ca3af" fontSize={20}>y</text>

          {/* ReLU 함수 그래프 - 왼쪽 (y=0) */}
          <line
            x1={250 - leftLineProgress * 200}
            y1={190}
            x2={250}
            y2={190}
            stroke="#f97316"
            strokeWidth={4}
            strokeLinecap="round"
          />

          {/* ReLU 함수 그래프 - 오른쪽 (y=x) */}
          <line
            x1={250}
            y1={190}
            x2={250 + rightLineProgress * 150}
            y2={190 - rightLineProgress * 120}
            stroke="#f97316"
            strokeWidth={4}
            strokeLinecap="round"
          />

          {/* 원점 표시 */}
          {frame > 180 && (
            <g opacity={interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" })}>
              <circle cx={250} cy={190} r={10} fill="#22c55e" />
              <text x={265} y={185} fill="#22c55e" fontSize={18}>(0, 0)</text>
            </g>
          )}

          {/* x<0 영역 표시 */}
          {frame > 140 && (
            <g opacity={interpolate(frame, [140, 170], [0, 1], { extrapolateRight: "clamp" })}>
              <rect x={50} y={50} width={200} height={280} fill="rgba(239,68,68,0.1)" />
              <text x={120} y={280} fill="#ef4444" fontSize={20}>x &lt; 0 → y = 0</text>
            </g>
          )}

          {/* x>0 영역 표시 */}
          {frame > 180 && (
            <g opacity={interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" })}>
              <rect x={250} y={50} width={200} height={280} fill="rgba(34,197,94,0.1)" />
              <text x={310} y={280} fill="#22c55e" fontSize={20}>x &gt; 0 → y = x</text>
            </g>
          )}
        </svg>
      </div>

      {/* 오른쪽: 설명 */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            padding: "25px 30px",
            backgroundColor: "rgba(249,115,22,0.2)",
            borderRadius: 15,
            border: "2px solid #f97316",
            marginBottom: 25,
            opacity: simpleOpacity,
          }}
        >
          <div style={{ color: "#fb923c", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            🎯 매우 단순한 규칙
          </div>
          <div style={{ color: colors.white, fontSize: 24, lineHeight: 1.6 }}>
            • 음수면 → <span style={{ color: "#ef4444" }}>0</span><br/>
            • 양수면 → <span style={{ color: "#22c55e" }}>그대로</span>
          </div>
        </div>

        <div
          style={{
            padding: "25px 30px",
            backgroundColor: "rgba(34,197,94,0.2)",
            borderRadius: 15,
            border: "2px solid #22c55e",
            marginBottom: 25,
            opacity: advantageOpacity,
          }}
        >
          <div style={{ color: "#4ade80", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            ⚡ 장점
          </div>
          <div style={{ color: colors.white, fontSize: 24, lineHeight: 1.6 }}>
            • 계산이 빠르다!<br/>
            • 기울기 소실 문제 완화<br/>
            • 희소 활성화 (sparsity)
          </div>
        </div>

        <div
          style={{
            padding: "25px 30px",
            backgroundColor: "rgba(168,85,247,0.2)",
            borderRadius: 15,
            border: "2px solid #a855f7",
            opacity: aiOpacity,
          }}
        >
          <div style={{ color: "#c084fc", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            🤖 AI: 현대 딥러닝의 표준
          </div>
          <div style={{ color: colors.white, fontSize: 24, lineHeight: 1.6 }}>
            CNN, Transformer 등<br/>
            <span style={{ color: "#fbbf24" }}>대부분의 모델이 ReLU 사용!</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
