/**
 * Lesson 1-3: 퍼셉트론 구조
 * 썸네일 컴포넌트 (1280x720)
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson1_3Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 30%, #2d3748 70%, ${colors.gray[900]} 100%)`,
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
        Lesson 1-3
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

      {/* 퍼셉트론 다이어그램 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 20,
        }}
      >
        {/* 입력 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {["x₁", "x₂", "x₃"].map((x, i) => (
            <div
              key={i}
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#3b82f630",
                border: "3px solid #3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                color: "#3b82f6",
                fontWeight: "bold",
              }}
            >
              {x}
            </div>
          ))}
        </div>

        {/* 화살표와 가중치 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {["w₁", "w₂", "w₃"].map((w, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: colors.gray[500], fontSize: 30 }}>→</span>
              <span style={{ fontSize: 20, color: "#f97316", marginLeft: 5 }}>{w}</span>
            </div>
          ))}
        </div>

        {/* 뉴런 */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
          }}
        >
          Σ
        </div>

        {/* 활성화 함수 */}
        <span style={{ color: colors.gray[400], fontSize: 30 }}>→</span>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 15,
            backgroundColor: "#22c55e30",
            border: "3px solid #22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            color: "#22c55e",
            fontWeight: "bold",
          }}
        >
          f(z)
        </div>

        {/* 출력 */}
        <span style={{ color: colors.gray[400], fontSize: 30 }}>→</span>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#ef444430",
            border: "3px solid #ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            color: "#ef4444",
            fontWeight: "bold",
          }}
        >
          y
        </div>
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
        퍼셉트론 구조
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 34,
          color: colors.primary[300],
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
        }}
      >
        입력 · 가중치 · 편향 · 활성화 함수
      </h2>

      {/* 핵심 공식 */}
      <div
        style={{
          backgroundColor: colors.gray[800] + "90",
          borderRadius: 15,
          padding: "15px 40px",
          fontFamily: "monospace",
          fontSize: 32,
          color: colors.primary[400],
        }}
      >
        y = f(Σwᵢxᵢ + b)
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
