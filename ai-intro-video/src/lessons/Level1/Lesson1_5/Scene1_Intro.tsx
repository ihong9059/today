/**
 * Lesson 1-5: AND, OR, NOT 게이트
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

  const gateOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, #312e81 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Audio src={staticFile("audio/lesson-1-5/scene1_intro.mp3")} />

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
          Lesson 1-5
        </div>
      </div>

      {/* 논리 게이트 아이콘들 */}
      <div
        style={{
          display: "flex",
          gap: 60,
          marginBottom: 50,
          opacity: gateOpacity,
        }}
      >
        {/* AND 게이트 심볼 */}
        <div
          style={{
            width: 120,
            height: 120,
            backgroundColor: "#3b82f630",
            border: "4px solid #3b82f6",
            borderRadius: "0 60px 60px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: "bold",
            color: "#3b82f6",
          }}
        >
          AND
        </div>

        {/* OR 게이트 심볼 */}
        <div
          style={{
            width: 120,
            height: 120,
            backgroundColor: "#22c55e30",
            border: "4px solid #22c55e",
            borderRadius: "20px 60px 60px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: "bold",
            color: "#22c55e",
          }}
        >
          OR
        </div>

        {/* NOT 게이트 심볼 */}
        <div
          style={{
            width: 120,
            height: 120,
            backgroundColor: "#ef444430",
            border: "4px solid #ef4444",
            borderRadius: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: "bold",
            color: "#ef4444",
          }}
        >
          NOT
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
        AND, OR, NOT 게이트
      </h1>

      {/* 부제목 */}
      <p
        style={{
          fontSize: 36,
          color: colors.primary[300],
          opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        퍼셉트론으로 논리 연산 구현하기
      </p>

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
