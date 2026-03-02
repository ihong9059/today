/**
 * Lesson 2-2 썸네일
 * 미분의 기초
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson2_2Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Level 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: "#a855f7",
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 25,
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Level 2 · 수학 기초
      </div>

      {/* Lesson 번호 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          backgroundColor: "rgba(255,255,255,0.2)",
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 25,
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Lesson 2-2
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 100,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 20,
          textShadow: "0 4px 30px rgba(168,85,247,0.8)",
          zIndex: 10,
        }}
      >
        미분의 기초
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 42,
          color: "#c084fc",
          fontWeight: "bold",
          marginBottom: 40,
          zIndex: 10,
        }}
      >
        Differentiation Basics
      </h2>

      {/* 배경 그래프 - 접선 */}
      <svg
        width={1280}
        height={720}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.3,
        }}
      >
        {/* 그리드 */}
        {Array.from({ length: 20 }, (_, i) => (
          <g key={i}>
            <line x1={i * 64} y1={0} x2={i * 64} y2={720} stroke="#6b7280" strokeWidth={1} />
            <line x1={0} y1={i * 36} x2={1280} y2={i * 36} stroke="#6b7280" strokeWidth={1} />
          </g>
        ))}
      </svg>

      {/* 곡선과 접선 */}
      <svg
        width={1280}
        height={720}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {/* 포물선 */}
        <path
          d="M 200 550 Q 450 150, 640 350 Q 830 550, 1080 200"
          stroke="#a855f7"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          filter="drop-shadow(0 0 20px rgba(168,85,247,0.8))"
        />

        {/* 접선 */}
        <line
          x1={450}
          y1={450}
          x2={830}
          y2={250}
          stroke="#22c55e"
          strokeWidth={6}
          strokeLinecap="round"
          filter="drop-shadow(0 0 15px rgba(34,197,94,0.8))"
        />

        {/* 접점 */}
        <circle
          cx={640}
          cy={350}
          r={15}
          fill="#fbbf24"
          filter="drop-shadow(0 0 10px rgba(251,191,36,0.8))"
        />
      </svg>

      {/* 핵심 키워드 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          display: "flex",
          gap: 25,
          zIndex: 10,
        }}
      >
        {[
          { name: "변화율", color: "#3b82f6" },
          { name: "접선 기울기", color: "#22c55e" },
          { name: "경사하강법", color: "#fbbf24" },
          { name: "AI 학습", color: "#ef4444" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "12px 24px",
              backgroundColor: `${item.color}40`,
              border: `2px solid ${item.color}`,
              borderRadius: 30,
              color: colors.white,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* 수식 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#fbbf24",
          fontSize: 24,
          fontFamily: "monospace",
        }}
      >
        <span>w = w - η × ∇L</span>
      </div>
    </AbsoluteFill>
  );
};
