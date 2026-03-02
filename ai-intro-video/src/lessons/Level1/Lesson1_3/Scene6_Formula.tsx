/**
 * Scene 6: 수학 공식 정리
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Formula: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const step1Reveal = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });
  const step2Reveal = interpolate(frame, [180, 220], [0, 1], { extrapolateRight: "clamp" });
  const step3Reveal = interpolate(frame, [300, 340], [0, 1], { extrapolateRight: "clamp" });
  const summaryReveal = interpolate(frame, [450, 490], [0, 1], { extrapolateRight: "clamp" });

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
          marginBottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 60 }}>📐</span>
        <h2
          style={{
            fontSize: 60,
            color: colors.white,
            fontWeight: "bold",
          }}
        >
          퍼셉트론 수학 공식
        </h2>
      </div>

      {/* 공식 단계별 설명 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 35, width: "100%" }}>
        {/* Step 1: 가중합 계산 */}
        <div
          style={{
            opacity: step1Reveal,
            transform: `translateX(${interpolate(step1Reveal, [0, 1], [-50, 0])}px)`,
            display: "flex",
            alignItems: "center",
            gap: 30,
            padding: "30px 50px",
            backgroundColor: "#3b82f615",
            border: "2px solid #3b82f6",
            borderRadius: 20,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              color: colors.white,
              fontWeight: "bold",
            }}
          >
            1
          </div>
          <div>
            <h3 style={{ fontSize: 32, color: "#3b82f6", fontWeight: "bold", marginBottom: 10 }}>
              가중합 계산
            </h3>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 36,
                color: colors.white,
                backgroundColor: colors.gray[800],
                padding: "15px 30px",
                borderRadius: 10,
              }}
            >
              z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
            </div>
          </div>
        </div>

        {/* Step 2: 시그마 표현 */}
        <div
          style={{
            opacity: step2Reveal,
            transform: `translateX(${interpolate(step2Reveal, [0, 1], [-50, 0])}px)`,
            display: "flex",
            alignItems: "center",
            gap: 30,
            padding: "30px 50px",
            backgroundColor: "#f9731615",
            border: "2px solid #f97316",
            borderRadius: 20,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              color: colors.white,
              fontWeight: "bold",
            }}
          >
            2
          </div>
          <div>
            <h3 style={{ fontSize: 32, color: "#f97316", fontWeight: "bold", marginBottom: 10 }}>
              시그마 표기
            </h3>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 42,
                color: colors.white,
                backgroundColor: colors.gray[800],
                padding: "15px 30px",
                borderRadius: 10,
              }}
            >
              z = Σwᵢxᵢ + b
            </div>
          </div>
        </div>

        {/* Step 3: 활성화 함수 */}
        <div
          style={{
            opacity: step3Reveal,
            transform: `translateX(${interpolate(step3Reveal, [0, 1], [-50, 0])}px)`,
            display: "flex",
            alignItems: "center",
            gap: 30,
            padding: "30px 50px",
            backgroundColor: "#22c55e15",
            border: "2px solid #22c55e",
            borderRadius: 20,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              color: colors.white,
              fontWeight: "bold",
            }}
          >
            3
          </div>
          <div>
            <h3 style={{ fontSize: 32, color: "#22c55e", fontWeight: "bold", marginBottom: 10 }}>
              활성화 함수 적용
            </h3>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 42,
                color: colors.white,
                backgroundColor: colors.gray[800],
                padding: "15px 30px",
                borderRadius: 10,
              }}
            >
              y = f(z)
            </div>
          </div>
        </div>
      </div>

      {/* 최종 공식 */}
      <div
        style={{
          opacity: summaryReveal,
          marginTop: 40,
          backgroundColor: "#8b5cf620",
          border: "3px solid #8b5cf6",
          borderRadius: 20,
          padding: "25px 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
        }}
      >
        <span style={{ fontSize: 28, color: colors.gray[400] }}>퍼셉트론 핵심 공식</span>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 56,
            color: "#8b5cf6",
            fontWeight: "bold",
          }}
        >
          y = f(Σwᵢxᵢ + b)
        </div>
      </div>
    </AbsoluteFill>
  );
};
