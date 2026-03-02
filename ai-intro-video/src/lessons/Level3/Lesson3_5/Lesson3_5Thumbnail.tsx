/**
 * Lesson 3-5: 역전파 이론 (Backpropagation Theory) - YouTube Thumbnail
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson3_5Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Level Badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          backgroundColor: colors.level[3],
          padding: "12px 28px",
          borderRadius: 30,
        }}
      >
        <span style={{ color: colors.white, fontSize: 28, fontWeight: "bold" }}>
          Level 3
        </span>
      </div>

      {/* Lesson Number */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          backgroundColor: colors.gray[800],
          padding: "12px 28px",
          borderRadius: 30,
          border: `2px solid ${colors.level[3]}`,
        }}
      >
        <span style={{ color: colors.white, fontSize: 28, fontWeight: "bold" }}>
          Lesson 5
        </span>
      </div>

      {/* Backpropagation Visual */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 25,
          marginBottom: 30,
        }}
      >
        {/* Output */}
        <div
          style={{
            backgroundColor: "#a855f7",
            padding: "30px 40px",
            borderRadius: 20,
          }}
        >
          <span style={{ color: colors.white, fontSize: 42, fontWeight: "bold" }}>
            L
          </span>
        </div>

        {/* Arrow */}
        <span style={{ color: "#f87171", fontSize: 60 }}>⬅</span>

        {/* Hidden Layer */}
        <div
          style={{
            backgroundColor: "#fbbf24",
            padding: "30px 40px",
            borderRadius: 20,
          }}
        >
          <span style={{ color: colors.gray[900], fontSize: 42, fontWeight: "bold" }}>
            ∂L/∂h
          </span>
        </div>

        {/* Arrow */}
        <span style={{ color: "#f87171", fontSize: 60 }}>⬅</span>

        {/* Weights */}
        <div
          style={{
            backgroundColor: "#22c55e",
            padding: "30px 40px",
            borderRadius: 20,
          }}
        >
          <span style={{ color: colors.white, fontSize: 42, fontWeight: "bold" }}>
            ∂L/∂w
          </span>
        </div>
      </div>

      {/* Main Title */}
      <h1
        style={{
          fontSize: 100,
          fontWeight: "bold",
          color: colors.white,
          textAlign: "center",
          marginBottom: 20,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        역전파 이론
      </h1>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 48,
          color: colors.gray[300],
          textAlign: "center",
        }}
      >
        Backpropagation Theory
      </div>

      {/* Chain Rule Formula */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          backgroundColor: colors.gray[800],
          padding: "20px 50px",
          borderRadius: 20,
          border: "3px solid #f87171",
        }}
      >
        <span style={{ color: colors.white, fontSize: 38, fontFamily: "serif" }}>
          ∂L/∂w = ∂L/∂y × ∂y/∂w
        </span>
      </div>
    </AbsoluteFill>
  );
};
