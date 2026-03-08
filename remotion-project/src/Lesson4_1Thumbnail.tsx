import React from "react";
import { AbsoluteFill } from "remotion";

const colors = {
  primary: "#f97316",
  secondary: "#ea580c",
  accent: "#fbbf24",
  white: "#ffffff",
  dark: "#1c1917",
};

export const Lesson4_1Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #7c2d12 50%, ${colors.secondary} 100%)` }}>
      {/* UTTEC-Lab Logo */}
      <div style={{ position: "absolute", top: 40, left: 50, display: "flex", alignItems: "center", gap: 15 }}>
        <div style={{ width: 60, height: 60, borderRadius: 15, background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px ${colors.primary}60` }}>
          <span style={{ fontSize: 34, fontWeight: "bold", color: colors.white }}>U</span>
        </div>
        <span style={{ fontSize: 38, fontWeight: "bold", color: colors.white, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>UTTEC-Lab</span>
      </div>

      {/* Level Badge */}
      <div style={{ position: "absolute", top: 40, right: 50, padding: "15px 35px", background: `${colors.primary}`, borderRadius: 50, boxShadow: `0 4px 20px ${colors.primary}60` }}>
        <span style={{ fontSize: 32, fontWeight: "bold", color: colors.white }}>Level 4-1</span>
      </div>

      {/* Main Icon */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)", textAlign: "center" }}>
        <div style={{ fontSize: 200, marginBottom: 30, filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))" }}>🚀</div>
      </div>

      {/* Title */}
      <div style={{ position: "absolute", bottom: 280, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h1 style={{ fontSize: 100, fontWeight: "bold", color: colors.white, textShadow: "0 4px 20px rgba(0,0,0,0.5)", margin: 0 }}>
          MNIST 손글씨 분류
        </h1>
      </div>

      {/* Subtitle */}
      <div style={{ position: "absolute", bottom: 200, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <p style={{ fontSize: 44, color: colors.accent, fontWeight: "600", margin: 0 }}>
          첫 번째 완전한 딥러닝 프로젝트
        </p>
      </div>

      {/* Keywords */}
      <div style={{ position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 20 }}>
        {["PyTorch", "MLP", "98%+", "5단계 학습"].map((keyword, i) => (
          <div key={i} style={{ padding: "12px 28px", background: "rgba(255,255,255,0.15)", borderRadius: 30, border: `2px solid ${colors.accent}80` }}>
            <span style={{ fontSize: 26, color: colors.white, fontWeight: "500" }}>{keyword}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export default Lesson4_1Thumbnail;
