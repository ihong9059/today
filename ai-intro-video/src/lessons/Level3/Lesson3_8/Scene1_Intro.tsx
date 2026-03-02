/**
 * Scene 1: 인트로 - 과적합과 정규화 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, from: 0.5, to: 1, durationInFrames: 30 });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const problemOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });
  const solutionOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-8/scene1.mp3")} />

      {/* Level Badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          backgroundColor: colors.level[3],
          padding: "10px 25px",
          borderRadius: 25,
        }}
      >
        <span style={{ color: colors.white, fontSize: 24, fontWeight: "bold" }}>
          Level 3-8 (마지막!)
        </span>
      </div>

      {/* Main Title */}
      <h1
        style={{
          fontSize: 80,
          fontWeight: "bold",
          color: colors.white,
          textAlign: "center",
          marginBottom: 20,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        과적합과 정규화
      </h1>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 38,
          color: colors.gray[300],
          textAlign: "center",
          marginBottom: 50,
          opacity: subtitleOpacity,
        }}
      >
        Overfitting & Regularization
      </div>

      {/* Problem & Solution */}
      <div style={{ display: "flex", gap: 40 }}>
        <div
          style={{
            backgroundColor: "#f8717120",
            border: "2px solid #f87171",
            padding: "25px 40px",
            borderRadius: 16,
            opacity: problemOpacity,
          }}
        >
          <div style={{ color: "#f87171", fontSize: 26, fontWeight: "bold", marginBottom: 10 }}>
            문제
          </div>
          <div style={{ color: colors.white, fontSize: 22 }}>
            훈련 데이터만 잘 맞춤
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#22c55e20",
            border: "2px solid #22c55e",
            padding: "25px 40px",
            borderRadius: 16,
            opacity: solutionOpacity,
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 26, fontWeight: "bold", marginBottom: 10 }}>
            목표
          </div>
          <div style={{ color: colors.white, fontSize: 22 }}>
            새로운 데이터에도 잘 작동!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
