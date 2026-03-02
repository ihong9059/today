/**
 * Lesson 1-2 Scene 8: 인공 뉴런의 역사
 */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

export const Scene8_History: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const timeline = [
    {
      year: "1943",
      title: "맥컬록-피츠 뉴런",
      items: ["최초의 인공 뉴런 모델", "입력 합산 → 임계값 비교", "학습 기능 없음"],
      color: "#3b82f6",
      icon: "🧪",
    },
    {
      year: "1958",
      title: "퍼셉트론",
      items: ["가중치 & 편향 추가", "자동 학습 가능!", "AI 황금기의 시작"],
      color: "#22c55e",
      icon: "🚀",
    },
    {
      year: "현재",
      title: "딥러닝",
      items: ["수백만 개 퍼셉트론 연결", "ChatGPT, 이미지 인식", "AI 혁명 시대"],
      color: "#f97316",
      icon: "🌟",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #0f172a 0%, #1e293b 100%)`,
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
          marginBottom: 60,
          opacity: titleOpacity,
        }}
      >
        📜 인공 뉴런의 역사
      </h2>

      {/* 타임라인 */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 40, position: "relative" }}>
        {/* 연결선 */}
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 150,
            right: 150,
            height: 4,
            backgroundColor: colors.gray[700],
            opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
          }}
        />

        {timeline.map((item, i) => {
          const cardOpacity = interpolate(
            frame,
            [30 + i * 30, 50 + i * 30],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 320,
                opacity: cardOpacity,
                transform: `translateY(${interpolate(cardOpacity, [0, 1], [30, 0])}px)`,
              }}
            >
              {/* 연도 */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                  marginBottom: 20,
                  boxShadow: `0 0 30px ${item.color}50`,
                }}
              >
                {item.icon}
              </div>

              <div
                style={{
                  fontSize: 28,
                  color: item.color,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                {item.year}
              </div>

              <div
                style={{
                  fontSize: 24,
                  color: colors.white,
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                {item.title}
              </div>

              {/* 특징 카드 */}
              <div
                style={{
                  backgroundColor: `${item.color}15`,
                  border: `2px solid ${item.color}`,
                  borderRadius: 15,
                  padding: "20px 25px",
                  width: "100%",
                }}
              >
                {item.items.map((text, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: j < item.items.length - 1 ? 12 : 0,
                    }}
                  >
                    <span style={{ color: item.color }}>•</span>
                    <span style={{ fontSize: 18, color: colors.gray[300] }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 결론 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontSize: 26,
          color: colors.primary[300],
          fontWeight: "500",
          opacity: interpolate(frame, [140, 160], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        🔑 퍼셉트론 하나가 이 모든 것의 시작이었습니다!
      </div>
    </AbsoluteFill>
  );
};
