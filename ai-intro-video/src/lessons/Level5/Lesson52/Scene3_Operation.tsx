/**
 * Scene 3: 합성곱 연산 과정
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Operation: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 커널 이동 애니메이션 (3x3 위치)
  const positions = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
    { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
    { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
  ];

  const moveSpeed = 80; // 프레임당 이동
  const currentPosIndex = Math.min(Math.floor((frame - 120) / moveSpeed), positions.length - 1);
  const currentPos = positions[Math.max(0, currentPosIndex)];

  // 단계 설명
  const steps = [
    { text: "1. 커널을 이미지 왼쪽 위에 배치", start: 60 },
    { text: "2. 겹치는 부분끼리 곱하기", start: 200 },
    { text: "3. 모든 값을 더하기 → 출력 픽셀", start: 340 },
    { text: "4. 커널을 이동하며 반복", start: 480 },
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
      <Audio src={staticFile("audio/lesson-5-2/scene3.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        합성곱 연산 과정
      </h1>

      <div style={{ display: "flex", gap: 80, alignItems: "flex-start" }}>
        {/* 이미지 + 커널 오버레이 */}
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10, textAlign: "center" }}>
            입력 이미지 (5×5)
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 50px)",
              gap: 4,
              backgroundColor: colors.gray[800],
              padding: 15,
              borderRadius: 12,
            }}
          >
            {Array(25).fill(0).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: colors.gray[700],
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  color: colors.white,
                }}
              >
                {[1, 2, 3, 0, 1, 0, 1, 2, 1, 0, 3, 0, 1, 2, 0, 1, 2, 1, 0, 3, 0, 1, 0, 2, 1][i]}
              </div>
            ))}
          </div>

          {/* 슬라이딩 커널 오버레이 */}
          {frame >= 120 && (
            <div
              style={{
                position: "absolute",
                top: 30 + currentPos.y * 54,
                left: 15 + currentPos.x * 54,
                width: 162,
                height: 162,
                border: "4px solid #f59e0b",
                borderRadius: 10,
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                transition: "all 0.3s ease",
              }}
            />
          )}
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 60, color: colors.white, marginTop: 100 }}>→</div>

        {/* 출력 특징 맵 */}
        <div>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10, textAlign: "center" }}>
            출력 특징 맵 (3×3)
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 50px)",
              gap: 4,
              backgroundColor: colors.gray[800],
              padding: 15,
              borderRadius: 12,
            }}
          >
            {Array(9).fill(0).map((_, i) => {
              const isActive = i <= currentPosIndex;
              return (
                <div
                  key={i}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: isActive ? "#22c55e" : colors.gray[700],
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    color: colors.white,
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                >
                  {isActive ? [5, 3, 7, 2, 8, 4, 6, 1, 9][i] : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 단계 설명 */}
      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 10 }}>
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              fontSize: 24,
              color: frame >= step.start ? "#22c55e" : colors.gray[500],
              opacity: interpolate(frame, [step.start, step.start + 30], [0, 1], { extrapolateRight: "clamp" }),
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {frame >= step.start && <span>✓</span>}
            {step.text}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
