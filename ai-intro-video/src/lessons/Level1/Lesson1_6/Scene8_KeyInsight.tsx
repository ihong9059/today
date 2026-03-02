/**
 * Lesson 1-6: XOR 문제와 한계
 * Scene 8: 핵심 통찰
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene8_KeyInsight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 카드들 애니메이션
  const card1Opacity = interpolate(frame, [50, 90], [0, 1], { extrapolateRight: "clamp" });
  const card1Scale = spring({ frame: frame - 50, fps, config: { damping: 12 } });

  const card2Opacity = interpolate(frame, [120, 160], [0, 1], { extrapolateRight: "clamp" });
  const card2Scale = spring({ frame: frame - 120, fps, config: { damping: 12 } });

  const card3Opacity = interpolate(frame, [190, 230], [0, 1], { extrapolateRight: "clamp" });
  const card3Scale = spring({ frame: frame - 190, fps, config: { damping: 12 } });

  // 결론 애니메이션
  const conclusionOpacity = interpolate(frame, [280, 320], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-6/scene8_key_insight.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 52,
          color: colors.white,
          fontWeight: "bold",
          opacity: titleOpacity,
          marginBottom: 40,
        }}
      >
        핵심 통찰 정리
      </h2>

      {/* 3가지 핵심 카드 */}
      <div style={{ display: "flex", gap: 30 }}>
        {/* 카드 1: 단일 퍼셉트론 한계 */}
        <div
          style={{
            width: 340,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 30,
            border: "3px solid #6366f1",
            opacity: card1Opacity,
            transform: `scale(${card1Scale})`,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#6366f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 20,
            }}
          >
            1
          </div>
          <h3 style={{ fontSize: 24, color: "#a5b4fc", marginBottom: 15 }}>
            단일 퍼셉트론
          </h3>
          <p style={{ fontSize: 20, color: colors.gray[300], lineHeight: 1.6 }}>
            <span style={{ color: "#fbbf24" }}>선형 문제</span>만 해결 가능
            <br />
            <span style={{ fontSize: 18, color: colors.gray[400] }}>
              = 직선 하나로 분리 가능한 문제
            </span>
          </p>
        </div>

        {/* 카드 2: XOR은 비선형 */}
        <div
          style={{
            width: 340,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 30,
            border: "3px solid #f59e0b",
            opacity: card2Opacity,
            transform: `scale(${card2Scale})`,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 20,
            }}
          >
            2
          </div>
          <h3 style={{ fontSize: 24, color: "#fcd34d", marginBottom: 15 }}>
            XOR은 비선형
          </h3>
          <p style={{ fontSize: 20, color: colors.gray[300], lineHeight: 1.6 }}>
            직선 하나로
            <br />
            <span style={{ color: "#ef4444" }}>절대 분리 불가능</span>
          </p>
        </div>

        {/* 카드 3: 해결책 */}
        <div
          style={{
            width: 340,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 30,
            border: "3px solid #22c55e",
            opacity: card3Opacity,
            transform: `scale(${card3Scale})`,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 20,
            }}
          >
            3
          </div>
          <h3 style={{ fontSize: 24, color: "#86efac", marginBottom: 15 }}>
            해결책
          </h3>
          <p style={{ fontSize: 20, color: colors.gray[300], lineHeight: 1.6 }}>
            퍼셉트론을
            <br />
            <span style={{ color: "#22c55e" }}>여러 층으로 쌓기!</span>
          </p>
        </div>
      </div>

      {/* 결론 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          backgroundColor: colors.gray[800] + "ee",
          borderRadius: 20,
          padding: "25px 60px",
          border: "2px solid #8b5cf6",
          opacity: conclusionOpacity,
        }}
      >
        <span style={{ fontSize: 28, color: colors.white }}>
          이 발견이 결국 <span style={{ color: "#8b5cf6", fontWeight: "bold" }}>딥러닝</span>으로 이어집니다!
        </span>
      </div>
    </AbsoluteFill>
  );
};
