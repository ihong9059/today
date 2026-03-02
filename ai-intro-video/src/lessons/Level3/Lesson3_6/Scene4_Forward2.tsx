/**
 * Scene 4: 순전파 - 출력층 및 손실 계산
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_Forward2: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const outputOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const calcOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const resultOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  const lossOpacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });
  const lossCalcOpacity = interpolate(frame, [540, 570], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-6/scene4.mp3")} />

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
        순전파: 출력층 & 손실
      </h1>

      <div style={{ display: "flex", gap: 35 }}>
        {/* 왼쪽: 출력 계산 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
            }}
          >
            <h3 style={{ color: "#a855f7", fontSize: 28, marginBottom: 15, opacity: outputOpacity }}>
              출력 y 계산
            </h3>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
                opacity: outputOpacity,
              }}
            >
              <div style={{ color: colors.white, fontSize: 22 }}>
                z = h₁·w₅ + h₂·w₆
              </div>
            </div>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
                opacity: calcOpacity,
              }}
            >
              <div style={{ color: "#60a5fa", fontSize: 20 }}>
                z = 0.574×0.6 + 0.565×0.7
              </div>
              <div style={{ color: "#60a5fa", fontSize: 20, marginTop: 5 }}>
                z = 0.344 + 0.396 = <strong>0.74</strong>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#a855f720",
                border: "2px solid #a855f7",
                padding: 15,
                borderRadius: 10,
                opacity: resultOpacity,
              }}
            >
              <div style={{ color: "#a855f7", fontSize: 18, fontWeight: "bold" }}>시그모이드 적용</div>
              <div style={{ color: colors.white, fontSize: 26, marginTop: 5 }}>
                y = σ(0.74) ≈ <strong style={{ color: "#a855f7" }}>0.677</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 손실 계산 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              opacity: lossOpacity,
            }}
          >
            <h3 style={{ color: "#f87171", fontSize: 28, marginBottom: 15 }}>
              손실 (Loss) 계산
            </h3>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
              }}
            >
              <div style={{ color: colors.gray[400], fontSize: 16 }}>MSE Loss</div>
              <div style={{ color: colors.white, fontSize: 22, marginTop: 5 }}>
                L = (y - t)²
              </div>
            </div>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
                opacity: lossCalcOpacity,
              }}
            >
              <div style={{ color: "#60a5fa", fontSize: 20 }}>
                L = (0.677 - 1)²
              </div>
              <div style={{ color: "#60a5fa", fontSize: 20, marginTop: 5 }}>
                L = (-0.323)² = <strong>0.104</strong>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f8717120",
                border: "2px solid #f87171",
                padding: 15,
                borderRadius: 10,
                opacity: lossCalcOpacity,
              }}
            >
              <div style={{ color: "#f87171", fontSize: 20, fontWeight: "bold" }}>
                예측: 0.677 | 정답: 1
              </div>
              <div style={{ color: colors.white, fontSize: 18, marginTop: 8 }}>
                손실을 줄이기 위해 역전파 시작!
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
