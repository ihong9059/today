/**
 * Scene 4: L2 정규화
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_L2: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const formulaOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const explainOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const codeOpacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-8/scene4.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: "#60a5fa",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        L2 정규화 (Weight Decay)
      </h1>

      <div style={{ display: "flex", gap: 35 }}>
        {/* 왼쪽: 공식 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              marginBottom: 20,
              opacity: formulaOpacity,
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 20, marginBottom: 15 }}>공식</div>
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 20,
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div style={{ color: colors.white, fontSize: 28, fontFamily: "serif", marginBottom: 15 }}>
                L_total = L_original + <span style={{ color: "#60a5fa" }}>λ × Σw²</span>
              </div>
              <div style={{ color: colors.gray[400], fontSize: 18 }}>
                λ (람다) = 정규화 강도
              </div>
            </div>
          </div>

          {/* 효과 */}
          <div
            style={{
              backgroundColor: "#60a5fa20",
              border: "2px solid #60a5fa",
              padding: 20,
              borderRadius: 16,
              opacity: explainOpacity,
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
              효과
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>
              • 가중치가 커지면 → 페널티 증가
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>
              • 모델이 더 단순해짐
            </div>
            <div style={{ color: colors.white, fontSize: 20 }}>
              • 과적합 방지!
            </div>
          </div>
        </div>

        {/* 오른쪽: 코드 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              opacity: codeOpacity,
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
              PyTorch 구현
            </div>

            <div
              style={{
                backgroundColor: "#1e1e1e",
                padding: 20,
                borderRadius: 12,
                fontFamily: "monospace",
              }}
            >
              <div style={{ color: "#569cd6", fontSize: 18 }}>
                optimizer = torch.optim.Adam(
              </div>
              <div style={{ color: colors.white, fontSize: 18, paddingLeft: 20 }}>
                model.parameters(),
              </div>
              <div style={{ color: colors.white, fontSize: 18, paddingLeft: 20 }}>
                lr=0.001,
              </div>
              <div style={{ color: "#fbbf24", fontSize: 18, paddingLeft: 20 }}>
                weight_decay=0.01  <span style={{ color: colors.gray[500] }}># L2!</span>
              </div>
              <div style={{ color: "#569cd6", fontSize: 18 }}>
                )
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#22c55e20",
                padding: 15,
                borderRadius: 10,
                marginTop: 15,
              }}
            >
              <div style={{ color: "#22c55e", fontSize: 18 }}>
                weight_decay 값이 크면 → 가중치 더 작아짐
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
