/**
 * Scene 6: 역전파 - 가중치 기울기 계산
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Backward2: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const w5Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const w5CalcOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const w6Opacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const w6CalcOpacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });
  const nextOpacity = interpolate(frame, [540, 570], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-6/scene6.mp3")} />

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
        가중치 기울기 계산
      </h1>

      <div style={{ display: "flex", gap: 35 }}>
        {/* 왼쪽: w5 기울기 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
            }}
          >
            <h3 style={{ color: "#fbbf24", fontSize: 26, marginBottom: 15, opacity: w5Opacity }}>
              ∂L/∂w₅ 계산
            </h3>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
                opacity: w5Opacity,
              }}
            >
              <div style={{ color: colors.gray[400], fontSize: 16 }}>연쇄법칙 적용</div>
              <div style={{ color: colors.white, fontSize: 22, marginTop: 5 }}>
                ∂L/∂w₅ = δ_out × h₁
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#fbbf2420",
                border: "2px solid #fbbf24",
                padding: 15,
                borderRadius: 10,
                opacity: w5CalcOpacity,
              }}
            >
              <div style={{ color: "#60a5fa", fontSize: 20 }}>
                = -0.141 × 0.574
              </div>
              <div style={{ color: colors.white, fontSize: 26, marginTop: 8, fontWeight: "bold" }}>
                = <span style={{ color: "#fbbf24" }}>-0.081</span>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: w6 기울기 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              opacity: w6Opacity,
            }}
          >
            <h3 style={{ color: "#fbbf24", fontSize: 26, marginBottom: 15 }}>
              ∂L/∂w₆ 계산
            </h3>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
              }}
            >
              <div style={{ color: colors.gray[400], fontSize: 16 }}>같은 방식</div>
              <div style={{ color: colors.white, fontSize: 22, marginTop: 5 }}>
                ∂L/∂w₆ = δ_out × h₂
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#fbbf2420",
                border: "2px solid #fbbf24",
                padding: 15,
                borderRadius: 10,
                opacity: w6CalcOpacity,
              }}
            >
              <div style={{ color: "#60a5fa", fontSize: 20 }}>
                = -0.141 × 0.565
              </div>
              <div style={{ color: colors.white, fontSize: 26, marginTop: 8, fontWeight: "bold" }}>
                = <span style={{ color: "#fbbf24" }}>-0.080</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 다음 단계 */}
      <div
        style={{
          backgroundColor: "#60a5fa20",
          border: "2px solid #60a5fa",
          padding: 20,
          borderRadius: 16,
          textAlign: "center",
          marginTop: 30,
          opacity: nextOpacity,
        }}
      >
        <div style={{ color: "#60a5fa", fontSize: 24, fontWeight: "bold" }}>
          은닉층으로 기울기 전파!
        </div>
        <div style={{ color: colors.gray[300], fontSize: 20, marginTop: 10 }}>
          δ_h₁ = δ_out × w₅ × σ'(h₁), δ_h₂ = δ_out × w₆ × σ'(h₂)
        </div>
        <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 10 }}>
          → w₁, w₂, w₃, w₄도 같은 방식으로 계산
        </div>
      </div>
    </AbsoluteFill>
  );
};
