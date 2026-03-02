/**
 * Scene 5: 역전파 - 출력층 기울기
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_Backward1: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const step1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const calc1Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const step2Opacity = interpolate(frame, [270, 300], [0, 1], { extrapolateRight: "clamp" });
  const calc2Opacity = interpolate(frame, [390, 420], [0, 1], { extrapolateRight: "clamp" });
  const resultOpacity = interpolate(frame, [510, 540], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-6/scene5.mp3")} />

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
        역전파: 출력층 기울기
      </h1>

      <div style={{ display: "flex", gap: 35 }}>
        {/* 왼쪽: dL/dy */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
            }}
          >
            <h3 style={{ color: "#f87171", fontSize: 26, marginBottom: 15, opacity: step1Opacity }}>
              ① ∂L/∂y 계산
            </h3>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
                opacity: step1Opacity,
              }}
            >
              <div style={{ color: colors.gray[400], fontSize: 16 }}>L = (y - t)² 미분</div>
              <div style={{ color: colors.white, fontSize: 22, marginTop: 5 }}>
                ∂L/∂y = 2(y - t)
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f8717120",
                border: "2px solid #f87171",
                padding: 15,
                borderRadius: 10,
                opacity: calc1Opacity,
              }}
            >
              <div style={{ color: "#60a5fa", fontSize: 20 }}>
                = 2(0.677 - 1)
              </div>
              <div style={{ color: colors.white, fontSize: 24, marginTop: 5, fontWeight: "bold" }}>
                = <span style={{ color: "#f87171" }}>-0.646</span>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: σ' 계산 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
            }}
          >
            <h3 style={{ color: "#a855f7", fontSize: 26, marginBottom: 15, opacity: step2Opacity }}>
              ② 시그모이드 미분 σ'
            </h3>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
                opacity: step2Opacity,
              }}
            >
              <div style={{ color: colors.gray[400], fontSize: 16 }}>시그모이드 미분 공식</div>
              <div style={{ color: colors.white, fontSize: 22, marginTop: 5 }}>
                σ'(z) = σ(z) × (1 - σ(z))
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#a855f720",
                border: "2px solid #a855f7",
                padding: 15,
                borderRadius: 10,
                opacity: calc2Opacity,
              }}
            >
              <div style={{ color: "#60a5fa", fontSize: 20 }}>
                = 0.677 × (1 - 0.677)
              </div>
              <div style={{ color: "#60a5fa", fontSize: 20, marginTop: 5 }}>
                = 0.677 × 0.323
              </div>
              <div style={{ color: colors.white, fontSize: 24, marginTop: 5, fontWeight: "bold" }}>
                = <span style={{ color: "#a855f7" }}>0.219</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단: 출력층 기울기 */}
      <div
        style={{
          backgroundColor: "#22c55e20",
          border: "3px solid #22c55e",
          padding: 20,
          borderRadius: 16,
          textAlign: "center",
          marginTop: 30,
          opacity: resultOpacity,
        }}
      >
        <div style={{ color: "#22c55e", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
          출력층 기울기 (δ_out)
        </div>
        <div style={{ color: colors.white, fontSize: 26 }}>
          δ_out = ∂L/∂y × σ' = -0.646 × 0.219 = <strong style={{ color: "#22c55e" }}>-0.141</strong>
        </div>
      </div>
    </AbsoluteFill>
  );
};
