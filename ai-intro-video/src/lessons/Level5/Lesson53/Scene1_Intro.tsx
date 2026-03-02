/**
 * Scene 1: 인트로 - 풀링과 정규화 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 30], [30, 0], { extrapolateRight: "clamp" });

  const poolingScale = spring({ frame: frame - 60, fps, from: 0, to: 1, durationInFrames: 30 });
  const normScale = spring({ frame: frame - 120, fps, from: 0, to: 1, durationInFrames: 30 });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #059669 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-3/scene1.mp3")} />

      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: "#10b981",
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 25,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Lesson 5-3
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
          textShadow: "0 4px 20px rgba(16,185,129,0.5)",
        }}
      >
        풀링과 정규화
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 36,
          color: "#6ee7b7",
          fontWeight: "bold",
          marginBottom: 50,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Pooling & Normalization
      </h2>

      {/* 두 가지 핵심 개념 */}
      <div style={{ display: "flex", gap: 60 }}>
        {/* 풀링 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 30,
            borderRadius: 20,
            border: "3px solid #3b82f6",
            transform: `scale(${Math.max(0, poolingScale)})`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 50, marginBottom: 15 }}>🏊</div>
          <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>풀링</div>
          <div style={{ fontSize: 18, color: colors.gray[400] }}>크기 축소<br />다운샘플링</div>
        </div>

        {/* 정규화 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 30,
            borderRadius: 20,
            border: "3px solid #f59e0b",
            transform: `scale(${Math.max(0, normScale)})`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 50, marginBottom: 15 }}>📊</div>
          <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>정규화</div>
          <div style={{ fontSize: 18, color: colors.gray[400] }}>학습 안정화<br />과적합 방지</div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          fontSize: 28,
          color: colors.gray[300],
          opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        CNN의 필수 구성 요소를 배워봅시다!
      </div>
    </AbsoluteFill>
  );
};
