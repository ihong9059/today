/**
 * Lesson 1-6: XOR 문제와 한계
 * Scene 4: 선형 분리 가능성
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_LinearSeparation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 좌표계 애니메이션
  const plotOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" });

  // 점들 애니메이션
  const dotsOpacity = interpolate(frame, [100, 140], [0, 1], { extrapolateRight: "clamp" });

  // 분리선 애니메이션
  const lineProgress = interpolate(frame, [180, 240], [0, 1], { extrapolateRight: "clamp" });

  // 정의 카드 애니메이션
  const defOpacity = interpolate(frame, [280, 320], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-6/scene4_linear_separation.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 48,
          color: colors.white,
          fontWeight: "bold",
          opacity: titleOpacity,
          marginBottom: 20,
        }}
      >
        선형 분리 가능성
      </h2>

      <div style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
        {/* AND 게이트 좌표 */}
        <div style={{ textAlign: "center", opacity: plotOpacity }}>
          <h3 style={{ fontSize: 28, color: "#3b82f6", marginBottom: 15 }}>AND 게이트</h3>
          <div
            style={{
              width: 280,
              height: 280,
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              position: "relative",
              border: `2px solid ${colors.gray[600]}`,
            }}
          >
            {/* 축 */}
            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: 40,
                width: 200,
                height: 2,
                backgroundColor: colors.gray[500],
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: 40,
                width: 2,
                height: 200,
                backgroundColor: colors.gray[500],
              }}
            />

            {/* 점들 */}
            <div style={{ opacity: dotsOpacity }}>
              {/* (0, 0) - False */}
              <div
                style={{
                  position: "absolute",
                  bottom: 35,
                  left: 35,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#ef4444",
                  border: "2px solid white",
                }}
              />
              {/* (0, 1) - False */}
              <div
                style={{
                  position: "absolute",
                  bottom: 195,
                  left: 35,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#ef4444",
                  border: "2px solid white",
                }}
              />
              {/* (1, 0) - False */}
              <div
                style={{
                  position: "absolute",
                  bottom: 35,
                  left: 195,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#ef4444",
                  border: "2px solid white",
                }}
              />
              {/* (1, 1) - True */}
              <div
                style={{
                  position: "absolute",
                  bottom: 195,
                  left: 195,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  border: "2px solid white",
                }}
              />
            </div>

            {/* 분리선 */}
            <div
              style={{
                position: "absolute",
                bottom: 100,
                left: 100,
                width: 180 * lineProgress,
                height: 4,
                backgroundColor: "#3b82f6",
                transform: "rotate(-45deg)",
                transformOrigin: "left center",
              }}
            />
          </div>
          <p style={{ fontSize: 20, color: "#22c55e", marginTop: 10 }}>✓ 분리 가능!</p>
        </div>

        {/* OR 게이트 좌표 */}
        <div style={{ textAlign: "center", opacity: plotOpacity }}>
          <h3 style={{ fontSize: 28, color: "#22c55e", marginBottom: 15 }}>OR 게이트</h3>
          <div
            style={{
              width: 280,
              height: 280,
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              position: "relative",
              border: `2px solid ${colors.gray[600]}`,
            }}
          >
            {/* 축 */}
            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: 40,
                width: 200,
                height: 2,
                backgroundColor: colors.gray[500],
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: 40,
                width: 2,
                height: 200,
                backgroundColor: colors.gray[500],
              }}
            />

            {/* 점들 */}
            <div style={{ opacity: dotsOpacity }}>
              {/* (0, 0) - False */}
              <div
                style={{
                  position: "absolute",
                  bottom: 35,
                  left: 35,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#ef4444",
                  border: "2px solid white",
                }}
              />
              {/* (0, 1) - True */}
              <div
                style={{
                  position: "absolute",
                  bottom: 195,
                  left: 35,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  border: "2px solid white",
                }}
              />
              {/* (1, 0) - True */}
              <div
                style={{
                  position: "absolute",
                  bottom: 35,
                  left: 195,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  border: "2px solid white",
                }}
              />
              {/* (1, 1) - True */}
              <div
                style={{
                  position: "absolute",
                  bottom: 195,
                  left: 195,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  border: "2px solid white",
                }}
              />
            </div>

            {/* 분리선 */}
            <div
              style={{
                position: "absolute",
                bottom: 60,
                left: 60,
                width: 160 * lineProgress,
                height: 4,
                backgroundColor: "#22c55e",
                transform: "rotate(-45deg)",
                transformOrigin: "left center",
              }}
            />
          </div>
          <p style={{ fontSize: 20, color: "#22c55e", marginTop: 10 }}>✓ 분리 가능!</p>
        </div>
      </div>

      {/* 정의 카드 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          backgroundColor: colors.gray[800] + "ee",
          borderRadius: 15,
          padding: "20px 40px",
          border: "2px solid #3b82f6",
          opacity: defOpacity,
        }}
      >
        <span style={{ fontSize: 26, color: colors.white }}>
          <span style={{ color: "#3b82f6", fontWeight: "bold" }}>선형 분리 가능</span> = 직선 하나로 참/거짓을 완벽히 나눌 수 있음
        </span>
      </div>
    </AbsoluteFill>
  );
};
