import React from "react";
import { AbsoluteFill } from "remotion";

const colors = {
  primary: "#8b5cf6", // purple for functions
  secondary: "#6366f1", // indigo
  accent: "#f59e0b",
  white: "#ffffff",
  gray: {
    800: "#1e293b",
    900: "#0f172a",
  },
};

export const Lesson0_4Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          padding: "20px 50px",
          backgroundColor: `${colors.gray[900]}dd`,
          borderRadius: 20,
          border: `3px solid ${colors.white}60`,
        }}
      >
        <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
          Level 0 - Lesson 4
        </span>
      </div>

      {/* 메인 타이틀 */}
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <div style={{ fontSize: 140, marginBottom: 30 }}>⚡</div>
        <div style={{ fontSize: 120, fontWeight: "bold", color: colors.white, marginBottom: 30 }}>
          함수
        </div>
        <div style={{ fontSize: 48, color: colors.white, opacity: 0.9 }}>
          AI의 핵심 빌딩 블록
        </div>
      </div>

      {/* 주요 내용 */}
      <div
        style={{
          display: "flex",
          gap: 50,
          marginTop: 40,
        }}
      >
        {[
          { icon: "🔵", text: "ReLU" },
          { icon: "🟠", text: "Sigmoid" },
          { icon: "📉", text: "손실 함수" },
          { icon: "🔧", text: "콜백" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "25px 45px",
              backgroundColor: `${colors.white}30`,
              borderRadius: 20,
              border: `3px solid ${colors.white}60`,
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 10 }}>{item.icon}</div>
            <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold", textAlign: "center" }}>
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 로고 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 12,
            background: `${colors.white}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 36, fontWeight: "bold", color: colors.primary }}>U</span>
        </div>
        <span style={{ fontSize: 38, fontWeight: "bold", color: colors.white }}>UTTEC-Lab</span>
      </div>

      {/* 하단 우측 - AI 첫걸음 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          fontSize: 36,
          color: colors.white,
          fontWeight: "bold",
        }}
      >
        AI 첫걸음
      </div>
    </AbsoluteFill>
  );
};
