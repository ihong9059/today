import React from "react";
import { AbsoluteFill } from "remotion";

const colors = {
  primary: "#f59e0b",
  secondary: "#d97706",
  accent: "#fbbf24",
  white: "#ffffff",
  gray: {
    100: "#f1f5f9",
    300: "#cbd5e1",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

export const Lesson1_2Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, #78350f 0%, ${colors.primary} 50%, #0f172a 100%)` }} />
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${colors.primary}50 0%, transparent 70%)` }} />
      <div style={{ position: "absolute", bottom: -150, left: -150, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${colors.accent}40 0%, transparent 70%)` }} />

      <div style={{ position: "absolute", top: 40, left: 50, display: "flex", alignItems: "center", gap: 15 }}>
        <div style={{ width: 60, height: 60, borderRadius: 15, background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px ${colors.primary}80` }}>
          <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>U</span>
        </div>
        <span style={{ fontSize: 40, fontWeight: "bold", color: colors.white, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>UTTEC-Lab</span>
      </div>

      <div style={{ position: "absolute", top: 40, right: 50, padding: "15px 40px", background: `linear-gradient(135deg, ${colors.gray[700]} 0%, ${colors.gray[800]} 100%)`, borderRadius: 20, border: `3px solid ${colors.primary}50`, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
        <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>Level 1-2</span>
      </div>

      <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", fontSize: 180, textShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>🧠</div>

      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, textAlign: "center" }}>
        <span style={{ fontSize: 90, fontWeight: "bold", color: colors.white, textShadow: `0 0 30px ${colors.primary}, 0 0 60px ${colors.primary}60, 0 4px 20px rgba(0,0,0,0.5)`, letterSpacing: 3 }}>
          뉴런에서 퍼셉트론으로
        </span>
      </div>

      <div style={{ position: "absolute", top: "68%", left: 0, right: 0, textAlign: "center" }}>
        <span style={{ fontSize: 48, color: colors.gray[100], textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
          생물학적 뉴런과 인공 뉴런
        </span>
      </div>

      <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 25 }}>
        {[
          { type: "뉴런", color: colors.primary },
          { type: "시냅스", color: colors.secondary },
          { type: "퍼셉트론", color: colors.accent },
          { type: "가중치", color: "#ef4444" },
        ].map((item, i) => (
          <div key={i} style={{ padding: "15px 35px", backgroundColor: `${item.color}40`, borderRadius: 15, border: `3px solid ${item.color}`, boxShadow: `0 4px 20px ${item.color}40` }}>
            <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>{item.type}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
