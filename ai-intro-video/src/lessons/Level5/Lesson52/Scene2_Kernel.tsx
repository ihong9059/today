/**
 * Scene 2: 커널(필터)이란?
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_Kernel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 다양한 커널들
  const kernels = [
    { name: "수평 에지", values: [-1, -1, -1, 0, 0, 0, 1, 1, 1], color: "#3b82f6" },
    { name: "수직 에지", values: [-1, 0, 1, -1, 0, 1, -1, 0, 1], color: "#8b5cf6" },
    { name: "샤프닝", values: [0, -1, 0, -1, 5, -1, 0, -1, 0], color: "#f59e0b" },
  ];

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
      <Audio src={staticFile("audio/lesson-5-2/scene2.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 20,
          opacity: titleOpacity,
        }}
      >
        커널 (Kernel) = 필터 (Filter)
      </h1>

      <p
        style={{
          fontSize: 28,
          color: colors.gray[300],
          marginBottom: 50,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        특정 패턴을 감지하는 작은 숫자 행렬
      </p>

      {/* 커널 카드들 */}
      <div style={{ display: "flex", gap: 40 }}>
        {kernels.map((kernel, idx) => {
          const delay = 90 + idx * 60;
          const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 30 });
          return (
            <div
              key={kernel.name}
              style={{
                backgroundColor: colors.gray[800],
                padding: 30,
                borderRadius: 20,
                border: `3px solid ${kernel.color}`,
                transform: `scale(${Math.max(0, scale)})`,
                textAlign: "center",
              }}
            >
              <h3 style={{ fontSize: 24, color: kernel.color, marginBottom: 20 }}>{kernel.name}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 50px)", gap: 6 }}>
                {kernel.values.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: v < 0 ? "#ef4444" : v > 0 ? "#22c55e" : colors.gray[600],
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      color: colors.white,
                      fontWeight: "bold",
                    }}
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 핵심 포인트 */}
      <div
        style={{
          marginTop: 50,
          backgroundColor: "#22c55e22",
          padding: "20px 40px",
          borderRadius: 16,
          border: "2px solid #22c55e",
          opacity: interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p style={{ fontSize: 26, color: colors.white, margin: 0 }}>
          CNN에서 커널 값은 <span style={{ color: "#22c55e", fontWeight: "bold" }}>학습</span>을 통해 자동으로 결정됩니다!
        </p>
      </div>
    </AbsoluteFill>
  );
};
