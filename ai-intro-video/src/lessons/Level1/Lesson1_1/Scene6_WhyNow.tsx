/**
 * Lesson 1-1 Scene 6: 왜 지금 AI가 폭발적으로 발전했나?
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_WhyNow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const factors = [
    {
      icon: "📊",
      title: "데이터 폭발",
      desc: "인터넷, SNS, IoT로 데이터 폭증",
      detail: "AI의 연료 = 데이터",
      color: "#3b82f6",
      delay: 60,
    },
    {
      icon: "💻",
      title: "연산 능력 향상",
      desc: "GPU의 병렬 처리 능력",
      detail: "클라우드 컴퓨팅",
      color: "#22c55e",
      delay: 180,
    },
    {
      icon: "🧠",
      title: "알고리즘 발전",
      desc: "딥러닝 이론 발전",
      detail: "역전파 알고리즘 실용화",
      color: "#f97316",
      delay: 300,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-1/scene6_why_now.mp3")} />

      {/* 타이틀 */}
      <div
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: colors.white,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        💡 왜 갑자기 AI가 폭발적으로 발전했을까?
      </div>

      <p
        style={{
          fontSize: 32,
          color: colors.gray[400],
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        세 가지 요소의 완벽한 결합
      </p>

      {/* 세 가지 요소 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 50,
          marginBottom: 50,
        }}
      >
        {factors.map((factor, i) => {
          const factorScale = spring({
            frame: frame - factor.delay,
            fps,
            config: { damping: 12 },
          });

          return (
            <div
              key={i}
              style={{
                width: 380,
                backgroundColor: `${factor.color}15`,
                border: `3px solid ${factor.color}`,
                borderRadius: 24,
                padding: 40,
                textAlign: "center",
                transform: `scale(${factorScale})`,
                opacity: interpolate(factorScale, [0, 1], [0, 1]),
              }}
            >
              <div
                style={{
                  fontSize: 80,
                  marginBottom: 20,
                }}
              >
                {factor.icon}
              </div>
              <h3
                style={{
                  fontSize: 34,
                  color: factor.color,
                  fontWeight: "bold",
                  marginBottom: 15,
                }}
              >
                {factor.title}
              </h3>
              <p style={{ fontSize: 26, color: colors.white, marginBottom: 10 }}>
                {factor.desc}
              </p>
              <p style={{ fontSize: 22, color: colors.gray[400] }}>
                {factor.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* 결합 화살표 및 결과 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          opacity: interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ fontSize: 50 }}>📊</div>
        <div style={{ fontSize: 40, color: colors.gray[500] }}>+</div>
        <div style={{ fontSize: 50 }}>💻</div>
        <div style={{ fontSize: 40, color: colors.gray[500] }}>+</div>
        <div style={{ fontSize: 50 }}>🧠</div>
        <div style={{ fontSize: 40, color: colors.gray[500] }}>=</div>
        <div
          style={{
            backgroundColor: "#ec4899",
            color: colors.white,
            padding: "20px 40px",
            borderRadius: 20,
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          🚀 AI 혁명!
        </div>
      </div>
    </AbsoluteFill>
  );
};
