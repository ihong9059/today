/**
 * Lesson 1-4 Scene 9: 학습 알고리즘 정리
 */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

export const Scene9_Algorithm: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const steps = [
    {
      num: "1",
      title: "초기화",
      desc: "가중치(w)와 편향(b)를 작은 랜덤값으로 설정",
      icon: "🎲",
    },
    {
      num: "2",
      title: "반복",
      desc: "각 데이터에 대해:\n예측 → 오차 계산 → 가중치 업데이트",
      icon: "🔄",
    },
    {
      num: "3",
      title: "수렴 확인",
      desc: "모든 데이터를 맞출 때까지 반복",
      icon: "✅",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #312e81 100%)`,
        padding: 60,
      }}
    >
      {/* 제목 */}
      <div style={{ textAlign: "center", marginBottom: 40, opacity: titleOpacity }}>
        <h1 style={{ fontSize: 60, color: colors.white, marginBottom: 15 }}>
          퍼셉트론 학습 알고리즘
        </h1>
        <p style={{ fontSize: 30, color: colors.gray[400] }}>
          전체 과정 정리
        </p>
      </div>

      {/* 알고리즘 단계 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 25,
        }}
      >
        {steps.map((step, i) => {
          const stepStart = 40 + i * 80;
          const stepOpacity = interpolate(frame, [stepStart, stepStart + 40], [0, 1], {
            extrapolateRight: "clamp",
          });
          const stepTranslateX = interpolate(frame, [stepStart, stepStart + 40], [-50, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                opacity: stepOpacity,
                transform: `translateX(${stepTranslateX}px)`,
              }}
            >
              {/* 번호 */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: colors.primary[600],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                {step.num}
              </div>

              {/* 내용 */}
              <div
                style={{
                  backgroundColor: colors.gray[800] + "90",
                  border: "2px solid " + colors.primary[500],
                  borderRadius: 20,
                  padding: "25px 40px",
                  width: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <span style={{ fontSize: 50 }}>{step.icon}</span>
                <div>
                  <div style={{ fontSize: 32, color: colors.primary[300], fontWeight: "bold", marginBottom: 8 }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: 22, color: colors.gray[300], whiteSpace: "pre-line" }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 참고 사항 */}
      <div
        style={{
          textAlign: "center",
          marginTop: 50,
          opacity: interpolate(frame, [300, 340], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#f9731620",
            border: "2px solid #f97316",
            borderRadius: 20,
            padding: "20px 40px",
          }}
        >
          <span style={{ fontSize: 24, color: colors.white }}>
            ⚠️ 단, 퍼셉트론은 <span style={{ color: "#f97316", fontWeight: "bold" }}>선형 분리 가능한</span> 문제만 해결할 수 있습니다
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
