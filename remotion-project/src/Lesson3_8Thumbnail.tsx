import React from "react";
import { AbsoluteFill } from "remotion";

const colors = {
  primary: "#a855f7",
  secondary: "#7c3aed",
  accent: "#f59e0b",
  white: "#ffffff",
  dark: "#1e1b4b",
};

export const Lesson3_8Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 50%, ${colors.primary} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* UTTEC-Lab Logo */}
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
            background: `linear-gradient(135deg, ${colors.white} 0%, #f1f5f9 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <span style={{ fontSize: 36, fontWeight: "bold", color: colors.primary }}>U</span>
        </div>
        <span
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: colors.white,
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          UTTEC-Lab
        </span>
      </div>

      {/* Level Badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 50,
          padding: "12px 30px",
          background: "rgba(168, 85, 247, 0.3)",
          borderRadius: 25,
          border: `3px solid ${colors.primary}`,
        }}
      >
        <span style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>
          Level 3-8
        </span>
      </div>

      {/* Main Icon */}
      <div style={{ fontSize: 180, marginBottom: 30 }}>🎯</div>

      {/* Title */}
      <h1
        style={{
          fontSize: 90,
          fontWeight: "bold",
          color: colors.white,
          textAlign: "center",
          marginBottom: 20,
          textShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        Level 3 종합 실습
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 42,
          color: "#e2e8f0",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        딥러닝 핵심 총정리
      </p>

      {/* Summary Items */}
      <div style={{ display: "flex", gap: 25, marginTop: 10 }}>
        {[
          { icon: "📉", text: "손실함수" },
          { icon: "⬇️", text: "경사하강" },
          { icon: "🔄", text: "역전파" },
          { icon: "⚡", text: "최적화" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "18px 28px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: 15,
              border: `2px solid ${colors.accent}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 36 }}>{item.icon}</span>
            <span style={{ fontSize: 26, color: colors.white, fontWeight: 600 }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Complete Badge */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          padding: "15px 40px",
          background: `linear-gradient(135deg, ${colors.accent} 0%, #d97706 100%)`,
          borderRadius: 30,
          boxShadow: "0 4px 20px rgba(245, 158, 11, 0.4)",
        }}
      >
        <span style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>
          🎉 Level 3 완료!
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default Lesson3_8Thumbnail;
