/**
 * Lesson 0-6: Matplotlib 기초 - AI 학습 과정 시각화
 * 썸네일 컴포넌트 (1280x720)
 * 레벨 0 마지막 강의 - 특별 디자인
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../styles";

export const Lesson06Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 30%, #2d1f4e 70%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      {/* 레벨 0 완료 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          backgroundColor: "#22c55e",
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 30,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        🎉 Level 0 마지막!
      </div>

      {/* 레슨 번호 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: colors.primary[500],
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 30,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Lesson 0-6
      </div>

      {/* 메인 아이콘 */}
      <div style={{ fontSize: 120, marginBottom: 20 }}>📊</div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        Matplotlib 기초
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 42,
          color: "#f97316",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        AI 학습 과정 시각화
      </h2>

      {/* 핵심 키워드 */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { text: "plot()", color: "#22c55e" },
          { text: "scatter()", color: "#3b82f6" },
          { text: "학습 곡선", color: "#f97316" },
          { text: "subplot()", color: "#8b5cf6" },
          { text: "imshow()", color: "#ec4899" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              backgroundColor: `${item.color}30`,
              border: `2px solid ${item.color}`,
              borderRadius: 12,
              padding: "12px 25px",
              color: item.color,
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* 미니 그래프 시각화 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          display: "flex",
          gap: 20,
        }}
      >
        {/* Loss 그래프 */}
        <svg viewBox="0 0 100 60" style={{ width: 120, height: 70 }}>
          <rect x="0" y="0" width="100" height="60" fill={colors.gray[800]} rx="8" />
          <text x="50" y="12" textAnchor="middle" fontSize="8" fill="#ef4444">
            Loss
          </text>
          <polyline points="10,50 30,40 50,30 70,25 90,22" fill="none" stroke="#ef4444" strokeWidth="2" />
        </svg>

        {/* Accuracy 그래프 */}
        <svg viewBox="0 0 100 60" style={{ width: 120, height: 70 }}>
          <rect x="0" y="0" width="100" height="60" fill={colors.gray[800]} rx="8" />
          <text x="50" y="12" textAnchor="middle" fontSize="8" fill="#22c55e">
            Accuracy
          </text>
          <polyline points="10,50 30,40 50,30 70,22 90,18" fill="none" stroke="#22c55e" strokeWidth="2" />
        </svg>
      </div>

      {/* 시리즈 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          color: colors.gray[400],
          fontSize: 22,
        }}
      >
        AI 기초 교육 시리즈
      </div>
    </AbsoluteFill>
  );
};
