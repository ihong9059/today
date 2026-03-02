/**
 * Scene 3: Average Pooling & Global Average Pooling
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_AvgPooling: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // Average Pooling 예시
  const inputData = [1, 3, 4, 2];
  const avgResult = 2.5;

  // GAP 시각화 애니메이션
  const gapProgress = interpolate(frame, [300, 450], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #15803d 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-3/scene3.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 15,
          opacity: titleOpacity,
        }}
      >
        🟢 Average Pooling
      </h1>

      <p
        style={{
          fontSize: 26,
          color: "#86efac",
          marginBottom: 40,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        영역 내 평균값 → 부드러운 다운샘플링
      </p>

      {/* 상단: Average Pooling 예시 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
          marginBottom: 50,
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {/* 2x2 입력 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 55px)",
            gap: 4,
            backgroundColor: colors.gray[800],
            padding: 12,
            borderRadius: 12,
            border: "3px solid #22c55e",
          }}
        >
          {inputData.map((v, i) => (
            <div
              key={i}
              style={{
                width: 55,
                height: 55,
                backgroundColor: colors.gray[700],
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                color: colors.white,
                fontWeight: "bold",
              }}
            >
              {v}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 28, color: colors.white }}>→ avg = ({inputData.join("+")}) / 4 =</div>

        <div
          style={{
            width: 70,
            height: 70,
            backgroundColor: "#22c55e",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            color: colors.white,
            fontWeight: "bold",
          }}
        >
          {avgResult}
        </div>
      </div>

      {/* 하단: Global Average Pooling */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          padding: 30,
          borderRadius: 20,
          border: "3px solid #f59e0b",
          opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <h3 style={{ fontSize: 32, color: "#fbbf24", marginBottom: 20, textAlign: "center" }}>
          ⭐ Global Average Pooling (GAP)
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: 40, justifyContent: "center" }}>
          {/* 입력 특성 맵 (7x7) */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16, color: colors.gray[400], marginBottom: 8 }}>입력: (512, 7, 7)</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 20px)",
                gap: 2,
                backgroundColor: colors.gray[700],
                padding: 8,
                borderRadius: 8,
                transform: `scale(${1 - gapProgress * 0.3})`,
              }}
            >
              {Array(49).fill(0).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: `hsl(${(i * 7) % 360}, 60%, 50%)`,
                    borderRadius: 2,
                    opacity: 1 - gapProgress * 0.5,
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ fontSize: 36, color: colors.white }}>→</div>

          {/* 출력 (1x1) */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16, color: colors.gray[400], marginBottom: 8 }}>출력: (512, 1, 1)</div>
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: "#f59e0b",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                color: colors.white,
                fontWeight: "bold",
                transform: `scale(${0.5 + gapProgress * 0.5})`,
              }}
            >
              512개
            </div>
          </div>
        </div>

        {/* GAP 장점 */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 25,
            justifyContent: "center",
            opacity: interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {["FC 레이어 대체", "파라미터 대폭 감소", "과적합 방지"].map((text, i) => (
            <div
              key={i}
              style={{
                backgroundColor: colors.gray[700],
                padding: "10px 20px",
                borderRadius: 8,
                fontSize: 16,
                color: "#fbbf24",
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
