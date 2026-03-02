/**
 * Lesson 1-6: XOR 문제와 한계
 * Scene 1: 인트로
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame: frame - 20, fps, config: { damping: 12 } }) * 50 - 50;

  const badgeScale = spring({ frame: frame - 60, fps, config: { damping: 10 } });

  const warningOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  const warningPulse = Math.sin(frame * 0.1) * 0.1 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7f1d1d 50%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Audio src={staticFile("audio/lesson-1-6/scene1_intro.mp3")} />

      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          display: "flex",
          gap: 15,
          transform: `scale(${badgeScale})`,
        }}
      >
        <div
          style={{
            backgroundColor: "#22c55e",
            color: colors.white,
            padding: "10px 25px",
            borderRadius: 30,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Level 1
        </div>
        <div
          style={{
            backgroundColor: colors.primary[500],
            color: colors.white,
            padding: "10px 25px",
            borderRadius: 30,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Lesson 1-6
        </div>
      </div>

      {/* XOR 기호 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
          marginBottom: 30,
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "#f59e0b30",
            border: "4px solid #f59e0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            fontWeight: "bold",
            color: "#f59e0b",
          }}
        >
          ⊕
        </div>
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 80,
          color: colors.white,
          fontWeight: "bold",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        XOR 문제와 한계
      </h1>

      {/* 부제목 */}
      <p
        style={{
          fontSize: 36,
          color: "#fca5a5",
          opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        퍼셉트론이 풀지 못하는 문제가 있다?!
      </p>

      {/* 경고 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          backgroundColor: "#ef444430",
          border: "2px solid #ef4444",
          borderRadius: 15,
          padding: "15px 40px",
          opacity: warningOpacity,
          transform: `scale(${warningPulse})`,
        }}
      >
        <span style={{ fontSize: 24, color: "#ef4444", fontWeight: "bold" }}>
          AI 역사의 중요한 발견!
        </span>
      </div>

      {/* 시리즈 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          color: colors.gray[400],
          fontSize: 22,
        }}
      >
        AI 기초 교육 시리즈
      </div>
    </AbsoluteFill>
  );
};
