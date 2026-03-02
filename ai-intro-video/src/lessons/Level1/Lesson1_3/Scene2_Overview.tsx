/**
 * Scene 2: 퍼셉트론 전체 구조 - 의사결정 기계 비유
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene2_Overview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 의사결정 단계 표시
  const stepReveal = (index: number) => {
    const startFrame = 90 + index * 90;
    return interpolate(frame, [startFrame, startFrame + 45], [0, 1], { extrapolateRight: "clamp" });
  };

  const steps = [
    {
      title: "1. 정보 수집",
      icon: "📊",
      items: ["비 올 확률 70%", "구름 많음", "앱 예보: 비"],
      color: "#3b82f6",
    },
    {
      title: "2. 중요도 판단",
      icon: "⚖️",
      items: ["비 확률 × 2.0", "구름 × 1.0", "앱 예보 × 1.5"],
      color: "#f97316",
    },
    {
      title: "3. 기본 성향",
      icon: "💭",
      items: ["조심성 많음", "+0.5 추가"],
      color: "#8b5cf6",
    },
    {
      title: "4. 최종 결정",
      icon: "✅",
      items: ["우산 가져간다!"],
      color: "#22c55e",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* 타이틀 */}
      <div
        style={{
          opacity: titleOpacity,
          marginBottom: 30,
        }}
      >
        <h2
          style={{
            fontSize: 60,
            color: colors.white,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          퍼셉트론 = 의사결정 기계
        </h2>
        <p
          style={{
            fontSize: 32,
            color: colors.primary[300],
            textAlign: "center",
          }}
        >
          "오늘 우산을 가져갈까?" 예시로 이해하기
        </p>
      </div>

      {/* 의사결정 과정 */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginTop: 40,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              opacity: stepReveal(i),
              transform: `translateY(${interpolate(stepReveal(i), [0, 1], [30, 0])}px)`,
              backgroundColor: `${step.color}15`,
              border: `2px solid ${step.color}`,
              borderRadius: 20,
              padding: 30,
              width: 280,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 50, marginBottom: 15 }}>{step.icon}</span>
            <h3
              style={{
                fontSize: 26,
                color: step.color,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              {step.title}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {step.items.map((item, j) => (
                <div
                  key={j}
                  style={{
                    fontSize: 22,
                    color: colors.gray[300],
                    textAlign: "center",
                    padding: "8px 15px",
                    backgroundColor: `${step.color}20`,
                    borderRadius: 8,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 화살표 연결 */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 250,
          opacity: interpolate(frame, [450, 480], [0, 0.5], { extrapolateRight: "clamp" }),
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              fontSize: 50,
              color: colors.gray[500],
            }}
          >
            →
          </span>
        ))}
      </div>

      {/* 하단 메시지 */}
      {frame > 500 && (
        <p
          style={{
            position: "absolute",
            bottom: 60,
            fontSize: 36,
            color: colors.primary[400],
            fontWeight: "bold",
            opacity: interpolate(frame, [500, 540], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          이것이 바로 퍼셉트론의 처리 과정입니다!
        </p>
      )}
    </AbsoluteFill>
  );
};
