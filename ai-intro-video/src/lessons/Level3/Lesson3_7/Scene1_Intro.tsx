/**
 * Scene 1: 인트로 - 활성화 함수 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, from: 0.5, to: 1, durationInFrames: 30 });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const funcsOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });
  const goalOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  const activationFuncs = [
    { name: "Sigmoid", color: "#f87171" },
    { name: "Tanh", color: "#fbbf24" },
    { name: "ReLU", color: "#22c55e" },
    { name: "Softmax", color: "#60a5fa" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-7/scene1.mp3")} />

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
          Level 3-7
        </span>
      </div>

      {/* Main Title */}
      <h1
        style={{
          fontSize: 85,
          fontWeight: "bold",
          color: colors.white,
          textAlign: "center",
          marginBottom: 20,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        활성화 함수
      </h1>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 40,
          color: colors.gray[300],
          textAlign: "center",
          marginBottom: 50,
          opacity: subtitleOpacity,
        }}
      >
        Activation Functions
      </div>

      {/* Activation Function Cards */}
      <div
        style={{
          display: "flex",
          gap: 25,
          opacity: funcsOpacity,
        }}
      >
        {activationFuncs.map((func, index) => (
          <div
            key={index}
            style={{
              backgroundColor: colors.gray[800],
              padding: "20px 35px",
              borderRadius: 16,
              border: `3px solid ${func.color}`,
              transform: `translateY(${interpolate(
                frame,
                [90 + index * 15, 120 + index * 15],
                [20, 0],
                { extrapolateRight: "clamp" }
              )}px)`,
            }}
          >
            <span style={{ color: func.color, fontSize: 28, fontWeight: "bold" }}>
              {func.name}
            </span>
          </div>
        ))}
      </div>

      {/* Goal */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          backgroundColor: colors.gray[800],
          padding: "20px 40px",
          borderRadius: 16,
          border: "2px solid #a855f7",
          opacity: goalOpacity,
        }}
      >
        <span style={{ color: colors.white, fontSize: 26 }}>
          비선형성으로 복잡한 패턴 학습!
        </span>
      </div>
    </AbsoluteFill>
  );
};
