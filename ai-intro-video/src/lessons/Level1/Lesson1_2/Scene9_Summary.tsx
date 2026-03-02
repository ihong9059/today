/**
 * Lesson 1-2 Scene 9: 요약
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene9_Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const summaryItems = [
    {
      title: "생물학적 뉴런",
      points: ["수상돌기 → 세포체 → 축삭돌기", "임계값을 넘어야 발화!"],
      color: "#3b82f6",
      icon: "🧠",
    },
    {
      title: "맥컬록-피츠 뉴런",
      points: ["1943년, 최초의 인공 뉴런", "입력 합산 → 임계값 비교", "학습 불가"],
      color: "#f97316",
      icon: "🧪",
    },
    {
      title: "퍼셉트론",
      points: ["1958년, 로젠블랫", "가중치로 중요도 표현", "스스로 학습 가능!"],
      color: "#22c55e",
      icon: "🤖",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* 제목 */}
      <h2
        style={{
          fontSize: 52,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        📚 오늘 배운 내용 정리
      </h2>

      {/* 요약 카드들 */}
      <div style={{ display: "flex", gap: 40 }}>
        {summaryItems.map((item, i) => {
          const cardSpring = spring({ frame: frame - 20 - i * 20, fps, config: { damping: 12 } });
          return (
            <div
              key={i}
              style={{
                backgroundColor: `${item.color}15`,
                border: `3px solid ${item.color}`,
                borderRadius: 20,
                padding: "30px 35px",
                width: 350,
                transform: `scale(${cardSpring})`,
                opacity: cardSpring,
              }}
            >
              {/* 헤더 */}
              <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 25 }}>
                <span style={{ fontSize: 50 }}>{item.icon}</span>
                <div style={{ fontSize: 26, color: item.color, fontWeight: "bold" }}>
                  {item.title}
                </div>
              </div>

              {/* 포인트들 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                {item.points.map((point, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <span style={{ color: item.color, fontSize: 20 }}>✓</span>
                    <span style={{ fontSize: 20, color: colors.gray[200] }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 핵심 공식 */}
      <div
        style={{
          marginTop: 50,
          backgroundColor: `${colors.gray[800]}80`,
          borderRadius: 15,
          padding: "25px 50px",
          opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ fontSize: 22, color: colors.gray[400], marginBottom: 10, textAlign: "center" }}>
          핵심 발전 경로:
        </div>
        <div style={{ fontSize: 28, color: colors.white, display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ color: "#3b82f6" }}>🧠 생물학적 뉴런</span>
          <span style={{ color: colors.gray[500] }}>→</span>
          <span style={{ color: "#f97316" }}>🧪 맥컬록-피츠</span>
          <span style={{ color: colors.gray[500] }}>→</span>
          <span style={{ color: "#22c55e" }}>🤖 퍼셉트론</span>
          <span style={{ color: colors.gray[500] }}>→</span>
          <span style={{ color: "#8b5cf6" }}>🌟 딥러닝</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
