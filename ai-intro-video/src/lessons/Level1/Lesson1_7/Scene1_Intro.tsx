/**
 * Scene 1: 인트로
 * 다층 퍼셉트론 소개
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

  const layerAnimation = interpolate(frame, [90, 200], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, #0f172a 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Audio src={staticFile("audio/lesson-1-7/scene1_intro.mp3")} />

      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          backgroundColor: colors.primary[500],
          color: colors.white,
          padding: "12px 30px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: "bold",
          transform: `scale(${Math.max(0, badgeScale)})`,
        }}
      >
        Lesson 1-7
      </div>

      {/* Level 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          backgroundColor: "#f59e0b",
          color: colors.white,
          padding: "12px 30px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: "bold",
          transform: `scale(${Math.max(0, badgeScale)})`,
        }}
      >
        Level 1
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
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        다층 퍼셉트론
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 48,
          color: "#60a5fa",
          fontWeight: "bold",
          opacity: subtitleOpacity,
          marginBottom: 60,
        }}
      >
        Multi-Layer Perceptron (MLP)
      </h2>

      {/* 층 시각화 */}
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
          opacity: layerAnimation,
          transform: `scale(${0.8 + layerAnimation * 0.2})`,
        }}
      >
        {/* 입력층 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ color: colors.gray[400], fontSize: 24, marginBottom: 10 }}>입력층</div>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontWeight: "bold",
                fontSize: 24,
                boxShadow: "0 4px 15px rgba(59,130,246,0.5)",
              }}
            >
              x{i + 1}
            </div>
          ))}
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 48, color: colors.gray[500] }}>→</div>

        {/* 은닉층 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 15 }}>
          <div style={{ color: "#a855f7", fontSize: 24, marginBottom: 10 }}>은닉층</div>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 55,
                height: 55,
                borderRadius: "50%",
                backgroundColor: "#a855f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontWeight: "bold",
                fontSize: 22,
                boxShadow: "0 4px 15px rgba(168,85,247,0.5)",
              }}
            >
              h{i + 1}
            </div>
          ))}
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 48, color: colors.gray[500] }}>→</div>

        {/* 출력층 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ color: "#22c55e", fontSize: 24, marginBottom: 10 }}>출력층</div>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.white,
              fontWeight: "bold",
              fontSize: 24,
              boxShadow: "0 4px 15px rgba(34,197,94,0.5)",
            }}
          >
            y
          </div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          fontSize: 32,
          color: "#fcd34d",
          fontWeight: "bold",
          opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        XOR 문제의 해결책!
      </div>
    </AbsoluteFill>
  );
};
