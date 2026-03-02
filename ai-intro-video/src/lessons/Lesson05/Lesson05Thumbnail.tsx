/**
 * Lesson 0-5: NumPy 기초 - 썸네일 컴포넌트
 * 1280x720 해상도
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../styles";

export const Lesson05Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
        }}
      >
        <span
          style={{
            backgroundColor: colors.level[0],
            padding: "12px 24px",
            borderRadius: 30,
            fontSize: 28,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          레벨 0 · 레슨 5
        </span>
      </div>

      {/* 메인 아이콘 */}
      <div style={{ fontSize: 140, marginBottom: 20 }}>🔢</div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: 90,
          fontWeight: "bold",
          color: colors.white,
          margin: 0,
          textAlign: "center",
        }}
      >
        NumPy 기초
      </h1>

      {/* 부제목 */}
      <p
        style={{
          fontSize: 40,
          color: "#f97316",
          marginTop: 20,
          fontWeight: "bold",
        }}
      >
        텐서의 기초 - AI의 데이터 구조
      </p>

      {/* 키워드 블록 */}
      <div
        style={{
          display: "flex",
          gap: 25,
          marginTop: 40,
        }}
      >
        {["텐서", "Shape", "Broadcasting"].map((label, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: colors.gray[800],
              padding: "16px 28px",
              borderRadius: 16,
              border: `3px solid ${["#22c55e", "#3b82f6", "#8b5cf6"][idx]}`,
            }}
          >
            <span style={{ color: colors.white, fontSize: 26, fontWeight: "bold" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* 하단 장식 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ color: colors.gray[400], fontSize: 22 }}>AI 기초 강의</span>
        <span style={{ color: "#f97316", fontSize: 22 }}>|</span>
        <span style={{ color: colors.gray[300], fontSize: 22 }}>Python</span>
      </div>
    </AbsoluteFill>
  );
};
