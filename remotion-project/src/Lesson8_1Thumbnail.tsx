import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

const COLORS = {
  primary: "#f43f5e",
  secondary: "#e11d48",
  accent: "#be123c",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #be123c 100%)",
};

export const Lesson8_1Thumbnail: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 12, zIndex: 100 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 50, height: 50, borderRadius: 8 }} />
      <span style={{ color: COLORS.light, fontSize: 24, fontWeight: 700 }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, right: 40, color: "rgba(255,255,255,0.6)", fontSize: 20, zIndex: 100 }}>
      ai.uttec-lab.com
    </div>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 180, marginBottom: 20 }}>🖥️</div>
      <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>GPU와 병렬 컴퓨팅</div>
      <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>딥러닝 가속의 핵심</div>
      <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
        Level 8-1
      </div>
    </div>
  </AbsoluteFill>
);
