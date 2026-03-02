/**
 * Scene 1: 인트로
 * 미분의 기초 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, from: -50, to: 0, durationInFrames: 45 });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const badgeScale = spring({ frame: frame - 60, fps, from: 0, to: 1, durationInFrames: 30 });

  const slopeOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });

  // 접선 애니메이션
  const tangentProgress = interpolate(frame, [150, 400], [0, 1], { extrapolateRight: "clamp" });
  const touchX = 300 + tangentProgress * 0;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #3b1d5c 50%, #1e1b4b 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Audio src={staticFile("audio/lesson-2-2/scene1.mp3")} />

      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          backgroundColor: "#a855f7",
          color: colors.white,
          padding: "12px 30px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: "bold",
          transform: `scale(${Math.max(0, badgeScale)})`,
        }}
      >
        Lesson 2-2
      </div>

      {/* Level 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          backgroundColor: "#a855f7",
          color: colors.white,
          padding: "12px 30px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: "bold",
          transform: `scale(${Math.max(0, badgeScale)})`,
        }}
      >
        Level 2 · 수학 기초
      </div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: 100,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 20,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: "0 4px 20px rgba(168,85,247,0.5)",
        }}
      >
        미분의 기초
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 42,
          color: "#c084fc",
          fontWeight: "bold",
          opacity: subtitleOpacity,
          marginBottom: 60,
        }}
      >
        Differentiation Basics
      </h2>

      {/* 곡선과 접선 시각화 */}
      <svg
        width={600}
        height={300}
        style={{
          opacity: slopeOpacity,
        }}
      >
        {/* 좌표축 */}
        <line x1={50} y1={250} x2={550} y2={250} stroke="#6b7280" strokeWidth={2} />
        <line x1={100} y1={50} x2={100} y2={250} stroke="#6b7280" strokeWidth={2} />

        {/* 포물선 */}
        <path
          d="M 100 250 Q 200 50, 350 150 T 550 50"
          stroke="#a855f7"
          strokeWidth={4}
          fill="none"
        />

        {/* 접선 (애니메이션) */}
        <line
          x1={200}
          y1={180}
          x2={400}
          y2={80}
          stroke="#22c55e"
          strokeWidth={3}
          strokeDasharray={interpolate(tangentProgress, [0, 1], [200, 0])}
          opacity={interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" })}
        />

        {/* 접점 */}
        <circle
          cx={300}
          cy={130}
          r={8}
          fill="#fbbf24"
          opacity={interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" })}
        />

        {/* 기울기 표시 */}
        <text
          x={420}
          y={70}
          fill="#22c55e"
          fontSize={24}
          fontWeight="bold"
          opacity={interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" })}
        >
          기울기 = 미분값
        </text>
      </svg>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          fontSize: 36,
          color: "#fbbf24",
          fontWeight: "bold",
          opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" }),
          textAlign: "center",
        }}
      >
        미분을 이해하면 AI 학습의 비밀이 풀립니다!
      </div>
    </AbsoluteFill>
  );
};
