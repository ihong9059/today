/**
 * Scene 1: 인트로
 * 함수와 그래프 소개
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

  const graphOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });

  // 함수 그래프 애니메이션
  const graphProgress = interpolate(frame, [120, 300], [0, 1], { extrapolateRight: "clamp" });

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
      <Audio src={staticFile("audio/lesson-2-1/scene1.mp3")} />

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
        Lesson 2-1
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
        함수와 그래프
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
        Functions & Graphs
      </h2>

      {/* 그래프 시각화 */}
      <svg
        width={600}
        height={300}
        style={{
          opacity: graphOpacity,
        }}
      >
        {/* 좌표축 */}
        <line x1={50} y1={250} x2={550} y2={250} stroke="#6b7280" strokeWidth={2} />
        <line x1={300} y1={50} x2={300} y2={250} stroke="#6b7280" strokeWidth={2} />

        {/* x축 레이블 */}
        <text x={540} y={270} fill="#9ca3af" fontSize={20}>x</text>
        <text x={310} y={70} fill="#9ca3af" fontSize={20}>y</text>

        {/* 함수 그래프 (시그모이드 형태) */}
        <path
          d={`M ${50} ${230} ${Array.from({ length: Math.floor(graphProgress * 100) }, (_, i) => {
            const x = 50 + i * 5;
            const normalizedX = (i - 50) / 15;
            const y = 150 - 80 / (1 + Math.exp(-normalizedX));
            return `L ${x} ${y}`;
          }).join(' ')}`}
          stroke="#a855f7"
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          fontSize: 36,
          color: "#fbbf24",
          fontWeight: "bold",
          opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" }),
          textAlign: "center",
        }}
      >
        AI의 모든 계산은 함수로 표현됩니다!
      </div>
    </AbsoluteFill>
  );
};
