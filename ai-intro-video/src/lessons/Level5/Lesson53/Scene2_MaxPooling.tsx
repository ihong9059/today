/**
 * Scene 2: Max Pooling
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_MaxPooling: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 2x2 풀링 예시 데이터
  const inputData = [
    [1, 3, 2, 1],
    [4, 2, 6, 4],
    [3, 1, 2, 3],
    [5, 2, 4, 1]
  ];

  const outputData = [
    [4, 6],
    [5, 4]
  ];

  // 애니메이션 진행
  const highlightPositions = [
    { row: 0, col: 0 }, // top-left
    { row: 0, col: 2 }, // top-right
    { row: 2, col: 0 }, // bottom-left
    { row: 2, col: 2 }, // bottom-right
  ];
  const rawHighlightIndex = Math.floor(interpolate(frame, [90, 450], [0, 4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const highlightIndex = Math.max(0, Math.min(rawHighlightIndex, 3));
  const isAnimationComplete = rawHighlightIndex >= 4;
  const currentPos = highlightPositions[highlightIndex];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d4ed8 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-3/scene2.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 20,
          opacity: titleOpacity,
        }}
      >
        🔵 Max Pooling
      </h1>

      <p
        style={{
          fontSize: 28,
          color: "#93c5fd",
          marginBottom: 40,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        영역 내 최대값 선택 → 가장 강한 특징 보존
      </p>

      {/* 풀링 시각화 */}
      <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
        {/* 입력 (4x4) */}
        <div>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10, textAlign: "center" }}>입력 (4×4)</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 60px)",
              gap: 4,
              backgroundColor: colors.gray[800],
              padding: 15,
              borderRadius: 12,
              border: "3px solid #3b82f6",
            }}
          >
            {inputData.flat().map((v, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const isHighlighted = !isAnimationComplete && currentPos &&
                row >= currentPos.row && row < currentPos.row + 2 &&
                col >= currentPos.col && col < currentPos.col + 2;
              const isMax = isHighlighted && currentPos && v === outputData[Math.floor(currentPos.row / 2)][Math.floor(currentPos.col / 2)];

              return (
                <div
                  key={i}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: isMax ? "#22c55e" : isHighlighted ? "#3b82f6" : colors.gray[700],
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: colors.white,
                    fontWeight: "bold",
                    transition: "background-color 0.3s",
                  }}
                >
                  {v}
                </div>
              );
            })}
          </div>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 50, color: colors.white }}>→</div>

        {/* 출력 (2x2) */}
        <div>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10, textAlign: "center" }}>출력 (2×2)</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 70px)",
              gap: 4,
              backgroundColor: colors.gray[800],
              padding: 15,
              borderRadius: 12,
              border: "3px solid #22c55e",
            }}
          >
            {outputData.flat().map((v, i) => {
              const isRevealed = i < rawHighlightIndex;
              return (
                <div
                  key={i}
                  style={{
                    width: 70,
                    height: 70,
                    backgroundColor: isRevealed ? "#22c55e" : colors.gray[600],
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    color: colors.white,
                    fontWeight: "bold",
                    opacity: isRevealed ? 1 : 0.3,
                  }}
                >
                  {isRevealed ? v : "?"}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 설명 */}
      <div
        style={{
          marginTop: 50,
          display: "flex",
          gap: 40,
          opacity: interpolate(frame, [480, 510], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {["노이즈에 강함", "강한 특징 보존", "CNN에서 가장 많이 사용"].map((text, i) => (
          <div
            key={i}
            style={{
              backgroundColor: colors.gray[800],
              padding: "15px 25px",
              borderRadius: 10,
              fontSize: 20,
              color: colors.white,
              border: "2px solid #3b82f6",
            }}
          >
            ✓ {text}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
