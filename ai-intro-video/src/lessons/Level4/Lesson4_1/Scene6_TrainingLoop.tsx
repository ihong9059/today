/**
 * Scene 6: 학습 루프 실행
 * 에폭별 손실/정확도 시각화
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_TrainingLoop: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 학습 루프 코드 표시
  const codeOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 에폭 진행 애니메이션 (10 에폭)
  const epochProgress = interpolate(frame, [240, 720], [0, 10], { extrapolateRight: "clamp" });
  const currentEpoch = Math.min(10, Math.floor(epochProgress) + 1);

  // 손실 감소 시뮬레이션
  const lossValues = [2.3, 0.8, 0.45, 0.32, 0.25, 0.19, 0.15, 0.12, 0.10, 0.08];
  const accuracyValues = [15, 72, 85, 89, 92, 94, 95, 96, 97, 98];

  const currentLoss = lossValues[Math.min(currentEpoch - 1, 9)];
  const currentAccuracy = accuracyValues[Math.min(currentEpoch - 1, 9)];

  // 결과 표시
  const resultOpacity = interpolate(frame, [750, 780], [0, 1], { extrapolateRight: "clamp" });

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
      <Audio src={staticFile("audio/lesson-4-1/scene6.mp3")} />

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
        학습 루프 실행
      </h2>

      <div style={{ display: "flex", gap: 50, width: "100%", maxWidth: 1500 }}>
        {/* 코드 블록 */}
        <div
          style={{
            flex: 1,
            opacity: codeOpacity,
            backgroundColor: "#1e1e3f",
            borderRadius: 12,
            padding: 25,
            fontFamily: "monospace",
            fontSize: 18,
            border: `2px solid ${colors.level[4]}`,
          }}
        >
          <div style={{ color: "#ff79c6" }}>for epoch in range(10):</div>
          <div style={{ color: colors.gray[100], paddingLeft: 20 }}>for data, target in train_loader:</div>
          <div style={{ color: "#6272a4", paddingLeft: 40 }}># 순전파</div>
          <div style={{ color: colors.gray[100], paddingLeft: 40 }}>output = model(data)</div>
          <div style={{ color: colors.gray[100], paddingLeft: 40 }}>loss = criterion(output, target)</div>
          <div style={{ color: "#6272a4", paddingLeft: 40 }}># 역전파</div>
          <div style={{ color: colors.gray[100], paddingLeft: 40 }}>optimizer.zero_grad()</div>
          <div style={{ color: colors.gray[100], paddingLeft: 40 }}>loss.backward()</div>
          <div style={{ color: colors.gray[100], paddingLeft: 40 }}>optimizer.step()</div>
        </div>

        {/* 실시간 학습 현황 */}
        <div style={{ width: 500, display: "flex", flexDirection: "column", gap: 25 }}>
          {/* 에폭 표시 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 25,
              textAlign: "center",
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 22, marginBottom: 10 }}>Epoch</div>
            <div style={{ color: colors.level[4], fontSize: 72, fontWeight: "bold" }}>
              {currentEpoch} / 10
            </div>
          </div>

          {/* 손실 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 25,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#ef4444", fontSize: 24 }}>Loss</span>
              <span style={{ color: colors.white, fontSize: 36, fontWeight: "bold" }}>
                {(currentLoss ?? 0).toFixed(2)}
              </span>
            </div>
            {/* 손실 바 */}
            <div style={{ marginTop: 15, backgroundColor: colors.gray[700], borderRadius: 8, height: 20 }}>
              <div
                style={{
                  width: `${(currentLoss / 2.3) * 100}%`,
                  height: "100%",
                  backgroundColor: "#ef4444",
                  borderRadius: 8,
                  transition: "width 0.3s",
                }}
              />
            </div>
          </div>

          {/* 정확도 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 25,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#22c55e", fontSize: 24 }}>Accuracy</span>
              <span style={{ color: colors.white, fontSize: 36, fontWeight: "bold" }}>
                {currentAccuracy}%
              </span>
            </div>
            {/* 정확도 바 */}
            <div style={{ marginTop: 15, backgroundColor: colors.gray[700], borderRadius: 8, height: 20 }}>
              <div
                style={{
                  width: `${currentAccuracy}%`,
                  height: "100%",
                  backgroundColor: "#22c55e",
                  borderRadius: 8,
                  transition: "width 0.3s",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 최종 결과 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: resultOpacity,
          display: "flex",
          alignItems: "center",
          gap: 40,
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          padding: "25px 50px",
          borderRadius: 16,
          border: "2px solid #22c55e",
        }}
      >
        <span style={{ fontSize: 32, color: colors.white }}>🎉 학습 완료!</span>
        <span style={{ fontSize: 42, color: "#22c55e", fontWeight: "bold" }}>
          테스트 정확도: 98%
        </span>
      </div>
    </AbsoluteFill>
  );
};
