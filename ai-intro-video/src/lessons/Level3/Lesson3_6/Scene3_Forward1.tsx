/**
 * Scene 3: 순전파 - 은닉층 계산
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Forward1: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const step1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const formulaOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const calcOpacity = interpolate(frame, [270, 300], [0, 1], { extrapolateRight: "clamp" });
  const resultOpacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });

  const h2Opacity = interpolate(frame, [540, 570], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-6/scene3.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        순전파: 은닉층 계산
      </h1>

      <div style={{ display: "flex", gap: 35 }}>
        {/* 왼쪽: h1 계산 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
            }}
          >
            <h3 style={{ color: "#fbbf24", fontSize: 28, marginBottom: 15, opacity: step1Opacity }}>
              h₁ 계산
            </h3>

            {/* 공식 */}
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
                opacity: formulaOpacity,
              }}
            >
              <div style={{ color: colors.gray[400], fontSize: 16 }}>Step 1: 가중합</div>
              <div style={{ color: colors.white, fontSize: 22, marginTop: 5 }}>
                z₁ = x₁·w₁ + x₂·w₂
              </div>
            </div>

            {/* 계산 */}
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
                opacity: calcOpacity,
              }}
            >
              <div style={{ color: colors.gray[400], fontSize: 16 }}>Step 2: 대입</div>
              <div style={{ color: "#60a5fa", fontSize: 20, marginTop: 5 }}>
                z₁ = 0.5×0.3 + 0.3×0.5 = <strong>0.3</strong>
              </div>
            </div>

            {/* 결과 */}
            <div
              style={{
                backgroundColor: "#fbbf2420",
                border: "2px solid #fbbf24",
                padding: 15,
                borderRadius: 10,
                opacity: resultOpacity,
              }}
            >
              <div style={{ color: "#fbbf24", fontSize: 18, fontWeight: "bold" }}>Step 3: 시그모이드</div>
              <div style={{ color: colors.white, fontSize: 22, marginTop: 5 }}>
                h₁ = σ(0.3) ≈ <strong style={{ color: "#fbbf24" }}>0.574</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: h2 계산 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              opacity: h2Opacity,
            }}
          >
            <h3 style={{ color: "#fbbf24", fontSize: 28, marginBottom: 15 }}>
              h₂ 계산 (같은 방식)
            </h3>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
              }}
            >
              <div style={{ color: colors.white, fontSize: 22 }}>
                z₂ = x₁·w₃ + x₂·w₄
              </div>
            </div>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
              }}
            >
              <div style={{ color: "#60a5fa", fontSize: 20 }}>
                z₂ = 0.5×0.4 + 0.3×0.2 = <strong>0.26</strong>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#fbbf2420",
                border: "2px solid #fbbf24",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <div style={{ color: colors.white, fontSize: 22 }}>
                h₂ = σ(0.26) ≈ <strong style={{ color: "#fbbf24" }}>0.565</strong>
              </div>
            </div>
          </div>

          {/* 시그모이드 수식 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 15,
              borderRadius: 12,
              marginTop: 15,
              textAlign: "center",
              opacity: resultOpacity,
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 18 }}>
              σ(x) = 1 / (1 + e⁻ˣ)
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
