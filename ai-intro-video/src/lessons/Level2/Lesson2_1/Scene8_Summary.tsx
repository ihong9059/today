/**
 * Scene 8: 요약
 * 함수들의 정리 및 AI 활용
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene8_Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 각 함수 카드 애니메이션
  const card1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const card2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const card3Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const card4Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const card5Opacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  // 핵심 메시지 애니메이션
  const messageOpacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });
  const messageScale = spring({ frame: frame - 400, fps, from: 0.8, to: 1, durationInFrames: 30 });

  const functions = [
    { name: "1차 함수", formula: "y = ax + b", use: "뉴런의 기본 연산", color: "#3b82f6" },
    { name: "2차 함수", formula: "y = ax²", use: "손실 함수 (MSE)", color: "#a855f7" },
    { name: "지수 함수", formula: "y = eˣ", use: "Softmax (확률)", color: "#fbbf24" },
    { name: "시그모이드", formula: "σ(x)", use: "이진 분류", color: "#2dd4bf" },
    { name: "ReLU", formula: "max(0, x)", use: "활성화 함수", color: "#f97316" },
  ];

  const opacities = [card1Opacity, card2Opacity, card3Opacity, card4Opacity, card5Opacity];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-1/scene8.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        📊 오늘 배운 함수들
      </h1>

      {/* 함수 카드들 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 30,
          maxWidth: 1600,
          padding: "0 60px",
        }}
      >
        {functions.map((func, index) => (
          <div
            key={index}
            style={{
              width: 280,
              padding: "25px",
              backgroundColor: `${func.color}20`,
              borderRadius: 20,
              border: `3px solid ${func.color}`,
              opacity: opacities[index],
              transform: `translateY(${(1 - opacities[index]) * 30}px)`,
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: func.color,
                fontWeight: "bold",
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              {func.name}
            </div>
            <div
              style={{
                fontSize: 32,
                color: colors.white,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 15,
                fontFamily: "monospace",
              }}
            >
              {func.formula}
            </div>
            <div
              style={{
                fontSize: 20,
                color: "#d1d5db",
                textAlign: "center",
                backgroundColor: "rgba(0,0,0,0.3)",
                padding: "8px 12px",
                borderRadius: 10,
              }}
            >
              🤖 {func.use}
            </div>
          </div>
        ))}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          padding: "30px 60px",
          backgroundColor: "rgba(168,85,247,0.3)",
          borderRadius: 20,
          border: "3px solid #a855f7",
          opacity: messageOpacity,
          transform: `scale(${Math.max(0.8, messageScale)})`,
        }}
      >
        <div style={{ color: colors.white, fontSize: 36, fontWeight: "bold", textAlign: "center" }}>
          함수를 이해하면 <span style={{ color: "#fbbf24" }}>AI의 작동 원리</span>가 보입니다!
        </div>
      </div>
    </AbsoluteFill>
  );
};
