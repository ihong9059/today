import React from "react";
import { AbsoluteFill } from "remotion";

const colors = { primary: "#a855f7", secondary: "#7c3aed", accent: "#f59e0b", white: "#ffffff", gray: { 100: "#f1f5f9" } };

export const Lesson3_6Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, #4c1d95 0%, ${colors.primary} 50%, #7c3aed 100%)` }} />
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${colors.primary}50 0%, transparent 70%)` }} />
      <div style={{ position: "absolute", bottom: -150, left: -150, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${colors.secondary}40 0%, transparent 70%)` }} />
      <div style={{ position: "absolute", top: 40, left: 50, display: "flex", alignItems: "center", gap: 15 }}>
        <div style={{ width: 60, height: 60, borderRadius: 15, background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.gray[100]} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
          <span style={{ fontSize: 36, fontWeight: "bold", color: colors.primary }}>U</span>
        </div>
        <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>UTTEC-Lab</span>
      </div>
      <div style={{ position: "absolute", top: 40, right: 50, padding: "15px 35px", background: "rgba(255,255,255,0.2)", borderRadius: 15, border: "2px solid rgba(255,255,255,0.4)" }}>
        <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>Level 3-6</span>
      </div>
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", fontSize: 180, filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))" }}>🧹</div>
      <div style={{ position: "absolute", bottom: "22%", left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontSize: 85, fontWeight: "bold", color: colors.white, textShadow: `0 4px 30px rgba(0,0,0,0.4), 0 0 60px ${colors.primary}`, letterSpacing: 3 }}>BatchNorm</div>
        <div style={{ fontSize: 42, color: colors.gray[100], marginTop: 15, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>& Dropout</div>
      </div>
      <div style={{ position: "absolute", bottom: 50, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 20 }}>
        {["정규화", "안정화", "드롭아웃", "과적합방지"].map((tag, i) => (
          <div key={i} style={{ padding: "12px 25px", background: "rgba(255,255,255,0.15)", borderRadius: 25, border: "1px solid rgba(255,255,255,0.3)" }}>
            <span style={{ fontSize: 24, color: colors.white, fontWeight: 500 }}>{tag}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export default Lesson3_6Thumbnail;
