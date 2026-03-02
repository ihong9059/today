/**
 * Lesson 2-5 썸네일
 * 벡터와 행렬 기초 + GPU/HBM
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson2_5Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Level 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: "#a855f7",
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 25,
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Level 2 · 수학 기초
      </div>

      {/* Lesson 번호 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          backgroundColor: "rgba(255,255,255,0.2)",
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 25,
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Lesson 2-5
      </div>

      {/* 배경 행렬 패턴 */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 50,
          opacity: 0.1,
          fontSize: 40,
          fontFamily: "monospace",
          color: "#a855f7",
          lineHeight: 1.5,
        }}
      >
        {`[1 2 3]\n[4 5 6]\n[7 8 9]`}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 150,
          right: 50,
          opacity: 0.1,
          fontSize: 40,
          fontFamily: "monospace",
          color: "#22c55e",
          lineHeight: 1.5,
        }}
      >
        {`[a b]\n[c d]`}
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 90,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 15,
          textShadow: "0 4px 30px rgba(168, 85, 247, 0.8)",
          zIndex: 10,
        }}
      >
        벡터와 행렬 기초
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 48,
          color: "#fbbf24",
          fontWeight: "bold",
          marginBottom: 30,
          zIndex: 10,
        }}
      >
        + GPU & HBM의 비밀
      </h2>

      {/* 아이콘 그룹 */}
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* 벡터 */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "rgba(59, 130, 246, 0.3)",
            border: "3px solid #3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontFamily: "monospace",
            color: colors.white,
          }}
        >
          [1,2,3]
        </div>

        <div style={{ fontSize: 40, color: "#a855f7" }}>×</div>

        {/* 행렬 */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "rgba(34, 197, 94, 0.3)",
            border: "3px solid #22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontSize: 18,
            fontFamily: "monospace",
            color: colors.white,
            lineHeight: 1.3,
          }}
        >
          <span>[1 2]</span>
          <span>[3 4]</span>
        </div>

        <div style={{ fontSize: 40, color: "#a855f7" }}>→</div>

        {/* GPU */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "rgba(239, 68, 68, 0.3)",
            border: "3px solid #ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 50,
          }}
        >
          🖥️
        </div>

        <div style={{ fontSize: 40, color: "#a855f7" }}>→</div>

        {/* HBM */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "rgba(251, 191, 36, 0.3)",
            border: "3px solid #fbbf24",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          HBM
        </div>
      </div>

      {/* 핵심 키워드 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          display: "flex",
          gap: 20,
          zIndex: 10,
        }}
      >
        {[
          { name: "벡터", color: "#3b82f6" },
          { name: "행렬 곱셈", color: "#22c55e" },
          { name: "GPU 병렬", color: "#ef4444" },
          { name: "HBM 대역폭", color: "#fbbf24" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "12px 24px",
              backgroundColor: `${item.color}40`,
              border: `2px solid ${item.color}`,
              borderRadius: 30,
              color: colors.white,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* 하단 수식 */}
      <div
        style={{
          position: "absolute",
          bottom: 25,
          right: 30,
          color: "#fbbf24",
          fontSize: 22,
          fontFamily: "monospace",
        }}
      >
        y = Wx + b
      </div>
    </AbsoluteFill>
  );
};
