/**
 * Lesson 1-4 Scene 1: 인트로
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const badgeScale = spring({ frame: frame - 10, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a365d 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Level 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 50,
          backgroundColor: "#22c55e",
          color: colors.white,
          padding: "12px 30px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: "bold",
          transform: `scale(${badgeScale})`,
        }}
      >
        Level 1
      </div>

      {/* Lesson 배지 */}
      <div
        style={{
          backgroundColor: colors.primary[500],
          color: colors.white,
          padding: "15px 40px",
          borderRadius: 40,
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 30,
          transform: `scale(${titleSpring})`,
        }}
      >
        Lesson 1-4
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 90,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 30,
          transform: `translateY(${(1 - titleSpring) * 50}px)`,
          textShadow: "0 4px 30px rgba(0,0,0,0.5)",
        }}
      >
        퍼셉트론 학습
      </h1>

      {/* 부제목 */}
      <p
        style={{
          fontSize: 38,
          color: colors.gray[300],
          opacity: subtitleOpacity,
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.5,
        }}
      >
        어떻게 AI가 스스로 배우는지 알아봅니다
      </p>

      {/* 학습 내용 미리보기 */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginTop: 60,
          opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {["학습이란?", "오차 계산", "가중치 업데이트", "학습률"].map((topic, i) => (
          <div
            key={i}
            style={{
              backgroundColor: colors.gray[800] + "80",
              padding: "15px 30px",
              borderRadius: 15,
              color: colors.primary[300],
              fontSize: 24,
              fontWeight: "bold",
              transform: `translateY(${interpolate(
                frame,
                [40 + i * 5, 60 + i * 5],
                [20, 0],
                { extrapolateRight: "clamp" }
              )}px)`,
            }}
          >
            {topic}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
