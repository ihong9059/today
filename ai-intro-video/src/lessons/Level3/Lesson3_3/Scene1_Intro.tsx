/**
 * Scene 1: 인트로
 * 경사하강법 변형 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 30], [30, 0], { extrapolateRight: "clamp" });

  // 문제점들
  const problem1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const problem2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });

  // 옵티마이저들
  const opt1Scale = spring({ frame: frame - 200, fps, config: { damping: 12 } });
  const opt2Scale = spring({ frame: frame - 250, fps, config: { damping: 12 } });
  const opt3Scale = spring({ frame: frame - 300, fps, config: { damping: 12 } });
  const opt4Scale = spring({ frame: frame - 350, fps, config: { damping: 12 } });

  // 마지막 메시지
  const messageOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });

  const optimizers = [
    { name: "SGD", color: "#60a5fa", scale: opt1Scale },
    { name: "Momentum", color: "#22c55e", scale: opt2Scale },
    { name: "RMSprop", color: "#fbbf24", scale: opt3Scale },
    { name: "Adam", color: "#a855f7", scale: opt4Scale },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-3/scene1.mp3")} />

      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: colors.level[3],
          color: colors.white,
          padding: "8px 20px",
          borderRadius: 20,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Level 3 - Lesson 3
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 40,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        경사하강법의 변형들
      </h1>

      {/* 영문 부제 */}
      <h2
        style={{
          fontSize: 36,
          color: "#a855f7",
          textAlign: "center",
          marginTop: 10,
          opacity: titleOpacity,
        }}
      >
        Optimization Algorithms
      </h2>

      {/* 기본 경사하강법의 문제 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          marginTop: 50,
        }}
      >
        <div
          style={{
            backgroundColor: "#f8717130",
            border: "2px solid #f87171",
            padding: "20px 30px",
            borderRadius: 16,
            opacity: problem1Opacity,
          }}
        >
          <div style={{ color: "#f87171", fontSize: 24, fontWeight: "bold" }}>
            ⚠️ 전체 데이터 사용 → 느림
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#f8717130",
            border: "2px solid #f87171",
            padding: "20px 30px",
            borderRadius: 16,
            opacity: problem2Opacity,
          }}
        >
          <div style={{ color: "#f87171", fontSize: 24, fontWeight: "bold" }}>
            ⚠️ 지역 최솟값에 빠질 수 있음
          </div>
        </div>
      </div>

      {/* 옵티마이저들 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          marginTop: 60,
        }}
      >
        {optimizers.map((opt, index) => (
          <div
            key={index}
            style={{
              backgroundColor: `${opt.color}30`,
              border: `3px solid ${opt.color}`,
              padding: "25px 40px",
              borderRadius: 20,
              transform: `scale(${opt.scale})`,
            }}
          >
            <div style={{ color: opt.color, fontSize: 32, fontWeight: "bold" }}>
              {opt.name}
            </div>
          </div>
        ))}
      </div>

      {/* 마지막 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: messageOpacity,
        }}
      >
        <div style={{ fontSize: 36, color: "#fbbf24", fontWeight: "bold" }}>
          더 빠르고 똑똑한 학습 방법! 🚀
        </div>
      </div>
    </AbsoluteFill>
  );
};
