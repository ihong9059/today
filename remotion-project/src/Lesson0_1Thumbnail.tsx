import React from "react";
import {
  AbsoluteFill,
  staticFile,
} from "remotion";

// ============ COLORS ============
const colors = {
  bg: {
    dark: "#0f172a",
  },
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  accent: "#f59e0b",
  python: "#3776ab",
  white: "#ffffff",
  gray: {
    100: "#f1f5f9",
    300: "#cbd5e1",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

// ============ THUMBNAIL COMPONENT ============
export const Lesson0_1Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1e3a8a 0%, ${colors.python} 50%, #0f172a 100%)`,
      }}
    >
      {/* 배경 장식 원 */}
      <div
        style={{
          position: "absolute",
          right: -100,
          top: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -150,
          bottom: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.secondary}30 0%, transparent 70%)`,
        }}
      />

      {/* UTTEC-Lab 로고 (좌상단) */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 50,
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
            fontSize: 36,
            fontWeight: "bold",
            color: colors.white,
            textShadow: `0 2px 10px rgba(0,0,0,0.5)`,
          }}
        >
          UTTEC-Lab
        </span>
      </div>

      {/* 레벨 배지 (우상단) */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 50,
          padding: "15px 35px",
          background: `linear-gradient(135deg, ${colors.gray[700]} 0%, ${colors.gray[800]} 100%)`,
          borderRadius: 20,
          border: `3px solid ${colors.gray[700]}`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
        }}
      >
        <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>Level 0-1</span>
      </div>

      {/* 메인 아이콘 */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <span style={{ fontSize: 200 }}>🐍</span>
      </div>

      {/* 메인 타이틀 */}
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: "bold",
            color: colors.white,
            textShadow: `0 0 30px ${colors.primary}, 0 0 60px ${colors.primary}60, 0 4px 20px rgba(0,0,0,0.5)`,
            letterSpacing: 5,
          }}
        >
          Python 환경설정
        </div>
      </div>

      {/* 서브 타이틀 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 50px",
            backgroundColor: `${colors.gray[900]}dd`,
            borderRadius: 25,
            border: `3px solid ${colors.accent}`,
            boxShadow: `0 0 30px ${colors.accent}40`,
          }}
        >
          <span style={{ fontSize: 48, color: colors.accent, fontWeight: "bold" }}>
            설치부터 가상환경까지 한번에!
          </span>
        </div>
      </div>

      {/* 하단 URL */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 28, color: colors.gray[300] }}>
          uttec-ai.duckdns.org
        </span>
      </div>
    </AbsoluteFill>
  );
};
