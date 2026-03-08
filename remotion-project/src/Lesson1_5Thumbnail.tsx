import React from "react";
import { AbsoluteFill } from "remotion";

const colors = {
  primary: "#f59e0b",
  secondary: "#d97706",
  accent: "#fbbf24",
  white: "#ffffff",
  gray: { 100: "#f1f5f9", 700: "#334155", 800: "#1e293b" },
};

export const Lesson1_5Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, #78350f 0%, ${colors.primary} 50%, #0f172a 100%)` }} />
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${colors.primary}50 0%, transparent 70%)` }} />

      <div style={{ position: "absolute", top: 40, left: 50, display: "flex", alignItems: "center", gap: 15 }}>
        <div style={{ width: 60, height: 60, borderRadius: 15, background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px ${colors.primary}80` }}>
          <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>U</span>
        </div>
        <span style={{ fontSize: 40, fontWeight: "bold", color: colors.white, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>UTTEC-Lab</span>
      </div>

      <div style={{ position: "absolute", top: 40, right: 50, padding: "15px 40px", background: `linear-gradient(135deg, ${colors.gray[700]} 0%, ${colors.gray[800]} 100%)`, borderRadius: 20, border: `3px solid ${colors.primary}50` }}>
        <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>Level 1-5</span>
      </div>

      <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", fontSize: 180 }}>🔌</div>

      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, textAlign: "center" }}>
        <span style={{ fontSize: 100, fontWeight: "bold", color: colors.white, textShadow: `0 0 30px ${colors.primary}, 0 4px 20px rgba(0,0,0,0.5)` }}>AND, OR, NOT 게이트</span>
      </div>

      <div style={{ position: "absolute", top: "68%", left: 0, right: 0, textAlign: "center" }}>
        <span style={{ fontSize: 48, color: colors.gray[100], textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>퍼셉트론으로 논리 게이트 구현</span>
      </div>

      <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 25 }}>
        {[
          { type: "AND", color: "#10b981" },
          { type: "OR", color: "#3b82f6" },
          { type: "NOT", color: "#ef4444" },
        ].map((item, i) => (
          <div key={i} style={{ padding: "15px 50px", backgroundColor: `${item.color}40`, borderRadius: 15, border: `3px solid ${item.color}` }}>
            <span style={{ fontSize: 40, color: colors.white, fontWeight: "bold", fontFamily: "monospace" }}>{item.type}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
