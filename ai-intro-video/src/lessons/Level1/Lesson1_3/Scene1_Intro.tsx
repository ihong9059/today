/**
 * Scene 1: 인트로 - 퍼셉트론 구조 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, from: -50, to: 0, config: { damping: 12 } });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });

  const componentReveal = (index: number) => {
    const startFrame = 120 + index * 45;
    return interpolate(frame, [startFrame, startFrame + 30], [0, 1], { extrapolateRight: "clamp" });
  };

  const components = [
    { icon: "📥", name: "입력", color: "#3b82f6" },
    { icon: "⚖️", name: "가중치", color: "#f97316" },
    { icon: "➕", name: "편향", color: "#8b5cf6" },
    { icon: "⚡", name: "활성화 함수", color: "#22c55e" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          display: "flex",
          gap: 20,
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
          Lesson 1-3
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
          Level 1
        </div>
      </div>

      {/* 메인 타이틀 */}
      <h1
        style={{
          fontSize: 90,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: "0 4px 30px rgba(0,0,0,0.5)",
        }}
      >
        퍼셉트론 구조
      </h1>

      <p
        style={{
          fontSize: 42,
          color: colors.primary[300],
          textAlign: "center",
          marginBottom: 60,
          opacity: subtitleOpacity,
        }}
      >
        AI의 가장 작은 단위 내부 들여다보기
      </p>

      {/* 4가지 핵심 구성요소 */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 30,
        }}
      >
        {components.map((comp, i) => (
          <div
            key={i}
            style={{
              opacity: componentReveal(i),
              transform: `scale(${componentReveal(i)})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 15,
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 20,
                backgroundColor: `${comp.color}30`,
                border: `3px solid ${comp.color}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 60,
              }}
            >
              {comp.icon}
            </div>
            <span
              style={{
                fontSize: 28,
                color: comp.color,
                fontWeight: "bold",
              }}
            >
              {comp.name}
            </span>
          </div>
        ))}
      </div>

      {/* 안내 문구 */}
      {frame > 300 && (
        <p
          style={{
            position: "absolute",
            bottom: 80,
            fontSize: 32,
            color: colors.gray[400],
            opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          하나씩 자세히 알아보겠습니다
        </p>
      )}
    </AbsoluteFill>
  );
};
