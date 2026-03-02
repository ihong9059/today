/**
 * Lesson 2-4 썸네일
 * 연쇄법칙 (Chain Rule)
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson2_4Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)`,
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
        Lesson 2-4
      </div>

      {/* 배경 수식 패턴 */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 50,
          opacity: 0.15,
          fontSize: 45,
          fontFamily: "monospace",
          color: "#a855f7",
          lineHeight: 1.5,
        }}
      >
        {`df/du\ndu/dx`}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 150,
          right: 50,
          opacity: 0.15,
          fontSize: 40,
          fontFamily: "monospace",
          color: "#ef4444",
          lineHeight: 1.5,
        }}
      >
        {`∂L/∂w`}
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 100,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 15,
          textShadow: "0 4px 30px rgba(168, 85, 247, 0.8)",
          zIndex: 10,
        }}
      >
        연쇄법칙
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 42,
          color: "#fbbf24",
          fontWeight: "bold",
          marginBottom: 30,
          zIndex: 10,
        }}
      >
        Chain Rule
      </h2>

      {/* 체인 아이콘 그룹 */}
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* 외부 함수 */}
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
            fontSize: 22,
            fontFamily: "monospace",
            color: colors.white,
          }}
        >
          f(u)
        </div>

        <div style={{ fontSize: 40, color: "#a855f7" }}>⛓️</div>

        {/* 내부 함수 */}
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
            fontSize: 22,
            fontFamily: "monospace",
            color: colors.white,
          }}
        >
          u(x)
        </div>

        <div style={{ fontSize: 40, color: "#a855f7" }}>→</div>

        {/* 연쇄법칙 */}
        <div
          style={{
            width: 180,
            height: 100,
            borderRadius: 20,
            backgroundColor: "rgba(251, 191, 36, 0.3)",
            border: "3px solid #fbbf24",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontFamily: "monospace",
            color: colors.white,
            textAlign: "center",
          }}
        >
          df/dx =<br />df/du × du/dx
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
          { name: "합성함수", color: "#3b82f6" },
          { name: "연쇄법칙", color: "#22c55e" },
          { name: "역전파", color: "#ef4444" },
          { name: "딥러닝", color: "#fbbf24" },
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
          color: "#c4b5fd",
          fontSize: 22,
          fontFamily: "monospace",
        }}
      >
        Backpropagation = Chain Rule
      </div>
    </AbsoluteFill>
  );
};
