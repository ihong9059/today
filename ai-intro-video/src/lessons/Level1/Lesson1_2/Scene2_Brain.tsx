/**
 * Lesson 1-2 Scene 2: 뇌의 규모
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene2_Brain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const stats = [
    { label: "뉴런 개수", value: "860억 개", subtext: "86,000,000,000", icon: "🧠", color: "#3b82f6" },
    { label: "시냅스 (연결)", value: "100조 개", subtext: "100,000,000,000,000", icon: "🔗", color: "#22c55e" },
  ];

  const comparison = [
    { label: "은하수 별 개수", value: "1,000억~4,000억 개", icon: "⭐" },
    { label: "뇌 시냅스 수", value: "그보다 250배 이상!", icon: "🧠" },
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
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        🧠 우리 뇌의 놀라운 규모
      </h2>

      {/* 통계 카드 */}
      <div style={{ display: "flex", gap: 60, marginBottom: 60 }}>
        {stats.map((stat, i) => {
          const cardSpring = spring({ frame: frame - 20 - i * 20, fps, config: { damping: 12 } });
          return (
            <div
              key={i}
              style={{
                backgroundColor: `${stat.color}20`,
                border: `3px solid ${stat.color}`,
                borderRadius: 20,
                padding: "40px 60px",
                textAlign: "center",
                transform: `scale(${cardSpring})`,
                opacity: cardSpring,
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 15 }}>{stat.icon}</div>
              <div style={{ fontSize: 24, color: colors.gray[400], marginBottom: 10 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 48, color: stat.color, fontWeight: "bold", marginBottom: 10 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 18, color: colors.gray[500], fontFamily: "monospace" }}>
                {stat.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* 비교 섹션 */}
      <div
        style={{
          backgroundColor: `${colors.gray[800]}80`,
          borderRadius: 20,
          padding: "40px 80px",
          opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <h3 style={{ fontSize: 28, color: colors.primary[300], marginBottom: 30, textAlign: "center" }}>
          비교해보면...
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {comparison.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: interpolate(frame, [100 + i * 20, 120 + i * 20], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <span style={{ fontSize: 40 }}>{item.icon}</span>
              <span style={{ fontSize: 24, color: colors.gray[300] }}>{item.label}:</span>
              <span style={{ fontSize: 28, color: i === 1 ? "#f97316" : colors.white, fontWeight: "bold" }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 결론 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          fontSize: 28,
          color: colors.primary[300],
          fontWeight: "500",
          opacity: interpolate(frame, [140, 160], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        "우주보다 복잡한 것이 바로 우리 머릿속에!"
      </div>
    </AbsoluteFill>
  );
};
