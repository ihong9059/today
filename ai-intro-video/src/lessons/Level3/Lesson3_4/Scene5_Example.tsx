/**
 * Scene 5: 순전파 계산 예시
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_Example: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 단계별
  const inputOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const layer1Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const relu1Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const layer2Opacity = interpolate(frame, [340, 370], [0, 1], { extrapolateRight: "clamp" });
  const outputOpacity = interpolate(frame, [440, 470], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-4/scene5.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 50,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        📝 순전파 계산 예시 (2층 신경망)
      </h1>

      <div style={{ display: "flex", gap: 30 }}>
        {/* 왼쪽: 레이어 1 */}
        <div style={{ flex: 1 }}>
          {/* 입력 */}
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              padding: 15,
              borderRadius: 12,
              marginBottom: 15,
              opacity: inputOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 20, fontWeight: "bold" }}>입력 x</div>
            <div style={{ color: colors.white, fontSize: 24, fontFamily: "monospace", marginTop: 8 }}>
              x = [1, 2]
            </div>
          </div>

          {/* 레이어 1 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 18,
              borderRadius: 12,
              marginBottom: 15,
              opacity: layer1Opacity,
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              레이어 1
            </div>
            <div style={{ color: colors.gray[300], fontSize: 16 }}>
              W₁ = [[0.5, 0.3], [0.2, 0.4]]
            </div>
            <div style={{ color: colors.gray[300], fontSize: 16, marginTop: 5 }}>
              b₁ = [0.1, 0.2]
            </div>
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <div style={{ color: colors.white, fontSize: 18 }}>
                z₁ = W₁ · x + b₁
              </div>
              <div style={{ color: "#fbbf24", fontSize: 16, marginTop: 5 }}>
                z₁ = [0.5×1 + 0.3×2 + 0.1, 0.2×1 + 0.4×2 + 0.2]
              </div>
              <div style={{ color: "#22c55e", fontSize: 18, fontWeight: "bold", marginTop: 5 }}>
                z₁ = [1.2, 1.2]
              </div>
            </div>
          </div>

          {/* ReLU */}
          <div
            style={{
              backgroundColor: "#fbbf2420",
              border: "2px solid #fbbf24",
              padding: 15,
              borderRadius: 12,
              opacity: relu1Opacity,
            }}
          >
            <div style={{ color: "#fbbf24", fontSize: 20, fontWeight: "bold" }}>ReLU 적용</div>
            <div style={{ color: colors.white, fontSize: 20, marginTop: 8 }}>
              h₁ = ReLU(z₁) = [1.2, 1.2]
            </div>
            <div style={{ color: colors.gray[400], fontSize: 14, marginTop: 5 }}>
              (양수이므로 그대로)
            </div>
          </div>
        </div>

        {/* 오른쪽: 레이어 2 */}
        <div style={{ flex: 1 }}>
          {/* 레이어 2 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 18,
              borderRadius: 12,
              marginBottom: 15,
              opacity: layer2Opacity,
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              레이어 2 (출력층)
            </div>
            <div style={{ color: colors.gray[300], fontSize: 16 }}>
              W₂ = [[0.6, 0.7]]
            </div>
            <div style={{ color: colors.gray[300], fontSize: 16, marginTop: 5 }}>
              b₂ = [0.3]
            </div>
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <div style={{ color: colors.white, fontSize: 18 }}>
                z₂ = W₂ · h₁ + b₂
              </div>
              <div style={{ color: "#fbbf24", fontSize: 16, marginTop: 5 }}>
                z₂ = [0.6×1.2 + 0.7×1.2 + 0.3]
              </div>
              <div style={{ color: "#22c55e", fontSize: 18, fontWeight: "bold", marginTop: 5 }}>
                z₂ = [1.86]
              </div>
            </div>
          </div>

          {/* 최종 출력 */}
          <div
            style={{
              backgroundColor: "#a855f720",
              border: "3px solid #a855f7",
              padding: 20,
              borderRadius: 16,
              opacity: outputOpacity,
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 24, fontWeight: "bold" }}>최종 출력</div>
            <div style={{ color: colors.white, fontSize: 36, fontWeight: "bold", marginTop: 10 }}>
              ŷ = 1.86
            </div>
            <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 10 }}>
              입력 [1, 2] → 출력 1.86
            </div>
          </div>

          {/* 흐름 요약 */}
          <div
            style={{
              textAlign: "center",
              marginTop: 20,
              opacity: outputOpacity,
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 20 }}>
              x → W₁x+b₁ → ReLU → W₂h₁+b₂ → ŷ
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
