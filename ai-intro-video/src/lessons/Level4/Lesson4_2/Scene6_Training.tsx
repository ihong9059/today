/**
 * Scene 6: 학습 및 결과
 * CIFAR-10 학습 과정 시각화
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Training: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const trainingOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 에폭 진행
  const epochProgress = interpolate(frame, [120, 600], [0, 10], { extrapolateRight: "clamp" });
  const currentEpoch = Math.min(10, Math.floor(epochProgress) + 1);

  // 정확도 (CIFAR-10은 MNIST보다 어려움)
  const accuracyValues = [12, 35, 48, 55, 60, 64, 68, 71, 74, 76];
  const lossValues = [2.3, 1.8, 1.5, 1.3, 1.1, 0.95, 0.85, 0.78, 0.72, 0.68];

  const currentAccuracy = accuracyValues[Math.min(currentEpoch - 1, 9)];
  const currentLoss = lossValues[Math.min(currentEpoch - 1, 9)];

  const resultOpacity = interpolate(frame, [650, 680], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-2/scene6.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 52,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        학습 실행
      </h2>

      <div style={{ display: "flex", gap: 60, width: "100%", maxWidth: 1400, opacity: trainingOpacity }}>
        {/* 에폭별 정확도 그래프 */}
        <div
          style={{
            flex: 2,
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 30,
          }}
        >
          <h3 style={{ color: colors.white, fontSize: 28, marginBottom: 20 }}>정확도 변화</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 15, height: 300 }}>
            {accuracyValues.map((acc, i) => {
              const isActive = i < currentEpoch;
              return (
                <div key={i} style={{ textAlign: "center", flex: 1 }}>
                  <div
                    style={{
                      height: isActive ? `${acc * 3}px` : 0,
                      backgroundColor: isActive ? "#22c55e" : colors.gray[700],
                      borderRadius: "8px 8px 0 0",
                      transition: "height 0.3s",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      paddingTop: 5,
                    }}
                  >
                    {isActive && (
                      <span style={{ color: colors.white, fontSize: 14, fontWeight: "bold" }}>{acc}%</span>
                    )}
                  </div>
                  <div style={{ color: colors.gray[400], fontSize: 14, marginTop: 10 }}>E{i + 1}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 현재 상태 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 25 }}>
          {/* 에폭 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 25,
              textAlign: "center",
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 20, marginBottom: 10 }}>Epoch</div>
            <div style={{ color: colors.level[4], fontSize: 64, fontWeight: "bold" }}>{currentEpoch} / 10</div>
          </div>

          {/* 손실 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: "#ef4444", fontSize: 22 }}>Loss</span>
              <span style={{ color: colors.white, fontSize: 28, fontWeight: "bold" }}>
                {(currentLoss ?? 0).toFixed(2)}
              </span>
            </div>
            <div style={{ backgroundColor: colors.gray[700], borderRadius: 8, height: 16 }}>
              <div
                style={{
                  width: `${(currentLoss / 2.3) * 100}%`,
                  height: "100%",
                  backgroundColor: "#ef4444",
                  borderRadius: 8,
                }}
              />
            </div>
          </div>

          {/* 정확도 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: "#22c55e", fontSize: 22 }}>Accuracy</span>
              <span style={{ color: colors.white, fontSize: 28, fontWeight: "bold" }}>{currentAccuracy}%</span>
            </div>
            <div style={{ backgroundColor: colors.gray[700], borderRadius: 8, height: 16 }}>
              <div
                style={{
                  width: `${currentAccuracy}%`,
                  height: "100%",
                  backgroundColor: "#22c55e",
                  borderRadius: 8,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 결과 비교 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: resultOpacity,
          display: "flex",
          alignItems: "center",
          gap: 40,
          backgroundColor: "rgba(249, 115, 22, 0.2)",
          padding: "20px 40px",
          borderRadius: 16,
          border: `2px solid ${colors.level[4]}`,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ color: colors.gray[400], fontSize: 18 }}>MNIST</div>
          <div style={{ color: "#22c55e", fontSize: 32, fontWeight: "bold" }}>98%</div>
        </div>
        <div style={{ color: colors.white, fontSize: 24 }}>vs</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: colors.gray[400], fontSize: 18 }}>CIFAR-10</div>
          <div style={{ color: colors.level[4], fontSize: 32, fontWeight: "bold" }}>76%</div>
        </div>
        <div style={{ color: colors.gray[300], fontSize: 20, marginLeft: 20 }}>
          컬러 + 복잡한 배경 = 더 어려운 문제!
        </div>
      </div>
    </AbsoluteFill>
  );
};
