/**
 * Lesson 1-2 Scene 6: 퍼셉트론
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Perceptron: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const improvements = [
    { title: "가중치 추가", desc: "각 입력에 중요도 부여 (×2, ×1 등)", icon: "⚖️", color: "#3b82f6" },
    { title: "편향 추가", desc: "기본 성향 설정 가능", icon: "📊", color: "#22c55e" },
    { title: "스스로 학습", desc: "틀리면 고치고, 반복하면 점점 나아짐!", icon: "🎓", color: "#f97316" },
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
          marginBottom: 20,
          opacity: titleOpacity,
        }}
      >
        🚀 1958년: 퍼셉트론의 탄생!
      </h2>

      {/* 발명자 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          marginBottom: 40,
          opacity: interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 40 }}>👨‍🔬</span>
        <span style={{ fontSize: 28, color: colors.primary[300] }}>프랭크 로젠블랫 (Frank Rosenblatt)</span>
      </div>

      {/* 퍼셉트론 다이어그램 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 40,
          backgroundColor: `${colors.gray[800]}60`,
          borderRadius: 20,
          padding: "30px 50px",
          opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {/* 입력 + 가중치 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {[
            { x: "x₁", w: "w₁" },
            { x: "x₂", w: "w₂" },
            { x: "x₃", w: "w₃" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#3b82f630",
                  border: "2px solid #3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: "#3b82f6",
                }}
              >
                {item.x}
              </div>
              <span style={{ fontSize: 20, color: "#f97316" }}>× {item.w}</span>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 30, color: colors.gray[500] }}>→</div>

        {/* 합산 + 편향 */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: "#22c55e30",
              border: "3px solid #22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: 24, color: "#22c55e" }}>Σ + b</div>
          </div>
          <div style={{ fontSize: 14, color: colors.gray[400], marginTop: 5 }}>합산 + 편향</div>
        </div>

        <div style={{ fontSize: 30, color: colors.gray[500] }}>→</div>

        {/* 활성화 함수 */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              backgroundColor: "#8b5cf630",
              border: "3px solid #8b5cf6",
              borderRadius: 15,
              padding: "20px 25px",
            }}
          >
            <div style={{ fontSize: 20, color: "#8b5cf6" }}>f(x)</div>
          </div>
          <div style={{ fontSize: 14, color: colors.gray[400], marginTop: 5 }}>활성화</div>
        </div>

        <div style={{ fontSize: 30, color: colors.gray[500] }}>→</div>

        {/* 출력 */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#f9731630",
            border: "3px solid #f97316",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            color: "#f97316",
          }}
        >
          y
        </div>
      </div>

      {/* 개선점 카드 */}
      <div style={{ display: "flex", gap: 30 }}>
        {improvements.map((item, i) => {
          const cardSpring = spring({ frame: frame - 60 - i * 20, fps, config: { damping: 12 } });
          return (
            <div
              key={i}
              style={{
                backgroundColor: `${item.color}15`,
                border: `2px solid ${item.color}`,
                borderRadius: 16,
                padding: "25px 30px",
                width: 280,
                transform: `scale(${cardSpring})`,
                opacity: cardSpring,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 15 }}>
                <span style={{ fontSize: 36 }}>{item.icon}</span>
                <span style={{ fontSize: 24, color: item.color, fontWeight: "bold" }}>{item.title}</span>
              </div>
              <div style={{ fontSize: 18, color: colors.gray[300] }}>{item.desc}</div>
            </div>
          );
        })}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          backgroundColor: `${colors.primary[500]}20`,
          border: "2px solid ${colors.primary[400]}",
          borderRadius: 15,
          padding: "20px 50px",
          opacity: interpolate(frame, [140, 160], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 26, color: colors.primary[300] }}>
          ✨ 핵심: 퍼셉트론은 스스로 학습할 수 있다!
        </span>
      </div>
    </AbsoluteFill>
  );
};
