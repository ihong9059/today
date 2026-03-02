/**
 * Scene 4: 구체적 계산 예시
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_Calculation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 이미지 값 (3x3 영역)
  const imageValues = [1, 2, 1, 0, 1, 2, 1, 0, 1];
  // 커널 값
  const kernelValues = [-1, 0, 1, -2, 0, 2, -1, 0, 1];

  // 곱셈 결과
  const products = imageValues.map((v, i) => v * kernelValues[i]);
  const sum = products.reduce((a, b) => a + b, 0);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c3aed 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-2/scene4.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        합성곱 계산 예시
      </h1>

      <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
        {/* 이미지 영역 */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10 }}>이미지 (3×3)</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 60px)",
              gap: 6,
              backgroundColor: colors.gray[800],
              padding: 15,
              borderRadius: 12,
              border: "3px solid #3b82f6",
            }}
          >
            {imageValues.map((v, i) => {
              const showDelay = 60 + i * 20;
              const opacity = interpolate(frame, [showDelay, showDelay + 20], [0, 1], { extrapolateRight: "clamp" });
              return (
                <div
                  key={i}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: colors.gray[700],
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: "#3b82f6",
                    fontWeight: "bold",
                    opacity,
                  }}
                >
                  {v}
                </div>
              );
            })}
          </div>
        </div>

        {/* 곱하기 기호 */}
        <div style={{ fontSize: 48, color: colors.white }}>×</div>

        {/* 커널 */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10 }}>커널</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 60px)",
              gap: 6,
              backgroundColor: colors.gray[800],
              padding: 15,
              borderRadius: 12,
              border: "3px solid #f59e0b",
            }}
          >
            {kernelValues.map((v, i) => {
              const showDelay = 60 + i * 20;
              const opacity = interpolate(frame, [showDelay, showDelay + 20], [0, 1], { extrapolateRight: "clamp" });
              return (
                <div
                  key={i}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: v < 0 ? "#ef4444" : v > 0 ? "#22c55e" : colors.gray[600],
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: colors.white,
                    fontWeight: "bold",
                    opacity,
                  }}
                >
                  {v}
                </div>
              );
            })}
          </div>
        </div>

        {/* 등호 */}
        <div style={{ fontSize: 48, color: colors.white }}>=</div>

        {/* 곱셈 결과 */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10 }}>각 위치 곱</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 60px)",
              gap: 6,
              backgroundColor: colors.gray[800],
              padding: 15,
              borderRadius: 12,
              border: "3px solid #8b5cf6",
            }}
          >
            {products.map((v, i) => {
              const showDelay = 300 + i * 20;
              const opacity = interpolate(frame, [showDelay, showDelay + 20], [0, 1], { extrapolateRight: "clamp" });
              return (
                <div
                  key={i}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: v < 0 ? "#ef444466" : v > 0 ? "#22c55e66" : colors.gray[600],
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: colors.white,
                    fontWeight: "bold",
                    opacity,
                  }}
                >
                  {v}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 합계 계산 */}
      <div
        style={{
          marginTop: 50,
          opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ fontSize: 28, color: colors.gray[300], textAlign: "center", marginBottom: 15 }}>
          모든 값을 더하면:
        </div>
        <div
          style={{
            fontSize: 32,
            color: colors.white,
            backgroundColor: colors.gray[800],
            padding: "15px 40px",
            borderRadius: 12,
            fontFamily: "monospace",
          }}
        >
          {products.join(" + ")} = <span style={{ color: "#22c55e", fontWeight: "bold", fontSize: 40 }}>{sum}</span>
        </div>
      </div>

      {/* 해석 */}
      <div
        style={{
          marginTop: 30,
          fontSize: 26,
          color: "#f59e0b",
          opacity: interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        결과가 크면 → 해당 특징이 강하게 존재!
      </div>
    </AbsoluteFill>
  );
};
