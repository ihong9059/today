/**
 * Lesson 1-1 Scene 1: 인트로
 * AI란 무엇인가? - 강의 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 애니메이션
  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const badgeScale = spring({ frame: frame - 10, fps, config: { damping: 15 } });
  const pointsOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a365d 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-1/scene1_intro.mp3")} />

      {/* Level 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          transform: `scale(${badgeScale})`,
          display: "flex",
          gap: 15,
        }}
      >
        <div
          style={{
            backgroundColor: colors.primary[500],
            color: colors.white,
            padding: "12px 30px",
            borderRadius: 30,
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          Level 1
        </div>
        <div
          style={{
            backgroundColor: "#22c55e",
            color: colors.white,
            padding: "12px 30px",
            borderRadius: 30,
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          Lesson 1-1
        </div>
      </div>

      {/* 메인 아이콘 */}
      <div
        style={{
          fontSize: 140,
          marginBottom: 20,
          transform: `scale(${titleSpring})`,
        }}
      >
        🧠
      </div>

      {/* 메인 타이틀 */}
      <h1
        style={{
          fontSize: 90,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 15,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [50, 0])}px)`,
          opacity: titleSpring,
          textShadow: "0 4px 30px rgba(0,0,0,0.5)",
        }}
      >
        AI란 무엇인가?
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 42,
          color: colors.primary[300],
          textAlign: "center",
          marginBottom: 50,
          opacity: subtitleOpacity,
        }}
      >
        인공지능의 세계로 첫 발을 내딛어 봅시다
      </h2>

      {/* 핵심 포인트 */}
      <div
        style={{
          display: "flex",
          gap: 30,
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: pointsOpacity,
        }}
      >
        {[
          { icon: "📱", text: "일상 속 AI" },
          { icon: "📚", text: "AI의 역사" },
          { icon: "🔄", text: "규칙 vs 학습" },
          { icon: "🎯", text: "현재 수준" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              backgroundColor: `${colors.primary[500]}30`,
              border: `2px solid ${colors.primary[400]}`,
              borderRadius: 16,
              padding: "20px 35px",
              display: "flex",
              alignItems: "center",
              gap: 15,
              transform: `translateY(${interpolate(frame, [50 + i * 8, 70 + i * 8], [30, 0], { extrapolateRight: "clamp" })}px)`,
            }}
          >
            <span style={{ fontSize: 36 }}>{item.icon}</span>
            <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* 시리즈 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          color: colors.gray[400],
          fontSize: 24,
        }}
      >
        AI 기초 교육 시리즈 - Level 1: AI 기초 이론
      </div>
    </AbsoluteFill>
  );
};
