/**
 * Lesson 1-4 Scene 3: 퍼셉트론의 학습
 */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

export const Scene3_PerceptronLearning: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const steps = [
    { num: "1", title: "처음", desc: "랜덤 가중치로 예측", result: "틀림!", color: "#ef4444" },
    { num: "2", title: "조정", desc: "가중치를 수정", result: '"중요도를 높여야겠다"', color: "#f97316" },
    { num: "3", title: "반복", desc: "다시 예측하고 수정", result: "점점 나아짐", color: "#eab308" },
    { num: "4", title: "결국", desc: "모든 데이터를 맞춤!", result: "최적의 가중치 발견", color: "#22c55e" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1e293b 100%)`,
        padding: 60,
      }}
    >
      {/* 제목 */}
      <div style={{ textAlign: "center", marginBottom: 40, opacity: titleOpacity }}>
        <h1 style={{ fontSize: 60, color: colors.white, marginBottom: 15 }}>
          퍼셉트론의 학습
        </h1>
        <p style={{ fontSize: 30, color: colors.gray[400] }}>
          학습 = 가중치 조정
        </p>
      </div>

      {/* 퍼셉트론 아이콘 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
          opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 80 }}>🤖</span>
      </div>

      {/* 학습 단계 (가로 타임라인) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 20,
          marginBottom: 50,
        }}
      >
        {steps.map((step, i) => {
          const stepStart = 50 + i * 50;
          const stepOpacity = interpolate(frame, [stepStart, stepStart + 30], [0, 1], {
            extrapolateRight: "clamp",
          });
          const isLast = i === steps.length - 1;

          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", opacity: stepOpacity }}>
              <div
                style={{
                  backgroundColor: isLast ? step.color + "30" : colors.gray[800],
                  border: `3px solid ${step.color}`,
                  borderRadius: 20,
                  padding: "25px 20px",
                  width: 200,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: step.color,
                    color: colors.white,
                    fontSize: 28,
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px",
                  }}
                >
                  {step.num}
                </div>
                <div style={{ fontSize: 24, color: step.color, fontWeight: "bold", marginBottom: 10 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 18, color: colors.gray[300], marginBottom: 10 }}>
                  {step.desc}
                </div>
                <div style={{ fontSize: 16, color: colors.white, fontWeight: "bold" }}>
                  {step.result}
                </div>
              </div>
              {!isLast && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: colors.gray[500],
                    fontSize: 40,
                    marginTop: 70,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          textAlign: "center",
          opacity: interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#22c55e20",
            border: "2px solid #22c55e",
            borderRadius: 20,
            padding: "20px 50px",
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
            핵심: 예측 → 오차 확인 → 가중치 조정 → 반복
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
