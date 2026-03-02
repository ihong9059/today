/**
 * Scene 3: 기본 미분 공식
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_BasicFormulas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const formulas = [
    { func: "xⁿ", derivative: "n · xⁿ⁻¹", example: "x² → 2x", delay: 60 },
    { func: "상수 c", derivative: "0", example: "5 → 0", delay: 180 },
    { func: "ax", derivative: "a", example: "3x → 3", delay: 300 },
    { func: "eˣ", derivative: "eˣ", example: "eˣ → eˣ (특별!)", delay: 420, highlight: true },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-2/scene3.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        기본 미분 공식
      </h1>

      {/* 공식 테이블 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 25,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            display: "flex",
            gap: 20,
            padding: "20px 40px",
            backgroundColor: "#a855f7",
            borderRadius: 15,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ flex: 1, fontSize: 32, color: colors.white, fontWeight: "bold", textAlign: "center" }}>
            함수 f(x)
          </div>
          <div style={{ flex: 1, fontSize: 32, color: colors.white, fontWeight: "bold", textAlign: "center" }}>
            미분 f'(x)
          </div>
          <div style={{ flex: 1.5, fontSize: 32, color: colors.white, fontWeight: "bold", textAlign: "center" }}>
            예시
          </div>
        </div>

        {/* 공식들 */}
        {formulas.map((formula, i) => {
          const opacity = interpolate(frame, [formula.delay, formula.delay + 30], [0, 1], { extrapolateRight: "clamp" });
          const scale = spring({ frame: frame - formula.delay, fps, from: 0.8, to: 1, durationInFrames: 30 });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 20,
                padding: "25px 40px",
                backgroundColor: formula.highlight ? "#22c55e20" : colors.gray[800],
                border: formula.highlight ? "3px solid #22c55e" : "none",
                borderRadius: 15,
                opacity,
                transform: `scale(${Math.max(0.8, scale)})`,
              }}
            >
              <div style={{ flex: 1, fontSize: 40, color: "#a855f7", fontWeight: "bold", textAlign: "center", fontFamily: "monospace" }}>
                {formula.func}
              </div>
              <div style={{ fontSize: 40, color: "#6b7280", display: "flex", alignItems: "center" }}>→</div>
              <div style={{ flex: 1, fontSize: 40, color: "#22c55e", fontWeight: "bold", textAlign: "center", fontFamily: "monospace" }}>
                {formula.derivative}
              </div>
              <div style={{ fontSize: 40, color: "#6b7280", display: "flex", alignItems: "center" }}>|</div>
              <div style={{ flex: 1.5, fontSize: 32, color: "#9ca3af", textAlign: "center" }}>
                {formula.example}
              </div>
            </div>
          );
        })}
      </div>

      {/* 지수함수 강조 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 50px",
            backgroundColor: "#22c55e20",
            border: "2px solid #22c55e",
            borderRadius: 15,
          }}
        >
          <span style={{ fontSize: 32, color: "#22c55e", fontWeight: "bold" }}>
            💡 eˣ는 미분해도 그대로! → AI에서 자주 사용되는 이유
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
