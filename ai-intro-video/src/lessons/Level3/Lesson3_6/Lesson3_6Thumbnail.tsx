/**
 * Lesson 3-6: 역전파 구현 (Backpropagation Implementation) - YouTube Thumbnail
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson3_6Thumbnail: React.FC = () => {
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
          Lesson 6
        </span>
      </div>

      {/* Calculation Visual */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "25px 35px",
            borderRadius: 16,
            border: "3px solid #f87171",
          }}
        >
          <div style={{ color: "#f87171", fontSize: 28, fontWeight: "bold" }}>∂L/∂w</div>
        </div>
        <span style={{ color: colors.white, fontSize: 40 }}>=</span>
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "25px 35px",
            borderRadius: 16,
            border: "3px solid #a855f7",
          }}
        >
          <div style={{ color: "#a855f7", fontSize: 28, fontWeight: "bold" }}>δ</div>
        </div>
        <span style={{ color: colors.white, fontSize: 40 }}>×</span>
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "25px 35px",
            borderRadius: 16,
            border: "3px solid #fbbf24",
          }}
        >
          <div style={{ color: "#fbbf24", fontSize: 28, fontWeight: "bold" }}>h</div>
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
        역전파 구현
      </h1>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 48,
          color: colors.gray[300],
          textAlign: "center",
        }}
      >
        손으로 직접 계산해보기
      </div>

      {/* Bottom Tag */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          backgroundColor: "#22c55e",
          padding: "15px 40px",
          borderRadius: 30,
        }}
      >
        <span style={{ color: colors.white, fontSize: 30, fontWeight: "bold" }}>
          실습 예제 포함
        </span>
      </div>
    </AbsoluteFill>
  );
};
