/**
 * Scene 1: 인트로
 * Level 3 소개 및 손실 함수 개요
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

  // 손실 함수 그래프 애니메이션
  const graphOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });
  const graphProgress = interpolate(frame, [120, 400], [0, 1], { extrapolateRight: "clamp" });

  // 손실 함수 곡선 (포물선 형태)
  const generateLossCurve = (progress: number) => {
    const points = [];
    const numPoints = Math.floor(progress * 100);
    for (let i = 0; i <= numPoints; i++) {
      const x = 100 + i * 4;
      const normalizedX = (i - 50) / 25;
      const y = 180 - 100 * Math.exp(-normalizedX * normalizedX);
      points.push({ x, y });
    }
    return points;
  };

  const curvePoints = generateLossCurve(graphProgress);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #4c1d1d 50%, #1e1b4b 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Audio src={staticFile("audio/lesson-3-1/scene1.mp3")} />

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
        Lesson 3-1
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
          textShadow: "0 4px 20px rgba(239,68,68,0.5)",
        }}
      >
        손실 함수
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 42,
          color: "#f87171",
          fontWeight: "bold",
          opacity: subtitleOpacity,
          marginBottom: 60,
        }}
      >
        Loss Function
      </h2>

      {/* 손실 지형 그래프 */}
      <svg
        width={600}
        height={250}
        style={{
          opacity: graphOpacity,
        }}
      >
        {/* 좌표축 */}
        <line x1={80} y1={200} x2={520} y2={200} stroke="#6b7280" strokeWidth={2} />
        <line x1={80} y1={50} x2={80} y2={200} stroke="#6b7280" strokeWidth={2} />

        {/* 축 레이블 */}
        <text x={500} y={220} fill="#9ca3af" fontSize={18}>가중치</text>
        <text x={30} y={60} fill="#9ca3af" fontSize={18}>손실</text>

        {/* 손실 곡선 */}
        {curvePoints.length > 1 && (
          <path
            d={`M ${curvePoints[0].x} ${curvePoints[0].y} ${curvePoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}`}
            stroke={colors.level[3]}
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* 최저점 마커 */}
        {graphProgress > 0.5 && (
          <>
            <circle
              cx={300}
              cy={80}
              r={8}
              fill="#22c55e"
              opacity={interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" })}
            />
            <text
              x={320}
              y={75}
              fill="#22c55e"
              fontSize={16}
              opacity={interpolate(frame, [320, 350], [0, 1], { extrapolateRight: "clamp" })}
            >
              최솟값
            </text>
          </>
        )}
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
        모델이 얼마나 틀렸는지 측정하는 함수!
      </div>
    </AbsoluteFill>
  );
};
