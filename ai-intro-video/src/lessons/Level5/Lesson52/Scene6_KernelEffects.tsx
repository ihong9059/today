/**
 * Scene 6: 다양한 커널의 효과
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_KernelEffects: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const kernelEffects = [
    {
      name: "수직 에지",
      kernel: [-1, 0, 1, -1, 0, 1, -1, 0, 1],
      effect: "세로선 감지",
      color: "#3b82f6",
    },
    {
      name: "수평 에지",
      kernel: [-1, -1, -1, 0, 0, 0, 1, 1, 1],
      effect: "가로선 감지",
      color: "#8b5cf6",
    },
    {
      name: "샤프닝",
      kernel: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      effect: "선명하게",
      color: "#f59e0b",
    },
    {
      name: "블러",
      kernel: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      effect: "흐리게",
      color: "#22c55e",
    },
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
      <Audio src={staticFile("audio/lesson-5-2/scene6.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        다양한 커널의 효과
      </h1>

      {/* 커널 효과 그리드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        {kernelEffects.map((item, idx) => {
          const delay = 60 + idx * 80;
          const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 30 });
          return (
            <div
              key={item.name}
              style={{
                backgroundColor: colors.gray[800],
                padding: 25,
                borderRadius: 16,
                border: `3px solid ${item.color}`,
                transform: `scale(${Math.max(0, scale)})`,
                display: "flex",
                alignItems: "center",
                gap: 25,
              }}
            >
              {/* 커널 시각화 */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 40px)", gap: 4 }}>
                {item.kernel.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: v < 0 ? "#ef4444" : v > 1 ? "#22c55e" : v === 1 ? "#3b82f6" : colors.gray[600],
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      color: colors.white,
                      fontWeight: "bold",
                    }}
                  >
                    {v}
                  </div>
                ))}
              </div>

              {/* 설명 */}
              <div>
                <h3 style={{ fontSize: 28, color: item.color, marginBottom: 8 }}>{item.name}</h3>
                <p style={{ fontSize: 20, color: colors.gray[300], margin: 0 }}>{item.effect}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CNN 학습 포인트 */}
      <div
        style={{
          marginTop: 50,
          backgroundColor: "#8b5cf622",
          padding: "25px 50px",
          borderRadius: 16,
          border: "3px solid #8b5cf6",
          opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" }),
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 28, color: colors.white, margin: 0 }}>
          CNN은 이런 커널들을 <span style={{ color: "#8b5cf6", fontWeight: "bold" }}>데이터로부터 자동 학습</span>합니다!
        </p>
        <p style={{ fontSize: 20, color: colors.gray[400], marginTop: 10 }}>
          수천 개의 커널이 다양한 특징을 학습
        </p>
      </div>
    </AbsoluteFill>
  );
};
