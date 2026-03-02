/**
 * Lesson 1-4 Scene 8: 예시 - 학습 과정
 */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

export const Scene8_ExampleTraining: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1e293b 100%)`,
        padding: 50,
      }}
    >
      {/* 제목 */}
      <div style={{ textAlign: "center", marginBottom: 20, opacity: titleOpacity }}>
        <h1 style={{ fontSize: 50, color: colors.white, marginBottom: 10 }}>
          학습 과정: 첫 번째 데이터
        </h1>
        <p style={{ fontSize: 26, color: colors.gray[400] }}>
          입력 (0, 0), 정답 0
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
        {/* 왼쪽: 계산 과정 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 30,
            width: 500,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h3 style={{ fontSize: 28, color: colors.primary[400], marginBottom: 20 }}>
            1. 계산 (Forward)
          </h3>

          {/* z 계산 */}
          <div
            style={{
              marginBottom: 25,
              opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 22, color: colors.gray[300], marginBottom: 10 }}>
              z = w₁×x₁ + w₂×x₂ + b
            </div>
            <div style={{ fontSize: 26, color: colors.white, fontFamily: "monospace" }}>
              z = 0×0 + 0×0 + 0 = <span style={{ color: colors.primary[400] }}>0</span>
            </div>
          </div>

          {/* 예측 */}
          <div
            style={{
              marginBottom: 25,
              opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 22, color: colors.gray[300], marginBottom: 10 }}>
              예측 (z ≥ 0 → 1)
            </div>
            <div style={{ fontSize: 26, color: "#ef4444", fontWeight: "bold" }}>
              예측 = 1 ❌ (정답은 0)
            </div>
          </div>

          {/* 오차 */}
          <div
            style={{
              marginBottom: 15,
              opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 22, color: colors.gray[300], marginBottom: 10 }}>
              오차 계산
            </div>
            <div style={{ fontSize: 26, color: colors.white, fontFamily: "monospace" }}>
              error = 0 - 1 = <span style={{ color: "#ef4444" }}>-1</span>
            </div>
          </div>
        </div>

        {/* 오른쪽: 업데이트 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 30,
            width: 550,
            opacity: interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h3 style={{ fontSize: 28, color: "#22c55e", marginBottom: 20 }}>
            2. 가중치 업데이트
          </h3>

          {/* w1 업데이트 */}
          <div
            style={{
              marginBottom: 20,
              opacity: interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 20, color: colors.gray[300], marginBottom: 8 }}>
              w₁ = w₁ + η × error × x₁
            </div>
            <div style={{ fontSize: 24, color: colors.white, fontFamily: "monospace" }}>
              w₁ = 0 + 0.5 × (-1) × 0 = <span style={{ color: colors.gray[400] }}>0</span>
              <span style={{ color: colors.gray[500], marginLeft: 10 }}>(변화 없음)</span>
            </div>
          </div>

          {/* w2 업데이트 */}
          <div
            style={{
              marginBottom: 20,
              opacity: interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 20, color: colors.gray[300], marginBottom: 8 }}>
              w₂ = w₂ + η × error × x₂
            </div>
            <div style={{ fontSize: 24, color: colors.white, fontFamily: "monospace" }}>
              w₂ = 0 + 0.5 × (-1) × 0 = <span style={{ color: colors.gray[400] }}>0</span>
              <span style={{ color: colors.gray[500], marginLeft: 10 }}>(변화 없음)</span>
            </div>
          </div>

          {/* b 업데이트 */}
          <div
            style={{
              marginBottom: 25,
              opacity: interpolate(frame, [380, 410], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 20, color: colors.gray[300], marginBottom: 8 }}>
              b = b + η × error
            </div>
            <div style={{ fontSize: 24, color: colors.white, fontFamily: "monospace" }}>
              b = 0 + 0.5 × (-1) = <span style={{ color: "#22c55e" }}>-0.5</span>
              <span style={{ color: "#22c55e", marginLeft: 10 }}>(감소!)</span>
            </div>
          </div>

          {/* 결과 */}
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              borderRadius: 15,
              padding: 15,
              opacity: interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold", textAlign: "center" }}>
              결과: w₁=0, w₂=0, b=-0.5
            </div>
          </div>
        </div>
      </div>

      {/* 요약 */}
      <div
        style={{
          textAlign: "center",
          marginTop: 30,
          opacity: interpolate(frame, [460, 490], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p style={{ fontSize: 24, color: colors.gray[300] }}>
          이렇게 모든 데이터에 대해 반복하면, 점점 정확해집니다! 🎯
        </p>
      </div>
    </AbsoluteFill>
  );
};
