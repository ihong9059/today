/**
 * Scene 1: 인트로 - 역전파 구현 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, from: 0.5, to: 1, durationInFrames: 30 });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const networkOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });
  const goalOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-6/scene1.mp3")} />

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
          Level 3-6
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
        역전파 구현
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
        손으로 직접 계산해보기!
      </div>

      {/* Simple Network Diagram */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
          opacity: networkOpacity,
        }}
      >
        {/* Input Layer */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              backgroundColor: "#22c55e",
              width: 50,
              height: 50,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>x₁</span>
          </div>
          <div
            style={{
              backgroundColor: "#22c55e",
              width: 50,
              height: 50,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>x₂</span>
          </div>
        </div>

        <span style={{ color: colors.gray[400], fontSize: 30 }}>→</span>

        {/* Hidden Layer */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              backgroundColor: "#fbbf24",
              width: 50,
              height: 50,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: colors.gray[900], fontSize: 20, fontWeight: "bold" }}>h₁</span>
          </div>
          <div
            style={{
              backgroundColor: "#fbbf24",
              width: 50,
              height: 50,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: colors.gray[900], fontSize: 20, fontWeight: "bold" }}>h₂</span>
          </div>
        </div>

        <span style={{ color: colors.gray[400], fontSize: 30 }}>→</span>

        {/* Output */}
        <div
          style={{
            backgroundColor: "#a855f7",
            width: 50,
            height: 50,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>y</span>
        </div>
      </div>

      {/* Goal */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          backgroundColor: colors.gray[800],
          padding: "20px 40px",
          borderRadius: 16,
          border: "2px solid #f87171",
          opacity: goalOpacity,
        }}
      >
        <span style={{ color: colors.white, fontSize: 28 }}>
          순전파 → 역전파를 단계별로 계산!
        </span>
      </div>
    </AbsoluteFill>
  );
};
