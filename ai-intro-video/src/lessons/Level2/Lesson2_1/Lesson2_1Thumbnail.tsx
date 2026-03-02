/**
 * Lesson 2-1 썸네일
 * 함수와 그래프
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson2_1Thumbnail: React.FC = () => {
  // 시그모이드 그래프 경로 생성
  const generateSigmoidPath = () => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * 8 - 4; // -4 to 4
      const x = 640 + t * 70;
      const sigmoid = 1 / (1 + Math.exp(-t));
      const y = 450 - sigmoid * 200;
      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }
    return points.join(' ');
  };

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
        Lesson 2-1
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
        함수와 그래프
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
        Functions & Graphs
      </h2>

      {/* 배경 그래프 */}
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

      {/* 시그모이드 곡선 */}
      <svg
        width={1280}
        height={720}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <path
          d={generateSigmoidPath()}
          stroke="#a855f7"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          filter="drop-shadow(0 0 20px rgba(168,85,247,0.8))"
        />
      </svg>

      {/* 함수 목록 */}
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
          { name: "1차 함수", color: "#3b82f6" },
          { name: "2차 함수", color: "#a855f7" },
          { name: "지수 함수", color: "#fbbf24" },
          { name: "시그모이드", color: "#2dd4bf" },
          { name: "ReLU", color: "#f97316" },
        ].map((func, i) => (
          <div
            key={i}
            style={{
              padding: "12px 24px",
              backgroundColor: `${func.color}40`,
              border: `2px solid ${func.color}`,
              borderRadius: 30,
              color: colors.white,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {func.name}
          </div>
        ))}
      </div>

      {/* AI 연결 아이콘 */}
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
        }}
      >
        <span>🤖</span>
        <span>AI 필수 수학</span>
      </div>
    </AbsoluteFill>
  );
};
