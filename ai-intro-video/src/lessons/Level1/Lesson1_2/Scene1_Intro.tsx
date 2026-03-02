/**
 * Lesson 1-2 Scene 1: 인트로
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

  const keyPoints = [
    "뇌 = 860억 개의 뉴런",
    "뉴런 → 인공 뉴런으로",
    "AI의 근본적 영감",
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a365d 50%, #2d3748 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Level & Lesson 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          display: "flex",
          gap: 15,
        }}
      >
        <div
          style={{
            backgroundColor: "#22c55e",
            color: colors.white,
            padding: "10px 25px",
            borderRadius: 25,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          Level 1
        </div>
        <div
          style={{
            backgroundColor: colors.primary[500],
            color: colors.white,
            padding: "10px 25px",
            borderRadius: 25,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          Lesson 1-2
        </div>
      </div>

      {/* 메인 아이콘 */}
      <div
        style={{
          fontSize: 120,
          marginBottom: 30,
          transform: `scale(${titleSpring})`,
        }}
      >
        🧠
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [50, 0])}px)`,
          opacity: titleSpring,
        }}
      >
        뉴런에서 퍼셉트론으로
      </h1>

      {/* 부제목 */}
      <p
        style={{
          fontSize: 36,
          color: colors.primary[300],
          textAlign: "center",
          marginBottom: 50,
          opacity: subtitleOpacity,
        }}
      >
        뇌의 작동 원리를 수학으로!
      </p>

      {/* 핵심 포인트 */}
      <div style={{ display: "flex", gap: 30 }}>
        {keyPoints.map((point, i) => {
          const pointOpacity = interpolate(
            frame,
            [40 + i * 15, 60 + i * 15],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                backgroundColor: `${colors.primary[500]}30`,
                border: `2px solid ${colors.primary[400]}`,
                borderRadius: 15,
                padding: "20px 35px",
                opacity: pointOpacity,
                transform: `translateY(${interpolate(pointOpacity, [0, 1], [20, 0])}px)`,
              }}
            >
              <span style={{ fontSize: 24, color: colors.white, fontWeight: "500" }}>
                {point}
              </span>
            </div>
          );
        })}
      </div>

      {/* 뇌 & 컴퓨터 아이콘 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          display: "flex",
          gap: 30,
          alignItems: "center",
          opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 50 }}>🧬</span>
        <span style={{ fontSize: 30, color: colors.gray[400] }}>→</span>
        <span style={{ fontSize: 50 }}>📐</span>
        <span style={{ fontSize: 30, color: colors.gray[400] }}>→</span>
        <span style={{ fontSize: 50 }}>🤖</span>
      </div>
    </AbsoluteFill>
  );
};
