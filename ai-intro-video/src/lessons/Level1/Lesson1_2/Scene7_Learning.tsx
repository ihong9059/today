/**
 * Lesson 1-2 Scene 7: 퍼셉트론 학습 과정
 */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Learning: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const steps = [
    { num: 1, title: "예측하기", desc: "현재 가중치로 결과 예측", icon: "🎯" },
    { num: 2, title: "오차 계산", desc: "정답과 비교해서 오차 확인", icon: "❌" },
    { num: 3, title: "가중치 조정", desc: "오차를 줄이도록 가중치 수정", icon: "🔧" },
    { num: 4, title: "반복!", desc: "점점 더 정확해짐", icon: "🔄" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1a365d 100%)`,
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
        🎓 퍼셉트론의 학습 과정
      </h2>

      {/* 학습 단계 */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 60 }}>
        {steps.map((step, i) => {
          const stepOpacity = interpolate(
            frame,
            [20 + i * 20, 40 + i * 20],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          return (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: `${colors.primary[500]}20`,
                  border: `2px solid ${colors.primary[400]}`,
                  borderRadius: 16,
                  padding: "25px 30px",
                  textAlign: "center",
                  width: 180,
                  opacity: stepOpacity,
                  transform: `scale(${interpolate(stepOpacity, [0, 1], [0.8, 1])})`,
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 10 }}>{step.icon}</div>
                <div
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    backgroundColor: colors.primary[500],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                    fontSize: 18,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                  {step.num}
                </div>
                <div style={{ fontSize: 20, color: colors.white, fontWeight: "bold", marginBottom: 8 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>{step.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    fontSize: 30,
                    color: colors.gray[500],
                    margin: "0 5px",
                    opacity: interpolate(frame, [40 + i * 20, 50 + i * 20], [0, 1], { extrapolateRight: "clamp" }),
                  }}
                >
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 예시 시나리오 */}
      <div
        style={{
          backgroundColor: `${colors.gray[800]}80`,
          borderRadius: 20,
          padding: "35px 50px",
          maxWidth: 900,
          opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <h3 style={{ fontSize: 26, color: "#22c55e", marginBottom: 25, textAlign: "center" }}>
          🌂 예시: 우산 가져갈지 예측하기
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 15, fontSize: 20 }}>
            <span style={{ color: "#ef4444" }}>1차 시도:</span>
            <span style={{ color: colors.gray[300] }}>비 확률 80%인데 "우산 필요 없음" 예측 →</span>
            <span style={{ color: "#ef4444", fontWeight: "bold" }}>틀림!</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 15, fontSize: 20 }}>
            <span style={{ color: "#f97316" }}>학습:</span>
            <span style={{ color: colors.gray[300] }}>"비 확률" 가중치를 높임</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 15, fontSize: 20 }}>
            <span style={{ color: "#22c55e" }}>2차 시도:</span>
            <span style={{ color: colors.gray[300] }}>비 확률 높으면 "우산 필요" 예측 →</span>
            <span style={{ color: "#22c55e", fontWeight: "bold" }}>맞음!</span>
          </div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontSize: 28,
          color: colors.primary[300],
          fontWeight: "500",
          opacity: interpolate(frame, [140, 160], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        💡 이것이 바로 "기계 학습"의 시작입니다!
      </div>
    </AbsoluteFill>
  );
};
