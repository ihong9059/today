/**
 * Scene 1: 인트로
 * 텍스트 분류 & 감성 분석 소개
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

  // 감정 이모지들
  const emotions = ["😊", "😢", "😠", "😍", "😐"];
  const gridOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });

  // 리뷰 예시 텍스트
  const reviewOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const questionOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Audio src={staticFile("audio/lesson-4-3/scene1.mp3")} />

      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          backgroundColor: colors.level[4],
          color: colors.white,
          padding: "12px 30px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: "bold",
          transform: `scale(${Math.max(0, badgeScale)})`,
        }}
      >
        Lesson 4-3
      </div>

      {/* Level 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          backgroundColor: colors.level[4],
          color: colors.white,
          padding: "12px 30px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: "bold",
          transform: `scale(${Math.max(0, badgeScale)})`,
        }}
      >
        Level 4 : PyTorch 실전
      </div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: 90,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 20,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: "0 4px 20px rgba(249,115,22,0.5)",
        }}
      >
        텍스트 분류
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 42,
          color: "#fb923c",
          fontWeight: "bold",
          opacity: subtitleOpacity,
          marginBottom: 40,
        }}
      >
        감성 분석으로 리뷰 긍정/부정 판단하기
      </h2>

      {/* 감정 이모지 그리드 */}
      <div
        style={{
          display: "flex",
          gap: 20,
          opacity: gridOpacity,
          marginBottom: 40,
        }}
      >
        {emotions.map((emoji, i) => {
          const delay = 120 + i * 15;
          const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 20 });
          return (
            <div
              key={i}
              style={{
                width: 80,
                height: 80,
                backgroundColor: colors.gray[800],
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
                transform: `scale(${Math.max(0, scale)})`,
                border: `2px solid ${colors.level[4]}`,
              }}
            >
              {emoji}
            </div>
          );
        })}
      </div>

      {/* 리뷰 예시 */}
      <div
        style={{
          opacity: reviewOpacity,
          display: "flex",
          gap: 30,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            border: "2px solid #22c55e",
            borderRadius: 16,
            padding: "20px 30px",
          }}
        >
          <span style={{ fontSize: 28, color: colors.white }}>"이 영화 정말 재밌어요!" 😊</span>
        </div>
        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            border: "2px solid #ef4444",
            borderRadius: 16,
            padding: "20px 30px",
          }}
        >
          <span style={{ fontSize: 28, color: colors.white }}>"시간 낭비였어요..." 😢</span>
        </div>
      </div>

      {/* 질문 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: questionOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
          backgroundColor: "rgba(249, 115, 22, 0.2)",
          padding: "20px 40px",
          borderRadius: 16,
          border: `2px solid ${colors.level[4]}`,
        }}
      >
        <span style={{ fontSize: 36, color: colors.white }}>
          텍스트를 어떻게 숫자로 바꿀까요? 🤔
        </span>
      </div>
    </AbsoluteFill>
  );
};
