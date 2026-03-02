/**
 * Lesson 3-7: 활성화 함수 (Activation Functions) - YouTube Thumbnail
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson3_7Thumbnail: React.FC = () => {
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
          Lesson 7
        </span>
      </div>

      {/* Activation Function Cards */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            backgroundColor: "#f87171",
            padding: "25px 35px",
            borderRadius: 16,
          }}
        >
          <span style={{ color: colors.white, fontSize: 32, fontWeight: "bold" }}>
            Sigmoid
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#fbbf24",
            padding: "25px 35px",
            borderRadius: 16,
          }}
        >
          <span style={{ color: colors.gray[900], fontSize: 32, fontWeight: "bold" }}>
            Tanh
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#22c55e",
            padding: "25px 35px",
            borderRadius: 16,
          }}
        >
          <span style={{ color: colors.white, fontSize: 32, fontWeight: "bold" }}>
            ReLU
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
        활성화 함수
      </h1>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 48,
          color: colors.gray[300],
          textAlign: "center",
        }}
      >
        Activation Functions
      </div>

      {/* Key Message */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          backgroundColor: colors.gray[800],
          padding: "15px 40px",
          borderRadius: 20,
          border: "3px solid #a855f7",
        }}
      >
        <span style={{ color: colors.white, fontSize: 30 }}>
          비선형성 → 복잡한 패턴 학습!
        </span>
      </div>
    </AbsoluteFill>
  );
};
