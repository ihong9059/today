/**
 * Scene 1: 인트로 - 합성곱 연산 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 30], [30, 0], { extrapolateRight: "clamp" });

  // 커널 애니메이션
  const kernelScale = spring({ frame: frame - 60, fps, from: 0, to: 1, durationInFrames: 30 });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c3aed 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-2/scene1.mp3")} />

      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: "#8b5cf6",
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 25,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Lesson 5-2
      </div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: 80,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 30,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: "0 4px 20px rgba(139,92,246,0.5)",
        }}
      >
        합성곱 연산
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 36,
          color: "#c4b5fd",
          fontWeight: "bold",
          marginBottom: 50,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Convolution - CNN의 핵심 연산
      </h2>

      {/* 커널 시각화 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          transform: `scale(${Math.max(0, kernelScale)})`,
        }}
      >
        {/* 이미지 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 20,
            borderRadius: 16,
            border: "3px solid #8b5cf6",
          }}
        >
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10, textAlign: "center" }}>이미지</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 40px)", gap: 4 }}>
            {Array(25).fill(0).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: i % 3 === 0 ? "#4ade80" : colors.gray[700],
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  color: colors.white,
                }}
              >
                {Math.floor(Math.random() * 255)}
              </div>
            ))}
          </div>
        </div>

        {/* 연산 기호 */}
        <div style={{ fontSize: 60, color: colors.white }}>*</div>

        {/* 커널 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 20,
            borderRadius: 16,
            border: "3px solid #f59e0b",
          }}
        >
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10, textAlign: "center" }}>커널 (3×3)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 40px)", gap: 4 }}>
            {[-1, 0, 1, -2, 0, 2, -1, 0, 1].map((v, i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: v < 0 ? "#ef4444" : v > 0 ? "#22c55e" : colors.gray[600],
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                {v}
              </div>
            ))}
          </div>
        </div>

        {/* 등호 */}
        <div style={{ fontSize: 60, color: colors.white }}>=</div>

        {/* 특징 맵 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 20,
            borderRadius: 16,
            border: "3px solid #22c55e",
          }}
        >
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10, textAlign: "center" }}>특징 맵</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 40px)", gap: 4 }}>
            {Array(9).fill(0).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#22c55e",
                  borderRadius: 4,
                  opacity: 0.3 + (i * 0.08),
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          fontSize: 28,
          color: colors.gray[300],
          opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        이미지에서 특징을 추출하는 마법 같은 연산
      </div>
    </AbsoluteFill>
  );
};
