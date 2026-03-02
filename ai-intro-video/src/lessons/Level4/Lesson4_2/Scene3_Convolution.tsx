/**
 * Scene 3: 합성곱 연산
 * 필터 슬라이딩 시각화
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Convolution: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 합성곱 시각화
  const convOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 필터 슬라이딩 위치 (3x3 필터가 5x5 이미지 위를 이동)
  const filterPosition = interpolate(frame, [180, 600], [0, 8], { extrapolateRight: "clamp" });
  const filterRow = Math.floor(filterPosition / 3);
  const filterCol = Math.floor(filterPosition) % 3;

  // Conv2d 코드
  const codeOpacity = interpolate(frame, [700, 730], [0, 1], { extrapolateRight: "clamp" });

  // 5x5 입력 이미지 시뮬레이션
  const inputGrid = [
    [0.1, 0.2, 0.8, 0.9, 0.1],
    [0.2, 0.9, 1.0, 0.8, 0.2],
    [0.8, 1.0, 1.0, 1.0, 0.7],
    [0.9, 0.8, 1.0, 0.9, 0.2],
    [0.1, 0.2, 0.7, 0.2, 0.1],
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
      <Audio src={staticFile("audio/lesson-4-2/scene3.mp3")} />

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
        합성곱 연산 (Convolution)
      </h2>

      <div style={{ display: "flex", gap: 80, alignItems: "center", opacity: convOpacity }}>
        {/* 입력 이미지 */}
        <div style={{ textAlign: "center" }}>
          <div style={{ color: colors.gray[300], fontSize: 24, marginBottom: 15 }}>입력 이미지</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 60px)",
              gap: 3,
              position: "relative",
            }}
          >
            {inputGrid.map((row, i) =>
              row.map((val, j) => (
                <div
                  key={`${i}-${j}`}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: `rgba(249, 115, 22, ${val})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    color: val > 0.5 ? colors.white : colors.gray[300],
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  {val.toFixed(1)}
                </div>
              ))
            )}
            {/* 슬라이딩 필터 하이라이트 */}
            <div
              style={{
                position: "absolute",
                top: filterRow * 63,
                left: filterCol * 63,
                width: 186,
                height: 186,
                border: "4px solid #22c55e",
                borderRadius: 8,
                pointerEvents: "none",
                transition: "top 0.3s, left 0.3s",
              }}
            />
          </div>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 48, color: colors.white }}>→</div>

        {/* 필터 (3x3) */}
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#22c55e", fontSize: 24, marginBottom: 15 }}>3×3 필터</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 60px)",
              gap: 3,
              border: "3px solid #22c55e",
              borderRadius: 8,
              padding: 5,
            }}
          >
            {[
              [1, 0, -1],
              [1, 0, -1],
              [1, 0, -1],
            ].map((row, i) =>
              row.map((val, j) => (
                <div
                  key={`${i}-${j}`}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: val > 0 ? "#22c55e" : val < 0 ? "#ef4444" : colors.gray[600],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                  {val}
                </div>
              ))
            )}
          </div>
          <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 10 }}>
            엣지 검출 필터
          </div>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 48, color: colors.white }}>→</div>

        {/* 출력 (3x3) */}
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#3b82f6", fontSize: 24, marginBottom: 15 }}>특징 맵</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 60px)",
              gap: 3,
              border: "3px solid #3b82f6",
              borderRadius: 8,
              padding: 5,
            }}
          >
            {[
              [0.2, 0.8, 0.3],
              [0.1, 0.9, 0.2],
              [0.3, 0.7, 0.1],
            ].map((row, i) =>
              row.map((val, j) => {
                const isActive = i <= filterRow && j <= filterCol;
                return (
                  <div
                    key={`${i}-${j}`}
                    style={{
                      width: 60,
                      height: 60,
                      backgroundColor: isActive ? `rgba(59, 130, 246, ${val})` : colors.gray[700],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      color: colors.white,
                    }}
                  >
                    {isActive ? val.toFixed(1) : ""}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Conv2d 코드 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: codeOpacity,
          backgroundColor: "#1e1e3f",
          padding: 25,
          borderRadius: 12,
          fontFamily: "monospace",
          fontSize: 24,
          border: `2px solid ${colors.level[4]}`,
        }}
      >
        <span style={{ color: "#ff79c6" }}>nn.Conv2d</span>
        <span style={{ color: colors.white }}>(</span>
        <span style={{ color: "#f1fa8c" }}>in_channels=3</span>
        <span style={{ color: colors.white }}>, </span>
        <span style={{ color: "#f1fa8c" }}>out_channels=16</span>
        <span style={{ color: colors.white }}>, </span>
        <span style={{ color: "#f1fa8c" }}>kernel_size=3</span>
        <span style={{ color: colors.white }}>)</span>
      </div>
    </AbsoluteFill>
  );
};
