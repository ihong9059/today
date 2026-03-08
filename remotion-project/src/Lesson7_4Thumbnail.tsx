import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

const COLORS = {
  primary: "#8b5cf6",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
};

export const Lesson7_4Thumbnail: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.2) 0%, transparent 40%)" }} />
    <div style={{ position: "absolute", top: 40, left: 50, display: "flex", alignItems: "center", gap: 15 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 60, height: 60, borderRadius: 10 }} />
      <span style={{ color: COLORS.light, fontSize: 32, fontWeight: 700, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", top: 40, right: 50, background: "rgba(0,0,0,0.3)", padding: "12px 30px", borderRadius: 50, fontSize: 28, color: COLORS.light, fontWeight: 600 }}>Level 7-4</div>
    <div style={{ textAlign: "center", zIndex: 10 }}>
      <div style={{ fontSize: 180, marginBottom: 20, filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))" }}>📍</div>
      <div style={{ fontSize: 100, fontWeight: 800, color: COLORS.light, textShadow: "0 6px 30px rgba(0,0,0,0.4)", marginBottom: 20 }}>Positional Encoding</div>
      <div style={{ fontSize: 48, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>위치 정보 부여</div>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 40 }}>
        {["Position", "Sinusoidal", "순서"].map((keyword) => (
          <div key={keyword} style={{ background: "rgba(255,255,255,0.2)", padding: "15px 35px", borderRadius: 50, fontSize: 32, color: COLORS.light, fontWeight: 600, backdropFilter: "blur(10px)" }}>{keyword}</div>
        ))}
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 40, right: 50, fontSize: 28, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>ai.uttec-lab.com</div>
  </AbsoluteFill>
);
