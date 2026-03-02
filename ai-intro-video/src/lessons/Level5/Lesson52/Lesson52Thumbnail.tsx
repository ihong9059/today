/**
 * Lesson 5-2 썸네일: 합성곱 연산 이해하기
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson52Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c3aed 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      {/* 레벨 표시 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: "#8b5cf6",
          padding: "8px 20px",
          borderRadius: 8,
          fontSize: 24,
          color: colors.white,
          fontWeight: "bold",
        }}
      >
        Level 5-2
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        합성곱 연산
      </h1>

      {/* 커널 시각화 */}
      <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
        {/* 이미지 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 40px)",
            gap: 4,
            backgroundColor: colors.gray[800],
            padding: 10,
            borderRadius: 12,
            border: "3px solid #3b82f6",
          }}
        >
          {Array(16).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                width: 40,
                height: 40,
                backgroundColor: colors.gray[700],
                borderRadius: 6,
              }}
            />
          ))}
        </div>

        {/* 곱하기 */}
        <span style={{ fontSize: 48, color: colors.white }}>×</span>

        {/* 커널 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 45px)",
            gap: 4,
            backgroundColor: colors.gray[800],
            padding: 10,
            borderRadius: 12,
            border: "3px solid #f59e0b",
          }}
        >
          {[-1, 0, 1, -2, 0, 2, -1, 0, 1].map((v, i) => (
            <div
              key={i}
              style={{
                width: 45,
                height: 45,
                backgroundColor: v < 0 ? "#ef4444" : v > 0 ? "#22c55e" : colors.gray[600],
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                color: colors.white,
                fontWeight: "bold",
              }}
            >
              {v}
            </div>
          ))}
        </div>

        {/* 등호 */}
        <span style={{ fontSize: 48, color: colors.white }}>=</span>

        {/* 특징 맵 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 50px)",
            gap: 4,
            backgroundColor: colors.gray[800],
            padding: 10,
            borderRadius: 12,
            border: "3px solid #22c55e",
          }}
        >
          {Array(4).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#22c55e",
                borderRadius: 6,
              }}
            />
          ))}
        </div>
      </div>

      {/* 서브타이틀 */}
      <p
        style={{
          fontSize: 36,
          color: "#f59e0b",
          marginTop: 30,
          fontWeight: "bold",
        }}
      >
        커널 × 이미지 = 특징 추출!
      </p>

      {/* 키워드 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          display: "flex",
          gap: 15,
        }}
      >
        {["커널", "스트라이드", "패딩", "특징 맵"].map((keyword) => (
          <div
            key={keyword}
            style={{
              backgroundColor: "#8b5cf622",
              padding: "8px 20px",
              borderRadius: 20,
              border: "2px solid #8b5cf6",
              fontSize: 20,
              color: colors.white,
            }}
          >
            {keyword}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
