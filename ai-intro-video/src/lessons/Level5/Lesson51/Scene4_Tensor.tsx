/**
 * Scene 4: 텐서로 표현하기
 * 이미지 텐서 Shape (N, C, H, W)
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_Tensor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 텐서 시각화 애니메이션
  const tensorOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // Shape 설명
  const shapeOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  // 배치 설명
  const batchOpacity = interpolate(frame, [700, 730], [0, 1], { extrapolateRight: "clamp" });

  // PyTorch Shape
  const pytorchOpacity = interpolate(frame, [1000, 1030], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[900],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-1/scene4.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        이미지 텐서
      </h1>

      <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
        {/* 3D 텐서 시각화 */}
        <div
          style={{
            opacity: tensorOpacity,
            position: "relative",
            width: 400,
            height: 350,
          }}
        >
          {/* 3개 채널 레이어 */}
          {[0, 1, 2].map((i) => {
            const delay = 100 + i * 50;
            const layerOpacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
            const offset = i * 30;
            const channelColors = ["#ff6666", "#66ff66", "#6666ff"];
            const channelNames = ["R", "G", "B"];
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: offset,
                  top: offset,
                  width: 250,
                  height: 250,
                  backgroundColor: channelColors[i] + "33",
                  border: `3px solid ${channelColors[i]}`,
                  borderRadius: 12,
                  opacity: layerOpacity,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 48,
                  fontWeight: "bold",
                  color: channelColors[i],
                }}
              >
                {channelNames[i]}
              </div>
            );
          })}

          {/* 차원 표시 */}
          <div
            style={{
              position: "absolute",
              bottom: -10,
              left: 50,
              color: colors.white,
              fontSize: 20,
            }}
          >
            Width (W)
          </div>
          <div
            style={{
              position: "absolute",
              left: -30,
              top: 100,
              color: colors.white,
              fontSize: 20,
              transform: "rotate(-90deg)",
            }}
          >
            Height (H)
          </div>
          <div
            style={{
              position: "absolute",
              right: 30,
              top: 10,
              color: colors.white,
              fontSize: 20,
            }}
          >
            Channel (C)
          </div>
        </div>

        {/* Shape 설명 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {/* 단일 이미지 */}
          <div
            style={{
              opacity: shapeOpacity,
              backgroundColor: colors.gray[800],
              padding: 30,
              borderRadius: 16,
              border: "2px solid #ec4899",
            }}
          >
            <h3 style={{ fontSize: 28, color: "#ec4899", marginBottom: 20 }}>단일 이미지 Shape</h3>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 32,
                color: colors.white,
                marginBottom: 15,
              }}
            >
              (<span style={{ color: "#66ff66" }}>C</span>,{" "}
              <span style={{ color: "#6666ff" }}>H</span>,{" "}
              <span style={{ color: "#ff6666" }}>W</span>)
            </div>
            <div style={{ fontSize: 20, color: colors.gray[400] }}>
              예: (3, 224, 224)
            </div>
          </div>

          {/* 배치 이미지 */}
          <div
            style={{
              opacity: batchOpacity,
              backgroundColor: colors.gray[800],
              padding: 30,
              borderRadius: 16,
              border: "2px solid #22c55e",
            }}
          >
            <h3 style={{ fontSize: 28, color: "#22c55e", marginBottom: 20 }}>배치 이미지 Shape</h3>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 32,
                color: colors.white,
                marginBottom: 15,
              }}
            >
              (<span style={{ color: "#fbbf24" }}>N</span>,{" "}
              <span style={{ color: "#66ff66" }}>C</span>,{" "}
              <span style={{ color: "#6666ff" }}>H</span>,{" "}
              <span style={{ color: "#ff6666" }}>W</span>)
            </div>
            <div style={{ fontSize: 20, color: colors.gray[400] }}>
              예: (64, 3, 224, 224)
            </div>
            <div style={{ marginTop: 10, fontSize: 18, color: "#fbbf24" }}>
              N = 배치 크기 (한 번에 처리할 이미지 수)
            </div>
          </div>

          {/* PyTorch 순서 */}
          <div
            style={{
              opacity: pytorchOpacity,
              backgroundColor: "#1e1e3f",
              padding: 25,
              borderRadius: 12,
              border: "2px solid #3b82f6",
            }}
          >
            <div style={{ fontSize: 20, color: "#3b82f6", marginBottom: 10 }}>PyTorch 순서:</div>
            <div style={{ fontFamily: "monospace", fontSize: 24, color: colors.white }}>
              (Batch, Channel, Height, Width)
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
