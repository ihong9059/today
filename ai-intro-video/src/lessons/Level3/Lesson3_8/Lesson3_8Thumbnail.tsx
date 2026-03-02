/**
 * Lesson 3-8: 과적합과 정규화 - 썸네일
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson3_8Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          backgroundColor: colors.level[3],
          padding: "12px 24px",
          borderRadius: 12,
          fontSize: 24,
          fontWeight: "bold",
          color: colors.white,
        }}
      >
        Level 3-8
      </div>

      {/* 메인 타이틀 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        과적합과 정규화
      </h1>

      {/* 시각화: 과적합 vs 정규화 */}
      <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
        {/* 과적합 */}
        <div style={{ textAlign: "center" }}>
          <svg width="200" height="150" viewBox="0 0 200 150">
            {/* 복잡한 곡선 (과적합) */}
            <path
              d="M 20 120 Q 40 30, 60 100 Q 80 150, 100 50 Q 120 -20, 140 80 Q 160 120, 180 40"
              fill="none"
              stroke="#f87171"
              strokeWidth="4"
            />
            {/* 데이터 포인트 */}
            <circle cx="40" cy="60" r="8" fill="#f87171" />
            <circle cx="70" cy="90" r="8" fill="#f87171" />
            <circle cx="100" cy="50" r="8" fill="#f87171" />
            <circle cx="130" cy="70" r="8" fill="#f87171" />
            <circle cx="160" cy="55" r="8" fill="#f87171" />
          </svg>
          <div style={{ color: "#f87171", fontSize: 28, fontWeight: "bold", marginTop: 10 }}>
            과적합 ❌
          </div>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 60, color: colors.white }}>→</div>

        {/* 정규화 */}
        <div style={{ textAlign: "center" }}>
          <svg width="200" height="150" viewBox="0 0 200 150">
            {/* 적절한 곡선 */}
            <path
              d="M 20 100 Q 100 40, 180 80"
              fill="none"
              stroke="#22c55e"
              strokeWidth="4"
            />
            {/* 데이터 포인트 */}
            <circle cx="40" cy="90" r="8" fill="#22c55e" />
            <circle cx="70" cy="70" r="8" fill="#22c55e" />
            <circle cx="100" cy="55" r="8" fill="#22c55e" />
            <circle cx="130" cy="65" r="8" fill="#22c55e" />
            <circle cx="160" cy="75" r="8" fill="#22c55e" />
          </svg>
          <div style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold", marginTop: 10 }}>
            일반화 ✓
          </div>
        </div>
      </div>

      {/* 키워드 */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 40,
        }}
      >
        {["Early Stopping", "L2 정규화", "Dropout"].map((keyword, index) => (
          <div
            key={index}
            style={{
              backgroundColor: colors.gray[800],
              padding: "10px 20px",
              borderRadius: 20,
              color: colors.white,
              fontSize: 22,
              border: `2px solid ${["#fbbf24", "#60a5fa", "#a855f7"][index]}`,
            }}
          >
            {keyword}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
