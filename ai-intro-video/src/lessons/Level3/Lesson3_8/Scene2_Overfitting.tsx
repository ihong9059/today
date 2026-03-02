/**
 * Scene 2: 과적합이란?
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_Overfitting: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const underOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const goodOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const overOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const goalOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-8/scene2.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 35,
          opacity: titleOpacity,
        }}
      >
        과적합 vs 적합 vs 과소적합
      </h1>

      {/* 세 가지 케이스 */}
      <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
        {/* Underfitting */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 25,
            borderRadius: 16,
            textAlign: "center",
            width: 280,
            opacity: underOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: "#60a5fa20",
              border: "2px solid #60a5fa",
              borderRadius: 12,
              height: 150,
              marginBottom: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 단순 직선 */}
            <svg width="200" height="120" viewBox="0 0 200 120">
              <circle cx="30" cy="90" r="6" fill="#60a5fa" />
              <circle cx="60" cy="50" r="6" fill="#60a5fa" />
              <circle cx="90" cy="70" r="6" fill="#60a5fa" />
              <circle cx="120" cy="40" r="6" fill="#60a5fa" />
              <circle cx="150" cy="60" r="6" fill="#60a5fa" />
              <circle cx="180" cy="30" r="6" fill="#60a5fa" />
              <line x1="20" y1="85" x2="190" y2="35" stroke="#f87171" strokeWidth="3" />
            </svg>
          </div>
          <div style={{ color: "#60a5fa", fontSize: 24, fontWeight: "bold" }}>
            Underfitting
          </div>
          <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 10 }}>
            너무 단순함
          </div>
        </div>

        {/* Good Fit */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 25,
            borderRadius: 16,
            textAlign: "center",
            width: 280,
            border: "3px solid #22c55e",
            opacity: goodOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: "#22c55e20",
              borderRadius: 12,
              height: 150,
              marginBottom: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 적절한 곡선 */}
            <svg width="200" height="120" viewBox="0 0 200 120">
              <circle cx="30" cy="90" r="6" fill="#22c55e" />
              <circle cx="60" cy="50" r="6" fill="#22c55e" />
              <circle cx="90" cy="70" r="6" fill="#22c55e" />
              <circle cx="120" cy="40" r="6" fill="#22c55e" />
              <circle cx="150" cy="60" r="6" fill="#22c55e" />
              <circle cx="180" cy="30" r="6" fill="#22c55e" />
              <path d="M 20 95 Q 60 40, 100 60 Q 140 30, 190 25" fill="none" stroke="#22c55e" strokeWidth="3" />
            </svg>
          </div>
          <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold" }}>
            Good Fit
          </div>
          <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 10 }}>
            일반화 성공!
          </div>
        </div>

        {/* Overfitting */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 25,
            borderRadius: 16,
            textAlign: "center",
            width: 280,
            opacity: overOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: "#f8717120",
              border: "2px solid #f87171",
              borderRadius: 12,
              height: 150,
              marginBottom: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 복잡한 곡선 */}
            <svg width="200" height="120" viewBox="0 0 200 120">
              <circle cx="30" cy="90" r="6" fill="#f87171" />
              <circle cx="60" cy="50" r="6" fill="#f87171" />
              <circle cx="90" cy="70" r="6" fill="#f87171" />
              <circle cx="120" cy="40" r="6" fill="#f87171" />
              <circle cx="150" cy="60" r="6" fill="#f87171" />
              <circle cx="180" cy="30" r="6" fill="#f87171" />
              <path d="M 20 90 Q 35 60, 30 90 L 45 30 Q 55 80, 60 50 L 75 100 Q 85 40, 90 70 L 105 20 Q 115 60, 120 40 L 135 90 Q 145 30, 150 60 L 165 15 Q 175 50, 180 30 L 190 80" fill="none" stroke="#f87171" strokeWidth="3" />
            </svg>
          </div>
          <div style={{ color: "#f87171", fontSize: 24, fontWeight: "bold" }}>
            Overfitting
          </div>
          <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 10 }}>
            노이즈까지 학습
          </div>
        </div>
      </div>

      {/* 목표 */}
      <div
        style={{
          backgroundColor: "#fbbf2420",
          border: "2px solid #fbbf24",
          padding: 20,
          borderRadius: 16,
          textAlign: "center",
          marginTop: 30,
          opacity: goalOpacity,
        }}
      >
        <span style={{ color: "#fbbf24", fontSize: 26, fontWeight: "bold" }}>
          우리의 목표: 일반화 (Generalization) - 새로운 데이터에도 잘 작동!
        </span>
      </div>
    </AbsoluteFill>
  );
};
