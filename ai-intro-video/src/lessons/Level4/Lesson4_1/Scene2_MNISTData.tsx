/**
 * Scene 2: MNIST 데이터셋 소개
 * 28x28 픽셀 흑백 이미지 설명
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_MNISTData: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 28x28 그리드 애니메이션
  const gridOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 픽셀 값 설명 애니메이션
  const pixelInfoOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  // 정규화 설명 (0~1 변환)
  const normalizeOpacity = interpolate(frame, [360, 390], [0, 1], { extrapolateRight: "clamp" });

  // Flatten 설명
  const flattenOpacity = interpolate(frame, [540, 570], [0, 1], { extrapolateRight: "clamp" });

  // 28x28 = 784 계산 애니메이션
  const calcOpacity = interpolate(frame, [630, 660], [0, 1], { extrapolateRight: "clamp" });

  // 샘플 숫자 "3"의 28x28 픽셀 그리드 (간략화된 버전)
  const pixelData = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0],
    [0,0,1,1,0,0,0,0,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-1/scene2.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        MNIST 데이터 구조
      </h2>

      <div style={{ display: "flex", gap: 80, alignItems: "flex-start" }}>
        {/* 28x28 픽셀 그리드 시각화 */}
        <div
          style={{
            opacity: gridOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(14, 20px)",
              gap: 2,
              padding: 20,
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              border: `2px solid ${colors.level[4]}`,
            }}
          >
            {pixelData.flat().map((pixel, i) => {
              const delay = 90 + Math.floor(i / 14) * 3;
              const cellOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <div
                  key={i}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: pixel ? colors.white : colors.gray[700],
                    borderRadius: 2,
                    opacity: cellOpacity,
                  }}
                />
              );
            })}
          </div>
          <span style={{ color: colors.gray[300], fontSize: 24, marginTop: 15 }}>
            28 × 28 픽셀
          </span>
        </div>

        {/* 설명 패널 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {/* 픽셀 값 */}
          <div
            style={{
              opacity: pixelInfoOpacity,
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 12,
              borderLeft: `4px solid ${colors.level[4]}`,
            }}
          >
            <h3 style={{ color: "#fb923c", fontSize: 28, marginBottom: 10 }}>픽셀 값</h3>
            <p style={{ color: colors.gray[300], fontSize: 24 }}>
              0 (검정) ~ 255 (흰색)
            </p>
          </div>

          {/* 정규화 */}
          <div
            style={{
              opacity: normalizeOpacity,
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 12,
              borderLeft: `4px solid #22c55e`,
            }}
          >
            <h3 style={{ color: "#22c55e", fontSize: 28, marginBottom: 10 }}>정규화</h3>
            <p style={{ color: colors.gray[300], fontSize: 24 }}>
              0~255 → 0.0~1.0 변환
            </p>
          </div>

          {/* Flatten */}
          <div
            style={{
              opacity: flattenOpacity,
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 12,
              borderLeft: `4px solid #3b82f6`,
            }}
          >
            <h3 style={{ color: "#3b82f6", fontSize: 28, marginBottom: 10 }}>Flatten</h3>
            <p style={{ color: colors.gray[300], fontSize: 24 }}>
              2D → 1D 벡터 변환
            </p>
          </div>
        </div>
      </div>

      {/* 계산식 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: calcOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
          backgroundColor: colors.gray[800],
          padding: "20px 40px",
          borderRadius: 12,
        }}
      >
        <span style={{ fontSize: 36, color: colors.white, fontFamily: "monospace" }}>
          28 × 28 =
        </span>
        <span style={{ fontSize: 48, color: "#fb923c", fontWeight: "bold", fontFamily: "monospace" }}>
          784
        </span>
        <span style={{ fontSize: 28, color: colors.gray[400] }}>
          입력 뉴런
        </span>
      </div>
    </AbsoluteFill>
  );
};
