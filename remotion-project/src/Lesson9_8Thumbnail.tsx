import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

const COLORS = {
  primary: "#f59e0b",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
};

export const Lesson9_8Thumbnail: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 12 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 50, height: 50, borderRadius: 8 }} />
      <span style={{ color: COLORS.light, fontSize: 24, fontWeight: 700 }}>UTTEC-Lab</span>
    </div>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 200, marginBottom: 20 }}>🏆</div>
      <div style={{ fontSize: 80, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>최종 회고</div>
      <div style={{ fontSize: 44, color: "rgba(255,255,255,0.9)" }}>AI 첫걸음 완료</div>
      <div style={{ marginTop: 40, padding: "15px 50px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 36, color: COLORS.light, display: "inline-block" }}>
        Level 9-8
      </div>
    </div>
  </AbsoluteFill>
);
