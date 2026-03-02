/**
 * Scene 2: 픽셀의 이해
 * 이미지의 가장 작은 단위
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_Pixel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 픽셀 그리드 애니메이션
  const gridOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 8x8 샘플 픽셀 그리드 (숫자 7 모양)
  const pixelValues = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 128, 255, 255, 255, 128, 0],
    [0, 0, 0, 0, 0, 200, 0, 0],
    [0, 0, 0, 0, 180, 50, 0, 0],
    [0, 0, 0, 150, 100, 0, 0, 0],
    [0, 0, 120, 200, 0, 0, 0, 0],
    [0, 0, 200, 50, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // 밝기 설명 애니메이션
  const brightnessOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  // MNIST 정보
  const mnistOpacity = interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" });

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
      <Audio src={staticFile("audio/lesson-5-1/scene2.mp3")} />

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
        픽셀 (Pixel)
      </h1>

      <h2
        style={{
          fontSize: 36,
          color: "#f9a8d4",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        Picture + Element = 그림의 가장 작은 단위
      </h2>

      <div style={{ display: "flex", gap: 80, alignItems: "center" }}>
        {/* 픽셀 그리드 */}
        <div
          style={{
            opacity: gridOpacity,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {pixelValues.map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 4 }}>
              {row.map((value, j) => {
                const delay = 90 + (i * 8 + j) * 3;
                const cellOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
                return (
                  <div
                    key={j}
                    style={{
                      width: 60,
                      height: 60,
                      backgroundColor: `rgb(${value}, ${value}, ${value})`,
                      borderRadius: 4,
                      border: "1px solid rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      color: value > 128 ? "#000" : "#fff",
                      opacity: cellOpacity,
                      fontWeight: "bold",
                    }}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* 설명 박스 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {/* 밝기 스케일 */}
          <div
            style={{
              opacity: brightnessOpacity,
              backgroundColor: colors.gray[800],
              padding: 30,
              borderRadius: 16,
              border: "2px solid #ec4899",
            }}
          >
            <h3 style={{ fontSize: 28, color: "#ec4899", marginBottom: 20 }}>밝기 값</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#000",
                    borderRadius: 8,
                    border: "2px solid #fff",
                  }}
                />
                <span style={{ color: colors.white, marginTop: 8, fontSize: 20 }}>0</span>
                <span style={{ color: colors.gray[400], fontSize: 16 }}>검정</span>
              </div>
              <div
                style={{
                  width: 200,
                  height: 30,
                  background: "linear-gradient(to right, #000, #fff)",
                  borderRadius: 4,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    border: "2px solid #666",
                  }}
                />
                <span style={{ color: colors.white, marginTop: 8, fontSize: 20 }}>255</span>
                <span style={{ color: colors.gray[400], fontSize: 16 }}>흰색</span>
              </div>
            </div>
          </div>

          {/* MNIST 정보 */}
          <div
            style={{
              opacity: mnistOpacity,
              backgroundColor: colors.gray[800],
              padding: 30,
              borderRadius: 16,
              border: "2px solid #22c55e",
            }}
          >
            <h3 style={{ fontSize: 28, color: "#22c55e", marginBottom: 15 }}>MNIST 데이터셋</h3>
            <div style={{ color: colors.white, fontSize: 24, lineHeight: 1.6 }}>
              <div>크기: <span style={{ color: "#22c55e" }}>28 × 28</span> 픽셀</div>
              <div>총 픽셀 수: <span style={{ color: "#22c55e" }}>784</span>개</div>
              <div style={{ marginTop: 10, color: colors.gray[400], fontSize: 20 }}>
                이미지 = 숫자들의 행렬!
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
