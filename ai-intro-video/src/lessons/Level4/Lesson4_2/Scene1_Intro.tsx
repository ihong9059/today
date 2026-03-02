/**
 * Scene 1: 인트로
 * CNN 이미지 분류 소개
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

  // CIFAR-10 클래스 아이콘
  const classes = ["✈️", "🚗", "🐦", "🐱", "🦌", "🐕", "🐸", "🐴", "🚢", "🚚"];
  const gridOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });

  const questionOpacity = interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" });

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
      <Audio src={staticFile("audio/lesson-4-2/scene1.mp3")} />

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
        Lesson 4-2
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
        이미지 분류 CNN
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
        합성곱 신경망으로 실제 이미지 분류하기
      </h2>

      {/* CIFAR-10 클래스 그리드 */}
      <div
        style={{
          display: "flex",
          gap: 20,
          opacity: gridOpacity,
          marginBottom: 40,
        }}
      >
        {classes.map((emoji, i) => {
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
          왜 이미지에는 CNN이 필요할까요? 🤔
        </span>
      </div>
    </AbsoluteFill>
  );
};
