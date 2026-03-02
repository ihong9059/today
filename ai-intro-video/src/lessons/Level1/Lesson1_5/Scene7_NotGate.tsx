/**
 * Lesson 1-5: AND, OR, NOT 게이트
 * Scene 7: NOT 게이트 설명
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_NotGate: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 진리표 애니메이션
  const row1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const row2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });

  // 반전 애니메이션
  const flipOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const flipRotation = interpolate(frame, [180, 250], [0, 180], { extrapolateRight: "clamp" });

  // 예시 애니메이션
  const exampleOpacity = interpolate(frame, [260, 290], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #7f1d1d 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-5/scene7_not_gate.mp3")} />

      {/* 제목 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#ef4444",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 26, fontWeight: "bold", color: colors.white }}>NOT</span>
        </div>
        <h2 style={{ fontSize: 56, color: colors.white, fontWeight: "bold" }}>
          NOT 게이트
        </h2>
      </div>

      {/* 의미 설명 */}
      <p
        style={{
          fontSize: 32,
          color: "#fca5a5",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        "부정" - 입력을 반전!
      </p>

      <div style={{ display: "flex", gap: 100, alignItems: "center" }}>
        {/* 진리표 (간단) */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 30,
          }}
        >
          {/* 헤더 */}
          <div
            style={{
              display: "flex",
              borderBottom: `2px solid ${colors.gray[600]}`,
              paddingBottom: 15,
              marginBottom: 15,
            }}
          >
            <div style={{ width: 120, textAlign: "center", fontSize: 28, fontWeight: "bold", color: "#ef4444" }}>
              입력
            </div>
            <div style={{ width: 120, textAlign: "center", fontSize: 28, fontWeight: "bold", color: "#f59e0b" }}>
              출력
            </div>
          </div>

          {/* Row 1: 0 -> 1 */}
          <div
            style={{
              display: "flex",
              marginBottom: 15,
              opacity: row1Opacity,
            }}
          >
            <div style={{ width: 120, textAlign: "center", fontSize: 36, color: colors.gray[400] }}>0</div>
            <div style={{ width: 120, textAlign: "center", fontSize: 36, color: "#22c55e", fontWeight: "bold" }}>1</div>
          </div>

          {/* Row 2: 1 -> 0 */}
          <div
            style={{
              display: "flex",
              opacity: row2Opacity,
            }}
          >
            <div style={{ width: 120, textAlign: "center", fontSize: 36, color: "#22c55e", fontWeight: "bold" }}>1</div>
            <div style={{ width: 120, textAlign: "center", fontSize: 36, color: colors.gray[400] }}>0</div>
          </div>
        </div>

        {/* 반전 시각화 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
            opacity: flipOpacity,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: "bold",
              color: colors.white,
              transform: `rotateY(${flipRotation}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {flipRotation > 90 ? "1" : "0"}
          </div>

          <div style={{ fontSize: 48, color: colors.gray[400] }}>↕</div>

          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: "bold",
              color: colors.white,
              transform: `rotateY(${flipRotation}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {flipRotation > 90 ? "0" : "1"}
          </div>
        </div>
      </div>

      {/* 일상 예시 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          backgroundColor: "#ef444430",
          border: "2px solid #ef4444",
          borderRadius: 15,
          padding: "25px 50px",
          opacity: exampleOpacity,
        }}
      >
        <span style={{ fontSize: 28, color: colors.white }}>
          예: <span style={{ color: "#ef4444", fontWeight: "bold" }}>NOT</span> 배고프다 = 배부르다
        </span>
      </div>
    </AbsoluteFill>
  );
};
