/**
 * Lesson 0-5: NumPy 기초 - Scene 1: Intro
 * NumPy가 AI에서 왜 중요한지 소개
 */

import { AbsoluteFill, interpolate, useCurrentFrame, spring } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L05_Scene1_Intro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  const titleSpring = spring({
    frame,
    fps: FPS,
    config: { damping: 15, stiffness: 100 },
  });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const numbersOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateRight: "clamp",
  });

  const whyOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        padding: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span
          style={{
            backgroundColor: colors.level[0],
            padding: "12px 24px",
            borderRadius: 30,
            fontSize: 24,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          레벨 0 · 레슨 5
        </span>
      </div>

      {/* NumPy 로고 및 제목 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          marginBottom: 30,
          transform: `scale(${titleSpring})`,
        }}
      >
        <span style={{ fontSize: 120 }}>🔢</span>
        <h1
          style={{
            fontSize: 100,
            fontWeight: "bold",
            color: colors.white,
            margin: 0,
          }}
        >
          NumPy
        </h1>
      </div>

      {/* 부제목 */}
      <p
        style={{
          fontSize: 42,
          color: "#60a5fa",
          marginBottom: 50,
          opacity: subtitleOpacity,
        }}
      >
        Numerical Python - AI의 심장
      </p>

      {/* 숫자 시각화 */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginBottom: 50,
          opacity: numbersOpacity,
        }}
      >
        {["이미지", "모델", "연산"].map((label, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: colors.gray[800],
              padding: "30px 40px",
              borderRadius: 16,
              border: `3px solid ${["#22c55e", "#3b82f6", "#f97316"][idx]}`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: ["#22c55e", "#3b82f6", "#f97316"][idx],
                marginBottom: 10,
              }}
            >
              {["수백만", "수십억", "초고속"][idx]}
            </div>
            <div style={{ fontSize: 24, color: colors.gray[400] }}>
              {label === "이미지" && "픽셀 처리"}
              {label === "모델" && "파라미터"}
              {label === "연산" && "계산 속도"}
            </div>
          </div>
        ))}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          backgroundColor: "#f9731620",
          border: "2px solid #f97316",
          borderRadius: 16,
          padding: "25px 50px",
          opacity: whyOpacity,
        }}
      >
        <span style={{ fontSize: 32, color: "#f97316", fontWeight: "bold" }}>
          💡 오늘 배울 내용: 텐서(Tensor)의 개념과 AI에서의 활용
        </span>
      </div>
    </AbsoluteFill>
  );
};
