/**
 * Scene 9: 정리 - 퍼셉트론 구조 요약
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene9_Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const componentReveal = (index: number) => {
    const startFrame = 60 + index * 75;
    return interpolate(frame, [startFrame, startFrame + 45], [0, 1], { extrapolateRight: "clamp" });
  };

  const formulaReveal = interpolate(frame, [400, 450], [0, 1], { extrapolateRight: "clamp" });
  const learningReveal = interpolate(frame, [520, 570], [0, 1], { extrapolateRight: "clamp" });

  const components = [
    {
      icon: "📥",
      name: "입력 (x)",
      desc: "외부에서 들어오는 데이터",
      learns: false,
      color: "#3b82f6",
    },
    {
      icon: "⚖️",
      name: "가중치 (w)",
      desc: "입력의 중요도",
      learns: true,
      color: "#f97316",
    },
    {
      icon: "➕",
      name: "편향 (b)",
      desc: "기본 성향 / 기준점",
      learns: true,
      color: "#8b5cf6",
    },
    {
      icon: "⚡",
      name: "활성화 함수 (f)",
      desc: "최종 판단 함수",
      learns: false,
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
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 60 }}>📋</span>
        <h2
          style={{
            fontSize: 60,
            color: colors.white,
            fontWeight: "bold",
          }}
        >
          퍼셉트론 구조 정리
        </h2>
      </div>

      {/* 4가지 구성요소 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 30,
          marginBottom: 30,
        }}
      >
        {components.map((comp, i) => (
          <div
            key={i}
            style={{
              opacity: componentReveal(i),
              transform: `scale(${interpolate(componentReveal(i), [0, 1], [0.8, 1])})`,
              backgroundColor: `${comp.color}15`,
              border: `2px solid ${comp.color}`,
              borderRadius: 20,
              padding: 25,
              width: 450,
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span style={{ fontSize: 50 }}>{comp.icon}</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 28, color: comp.color, fontWeight: "bold", marginBottom: 5 }}>
                {comp.name}
              </h3>
              <p style={{ fontSize: 22, color: colors.gray[300] }}>{comp.desc}</p>
            </div>
            <div
              style={{
                backgroundColor: comp.learns ? "#22c55e" : colors.gray[600],
                color: colors.white,
                padding: "8px 15px",
                borderRadius: 20,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {comp.learns ? "✓ 학습" : "고정"}
            </div>
          </div>
        ))}
      </div>

      {/* 핵심 공식 */}
      <div
        style={{
          opacity: formulaReveal,
          backgroundColor: colors.gray[800],
          borderRadius: 20,
          padding: "30px 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
          marginBottom: 25,
        }}
      >
        <span style={{ fontSize: 26, color: colors.gray[400] }}>핵심 공식</span>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 50,
            color: colors.primary[400],
            fontWeight: "bold",
          }}
        >
          y = f(Σwᵢxᵢ + b)
        </div>
      </div>

      {/* 학습 정의 */}
      <div
        style={{
          opacity: learningReveal,
          backgroundColor: "#8b5cf620",
          border: "3px solid #8b5cf6",
          borderRadius: 20,
          padding: "20px 50px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 50 }}>🎓</span>
        <div>
          <span style={{ fontSize: 32, color: "#8b5cf6", fontWeight: "bold" }}>
            학습 = 최적의 가중치(w)와 편향(b)을 찾는 과정!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
