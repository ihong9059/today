/**
 * Lesson 1-2: 뉴런에서 퍼셉트론으로
 * 썸네일 컴포넌트 (1280x720)
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson1_2Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a365d 30%, #2d3748 70%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
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
        Lesson 1-2
      </div>

      {/* Level 1 배지 */}
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
        Level 1
      </div>

      {/* 메인 아이콘들 */}
      <div style={{ display: "flex", gap: 30, marginBottom: 20 }}>
        <span style={{ fontSize: 80 }}>🧠</span>
        <span style={{ fontSize: 50, color: colors.gray[400], alignSelf: "center" }}>→</span>
        <span style={{ fontSize: 80 }}>🤖</span>
      </div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: 68,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        뉴런에서 퍼셉트론으로
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 38,
          color: colors.primary[300],
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        뇌를 수학으로 모델링하다
      </h2>

      {/* 핵심 키워드 */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { text: "860억 뉴런", color: "#3b82f6" },
          { text: "임계값", color: "#f97316" },
          { text: "맥컬록-피츠", color: "#8b5cf6" },
          { text: "퍼셉트론", color: "#22c55e" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              backgroundColor: `${item.color}30`,
              border: `2px solid ${item.color}`,
              borderRadius: 12,
              padding: "12px 25px",
              color: item.color,
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* 연대기 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          display: "flex",
          gap: 15,
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 22, color: "#3b82f6" }}>1943</span>
        <span style={{ fontSize: 18, color: colors.gray[500] }}>→</span>
        <span style={{ fontSize: 22, color: "#22c55e" }}>1958</span>
        <span style={{ fontSize: 18, color: colors.gray[500] }}>→</span>
        <span style={{ fontSize: 22, color: "#f97316" }}>현재</span>
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
