/**
 * Scene 1: 인트로
 * 경사하강법 소개
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

  const messageOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  // 경사 애니메이션
  const ballProgress = interpolate(frame, [120, 400], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Audio src={staticFile("audio/lesson-3-2/scene1.mp3")} />

      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          backgroundColor: colors.level[3],
          color: colors.white,
          padding: "12px 30px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: "bold",
          transform: `scale(${Math.max(0, badgeScale)})`,
        }}
      >
        Lesson 3-2
      </div>

      {/* Level 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          backgroundColor: colors.level[3],
          color: colors.white,
          padding: "12px 30px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: "bold",
          transform: `scale(${Math.max(0, badgeScale)})`,
        }}
      >
        Level 3 · 딥러닝 핵심 🔥
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
          textShadow: "0 4px 20px rgba(59,130,246,0.5)",
        }}
      >
        경사하강법
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 42,
          color: "#60a5fa",
          fontWeight: "bold",
          opacity: subtitleOpacity,
          marginBottom: 60,
        }}
      >
        Gradient Descent
      </h2>

      {/* 산 내려가기 애니메이션 */}
      <svg
        width={700}
        height={250}
        style={{
          opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {/* 산 모양 */}
        <path
          d="M 50 220 Q 200 50 350 180 Q 500 50 650 220"
          stroke="#4b5563"
          strokeWidth={4}
          fill="none"
        />

        {/* 공 위치 계산 */}
        {(() => {
          const t = ballProgress;
          // 첫 번째 골짜기로 이동
          const x = 50 + t * 300;
          const y = 220 - 170 * Math.sin(t * Math.PI) * (1 - t * 0.3);
          return (
            <circle
              cx={x}
              cy={Math.min(y, 180)}
              r={15}
              fill="#60a5fa"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
            />
          );
        })()}

        {/* 최저점 표시 */}
        <circle cx={350} cy={180} r={8} fill="#22c55e" opacity={0.5} />
        <text x={350} y={210} fill="#22c55e" fontSize={14} textAnchor="middle">
          최솟값
        </text>
      </svg>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          fontSize: 38,
          color: "#fbbf24",
          fontWeight: "bold",
          opacity: messageOpacity,
          textAlign: "center",
        }}
      >
        손실 지형에서 가장 낮은 곳을 찾아가는 알고리즘!
      </div>
    </AbsoluteFill>
  );
};
