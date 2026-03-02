/**
 * Scene 1: 인트로
 * MNIST 손글씨 분류 소개
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

  // MNIST 숫자 그리드 애니메이션
  const gridOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });

  // 숫자 0-9 표시 애니메이션
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const messageOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });
  const accuracyOpacity = interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" });
  const accuracyValue = interpolate(frame, [630, 750], [0, 98], { extrapolateRight: "clamp" });

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
      <Audio src={staticFile("audio/lesson-4-1/scene1.mp3")} />

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
        Lesson 4-1
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
        MNIST 손글씨 분류
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
        딥러닝의 "Hello World"
      </h2>

      {/* MNIST 숫자 그리드 */}
      <div
        style={{
          display: "flex",
          gap: 20,
          opacity: gridOpacity,
          marginBottom: 40,
        }}
      >
        {digits.map((digit, i) => {
          const delay = 120 + i * 20;
          const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 20 });
          return (
            <div
              key={digit}
              style={{
                width: 80,
                height: 80,
                backgroundColor: colors.gray[800],
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
                fontWeight: "bold",
                color: colors.white,
                transform: `scale(${Math.max(0, scale)})`,
                border: `2px solid ${colors.level[4]}`,
              }}
            >
              {digit}
            </div>
          );
        })}
      </div>

      {/* 데이터셋 정보 */}
      <div
        style={{
          opacity: messageOpacity,
          fontSize: 32,
          color: colors.gray[300],
          textAlign: "center",
        }}
      >
        7만 장의 손글씨 숫자 이미지
      </div>

      {/* 정확도 목표 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: accuracyOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 36, color: "#22c55e", fontWeight: "bold" }}>
          목표 정확도:
        </span>
        <span style={{ fontSize: 72, color: "#22c55e", fontWeight: "bold" }}>
          {(accuracyValue ?? 0).toFixed(0)}%
        </span>
      </div>
    </AbsoluteFill>
  );
};
