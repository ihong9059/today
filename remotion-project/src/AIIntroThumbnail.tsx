import React from "react";
import { AbsoluteFill } from "remotion";

const colors = {
  primary: "#8b5cf6",
  secondary: "#3b82f6",
  accent: "#f59e0b",
  success: "#10b981",
  white: "#ffffff",
  gray: {
    100: "#f1f5f9",
    300: "#cbd5e1",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

export const AIIntroThumbnail: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 배경 그라데이션 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, #1e1b4b 0%, ${colors.primary} 50%, #0f172a 100%)`,
        }}
      />

      {/* 장식용 원들 */}
      <div
        style={{
          position: "absolute",
          top: -150,
          right: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.primary}50 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.secondary}40 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accent}30 0%, transparent 70%)`,
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
            boxShadow: `0 4px 20px ${colors.primary}80`,
          }}
        >
          <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>U</span>
        </div>
        <span
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: colors.white,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          UTTEC-Lab
        </span>
      </div>

      {/* 무료 배지 (우상단) */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 50,
          padding: "15px 40px",
          background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`,
          borderRadius: 20,
          border: `3px solid ${colors.white}50`,
          boxShadow: "0 4px 20px rgba(16,185,129,0.5)",
        }}
      >
        <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>100% 무료</span>
      </div>

      {/* 메인 아이콘 */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 160,
          textShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        🚀
      </div>

      {/* 메인 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 130,
            fontWeight: "bold",
            color: colors.white,
            textShadow: `0 0 30px ${colors.primary}, 0 0 60px ${colors.primary}60, 0 4px 20px rgba(0,0,0,0.5)`,
            letterSpacing: 5,
          }}
        >
          AI 첫걸음
        </span>
      </div>

      {/* 서브타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "62%",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 52,
            color: colors.accent,
            fontWeight: "bold",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          AI를 시작하는 가장 쉬운 방법
        </span>
      </div>

      {/* Level 배지들 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {[
          { level: "Level 0-2", label: "Python 기초", color: colors.secondary },
          { level: "Level 3-5", label: "ML/DL 입문", color: colors.primary },
          { level: "Level 6-8", label: "실전 프로젝트", color: colors.accent },
          { level: "Level 9", label: "최종 프로젝트", color: colors.success },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "12px 25px",
              backgroundColor: `${item.color}30`,
              borderRadius: 15,
              border: `3px solid ${item.color}`,
              boxShadow: `0 4px 20px ${item.color}40`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>
              {item.level}
            </span>
            <span style={{ fontSize: 18, color: colors.gray[300] }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
