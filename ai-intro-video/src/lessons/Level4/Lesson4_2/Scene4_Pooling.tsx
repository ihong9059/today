/**
 * Scene 4: 풀링 층
 * MaxPool2d 시각화
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_Pooling: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const poolOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const structureOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });

  // 풀링 애니메이션
  const poolProgress = interpolate(frame, [180, 400], [0, 3.99], { extrapolateRight: "clamp" });
  const activePool = Math.floor(poolProgress);

  // 4x4 입력
  const inputGrid = [
    [0.8, 0.2, 0.9, 0.1],
    [0.3, 0.9, 0.4, 0.7],
    [0.1, 0.5, 0.8, 0.6],
    [0.7, 0.2, 0.3, 0.9],
  ];

  // 2x2 풀링 결과
  const pooledGrid = [
    [0.9, 0.9],
    [0.7, 0.9],
  ];

  // 풀링 영역 좌표
  const poolRegions = [
    { row: 0, col: 0 },
    { row: 0, col: 2 },
    { row: 2, col: 0 },
    { row: 2, col: 2 },
  ];

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
      <Audio src={staticFile("audio/lesson-4-2/scene4.mp3")} />

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
        풀링 층 (Pooling)
      </h2>

      <div style={{ display: "flex", gap: 100, alignItems: "center", opacity: poolOpacity }}>
        {/* 입력 (4x4) */}
        <div style={{ textAlign: "center" }}>
          <div style={{ color: colors.gray[300], fontSize: 24, marginBottom: 15 }}>입력 (4×4)</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 70px)",
              gap: 3,
              position: "relative",
            }}
          >
            {inputGrid.map((row, i) =>
              row.map((val, j) => {
                // 현재 풀링 중인 영역인지 확인
                const region = poolRegions[activePool];
                const isInRegion =
                  region && i >= region.row && i < region.row + 2 && j >= region.col && j < region.col + 2;
                const isMax =
                  isInRegion &&
                  val ===
                    Math.max(
                      inputGrid[region.row][region.col],
                      inputGrid[region.row][region.col + 1],
                      inputGrid[region.row + 1][region.col],
                      inputGrid[region.row + 1][region.col + 1]
                    );

                return (
                  <div
                    key={`${i}-${j}`}
                    style={{
                      width: 70,
                      height: 70,
                      backgroundColor: isMax
                        ? "#22c55e"
                        : isInRegion
                        ? "rgba(34, 197, 94, 0.3)"
                        : `rgba(249, 115, 22, ${val})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      fontWeight: isMax ? "bold" : "normal",
                      color: colors.white,
                      border: isInRegion ? "2px solid #22c55e" : "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 4,
                    }}
                  >
                    {val.toFixed(1)}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 화살표 + MaxPool 설명 */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, color: colors.white, marginBottom: 20 }}>→</div>
          <div
            style={{
              backgroundColor: "#22c55e",
              padding: "15px 25px",
              borderRadius: 12,
              color: colors.white,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            MaxPool2d(2)
          </div>
          <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 10 }}>
            2×2 영역에서
            <br />
            최대값만 선택
          </div>
        </div>

        {/* 출력 (2x2) */}
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#3b82f6", fontSize: 24, marginBottom: 15 }}>출력 (2×2)</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 70px)",
              gap: 3,
            }}
          >
            {pooledGrid.map((row, i) =>
              row.map((val, j) => {
                const poolIndex = i * 2 + j;
                const isActive = poolIndex <= activePool;
                return (
                  <div
                    key={`${i}-${j}`}
                    style={{
                      width: 70,
                      height: 70,
                      backgroundColor: isActive ? "#3b82f6" : colors.gray[700],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      fontWeight: "bold",
                      color: colors.white,
                      border: "2px solid #3b82f6",
                      borderRadius: 4,
                    }}
                  >
                    {isActive ? val.toFixed(1) : ""}
                  </div>
                );
              })
            )}
          </div>
          <div style={{ color: "#22c55e", fontSize: 20, marginTop: 15 }}>
            크기 절반 감소!
          </div>
        </div>
      </div>

      {/* CNN 구조 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: structureOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
          backgroundColor: colors.gray[800],
          padding: "20px 40px",
          borderRadius: 16,
          border: `2px solid ${colors.level[4]}`,
        }}
      >
        <span style={{ color: colors.level[4], fontSize: 24 }}>Conv</span>
        <span style={{ color: colors.white, fontSize: 20 }}>→</span>
        <span style={{ color: "#22c55e", fontSize: 24 }}>ReLU</span>
        <span style={{ color: colors.white, fontSize: 20 }}>→</span>
        <span style={{ color: "#3b82f6", fontSize: 24 }}>Pool</span>
        <span style={{ color: colors.white, fontSize: 20 }}>→</span>
        <span style={{ color: colors.gray[400], fontSize: 20 }}>반복</span>
        <span style={{ color: colors.white, fontSize: 20 }}>→</span>
        <span style={{ color: "#a855f7", fontSize: 24 }}>FC</span>
        <span style={{ color: colors.white, fontSize: 20 }}>→</span>
        <span style={{ color: "#ef4444", fontSize: 24 }}>분류</span>
      </div>
    </AbsoluteFill>
  );
};
