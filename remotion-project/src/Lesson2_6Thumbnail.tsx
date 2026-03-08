import React from "react";
import { AbsoluteFill } from "remotion";

// ============ COLORS ============
const colors = {
  primary: "#10b981", // Green for Level 2
  secondary: "#059669",
  accent: "#f59e0b",
  math: "#8b5cf6",
  white: "#ffffff",
  gray: {
    100: "#f1f5f9",
    300: "#cbd5e1",
    800: "#1e293b",
    900: "#0f172a",
  },
};

export const Lesson2_6Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #065f46 0%, ${colors.primary} 50%, ${colors.gray[900]} 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 배경 장식 */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)`,
          top: -100,
          right: -100,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.math}30 0%, transparent 70%)`,
          bottom: -100,
          left: -100,
          filter: "blur(50px)",
        }}
      />

      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 60,
          padding: "18px 45px",
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          borderRadius: 25,
          border: `3px solid ${colors.white}40`,
          boxShadow: `0 8px 30px ${colors.primary}60`,
        }}
      >
        <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>Level 2-6</span>
      </div>

      {/* UTTEC-Lab 로고 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          right: 60,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 15,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 20px ${colors.primary}60`,
          }}
        >
          <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>U</span>
        </div>
        <span
          style={{
            fontSize: 38,
            fontWeight: "bold",
            color: colors.white,
            textShadow: `0 2px 15px rgba(0,0,0,0.5)`,
          }}
        >
          UTTEC-Lab
        </span>
      </div>

      {/* 메인 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 25 }}>
          <span style={{ fontSize: 140 }}>🎲</span>
        </div>
        <div>
          <span
            style={{
              fontSize: 110,
              fontWeight: "bold",
              color: colors.white,
              textShadow: `0 0 40px ${colors.primary}, 0 0 80px ${colors.primary}60`,
              letterSpacing: 3,
            }}
          >
            확률의 기초
          </span>
        </div>
      </div>

      {/* 핵심 개념 아이콘들 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {[
          { icon: "🎲", label: "확률" },
          { icon: "🔀", label: "조건부" },
          { icon: "📊", label: "베이즈" },
          { icon: "🤖", label: "AI 예측" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "25px 40px",
              backgroundColor: `${colors.gray[800]}ee`,
              borderRadius: 20,
              border: `3px solid ${colors.primary}80`,
              boxShadow: `0 8px 30px rgba(0,0,0,0.4)`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 55, marginBottom: 10 }}>{item.icon}</div>
            <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* 하단 서브타이틀 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 34, color: colors.gray[300] }}>
          AI의 불확실성 다루기
        </span>
      </div>
    </AbsoluteFill>
  );
};
