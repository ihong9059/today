/**
 * Lesson 1-4 Scene 2: 학습이란 무엇인가 (자전거 비유)
 */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

export const Scene2_WhatIsLearning: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // 자전거 학습 단계 애니메이션
  const steps = [
    { emoji: "1️⃣", title: "처음", desc: "균형을 못 잡고 넘어짐", insight: '"이렇게 하면 안 되는구나"' },
    { emoji: "2️⃣", title: "조금 후", desc: "핸들을 너무 많이 꺾음", insight: '"조금만 돌려야겠다"' },
    { emoji: "3️⃣", title: "더 연습", desc: "페달을 너무 빨리 밟음", insight: '"천천히 밟아야겠다"' },
    { emoji: "4️⃣", title: "결국", desc: "자연스럽게 탈 수 있음!", insight: "올바른 파라미터 발견!" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        padding: 60,
      }}
    >
      {/* 제목 */}
      <div style={{ textAlign: "center", marginBottom: 40, opacity: titleOpacity }}>
        <h1 style={{ fontSize: 60, color: colors.white, marginBottom: 15 }}>
          학습이란 무엇인가?
        </h1>
        <p style={{ fontSize: 30, color: colors.gray[400] }}>
          자전거 타기 배우기로 이해하기
        </p>
      </div>

      {/* 자전거 아이콘 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
          opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 100 }}>🚴</span>
      </div>

      {/* 학습 단계 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 25,
          marginBottom: 40,
        }}
      >
        {steps.map((step, i) => {
          const stepStart = 40 + i * 60;
          const stepOpacity = interpolate(frame, [stepStart, stepStart + 30], [0, 1], {
            extrapolateRight: "clamp",
          });
          const stepTranslateY = interpolate(frame, [stepStart, stepStart + 30], [30, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                backgroundColor: i === 3 ? "#22c55e30" : colors.gray[800] + "90",
                border: i === 3 ? "3px solid #22c55e" : "2px solid " + colors.gray[700],
                borderRadius: 20,
                padding: "25px 20px",
                width: 220,
                opacity: stepOpacity,
                transform: `translateY(${stepTranslateY}px)`,
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>{step.emoji}</div>
              <div
                style={{
                  fontSize: 24,
                  color: i === 3 ? "#22c55e" : colors.primary[300],
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                {step.title}
              </div>
              <div style={{ fontSize: 18, color: colors.gray[300], marginBottom: 10 }}>
                {step.desc}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: colors.primary[400],
                  fontStyle: "italic",
                }}
              >
                {step.insight}
              </div>
            </div>
          );
        })}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          textAlign: "center",
          opacity: interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: colors.primary[600] + "40",
            border: "2px solid " + colors.primary[500],
            borderRadius: 20,
            padding: "20px 50px",
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
            핵심: 실수 → 조정 → 반복 → 숙달
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
