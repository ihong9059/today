import { AbsoluteFill } from "remotion";
import { colors } from "../../styles";

export const Lesson04Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      {/* Level badge */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
        }}
      >
        <span
          style={{
            backgroundColor: colors.level[0],
            padding: "16px 32px",
            borderRadius: 40,
            fontSize: 36,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          레벨 0 · 레슨 4
        </span>
      </div>

      {/* Main icon */}
      <div style={{ fontSize: 180, marginBottom: 40 }}>🧩</div>

      {/* Title */}
      <h1
        style={{
          fontSize: 120,
          fontWeight: "bold",
          color: colors.white,
          margin: 0,
          textAlign: "center",
        }}
      >
        함수
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 48,
          color: "#f97316",
          marginTop: 30,
          fontWeight: "bold",
        }}
      >
        AI의 핵심 빌딩 블록
      </p>

      {/* Function blocks */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginTop: 50,
        }}
      >
        {["활성화 함수", "손실 함수", "콜백 함수"].map((label, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: colors.gray[800],
              padding: "20px 35px",
              borderRadius: 20,
              border: `3px solid ${["#22c55e", "#ef4444", "#8b5cf6"][idx]}`,
            }}
          >
            <span style={{ color: colors.white, fontSize: 32, fontWeight: "bold" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom decoration */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <span style={{ color: colors.gray[400], fontSize: 28 }}>AI 기초 강의</span>
        <span style={{ color: "#f97316", fontSize: 28 }}>|</span>
        <span style={{ color: colors.gray[300], fontSize: 28 }}>ReLU · MSE · Cross Entropy</span>
      </div>
    </AbsoluteFill>
  );
};
