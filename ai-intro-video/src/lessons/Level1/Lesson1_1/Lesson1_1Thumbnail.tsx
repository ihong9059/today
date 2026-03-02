/**
 * Lesson 1-1: AI란 무엇인가?
 * 썸네일 컴포넌트 (1280x720)
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson1_1Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a365d 30%, #1e3a5f 70%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      {/* Level 1 시작 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          backgroundColor: "#22c55e",
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 30,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Level 1 시작!
      </div>

      {/* 레슨 번호 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: colors.primary[500],
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 30,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Lesson 1-1
      </div>

      {/* 메인 아이콘 */}
      <div style={{ fontSize: 120, marginBottom: 20 }}>🧠</div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        AI란 무엇인가?
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 42,
          color: colors.primary[300],
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        인공지능의 세계로 첫 발
      </h2>

      {/* 핵심 키워드 */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { text: "AI 정의", color: "#3b82f6" },
          { text: "AI 역사", color: "#22c55e" },
          { text: "규칙 vs 학습", color: "#f97316" },
          { text: "현재 수준", color: "#8b5cf6" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              backgroundColor: `${item.color}30`,
              border: `2px solid ${item.color}`,
              borderRadius: 12,
              padding: "12px 25px",
              color: item.color,
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* 아이콘 그룹 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          display: "flex",
          gap: 15,
        }}
      >
        <span style={{ fontSize: 40 }}>📱</span>
        <span style={{ fontSize: 40 }}>🤖</span>
        <span style={{ fontSize: 40 }}>📊</span>
        <span style={{ fontSize: 40 }}>💡</span>
      </div>

      {/* 시리즈 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          color: colors.gray[400],
          fontSize: 22,
        }}
      >
        AI 기초 교육 시리즈
      </div>
    </AbsoluteFill>
  );
};
