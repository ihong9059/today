/**
 * Lesson 1-5: AND, OR, NOT 게이트
 * Scene 3: AND 게이트 설명
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_AndGate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 진리표 행 애니메이션
  const row1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const row2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const row3Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const row4Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });

  // 일상 예시 애니메이션
  const exampleOpacity = interpolate(frame, [300, 340], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-5/scene3_and_gate.mp3")} />

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
            backgroundColor: "#3b82f6",
            borderRadius: "0 40px 40px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>AND</span>
        </div>
        <h2 style={{ fontSize: 56, color: colors.white, fontWeight: "bold" }}>
          AND 게이트
        </h2>
      </div>

      {/* 의미 설명 */}
      <p
        style={{
          fontSize: 32,
          color: colors.primary[300],
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        "그리고" - 둘 다 참일 때만 참!
      </p>

      {/* 진리표 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          borderRadius: 20,
          padding: 30,
          marginBottom: 40,
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
          <div style={{ width: 120, textAlign: "center", fontSize: 28, fontWeight: "bold", color: "#3b82f6" }}>
            입력 A
          </div>
          <div style={{ width: 120, textAlign: "center", fontSize: 28, fontWeight: "bold", color: "#3b82f6" }}>
            입력 B
          </div>
          <div style={{ width: 150, textAlign: "center", fontSize: 28, fontWeight: "bold", color: "#f59e0b" }}>
            출력
          </div>
        </div>

        {/* Row 1: 0, 0 -> 0 */}
        <div style={{ display: "flex", marginBottom: 12, opacity: row1Opacity }}>
          <div style={{ width: 120, textAlign: "center", fontSize: 32, color: colors.gray[400] }}>0</div>
          <div style={{ width: 120, textAlign: "center", fontSize: 32, color: colors.gray[400] }}>0</div>
          <div style={{ width: 150, textAlign: "center", fontSize: 32, color: "#ef4444", fontWeight: "bold" }}>0</div>
        </div>

        {/* Row 2: 0, 1 -> 0 */}
        <div style={{ display: "flex", marginBottom: 12, opacity: row2Opacity }}>
          <div style={{ width: 120, textAlign: "center", fontSize: 32, color: colors.gray[400] }}>0</div>
          <div style={{ width: 120, textAlign: "center", fontSize: 32, color: "#22c55e" }}>1</div>
          <div style={{ width: 150, textAlign: "center", fontSize: 32, color: "#ef4444", fontWeight: "bold" }}>0</div>
        </div>

        {/* Row 3: 1, 0 -> 0 */}
        <div style={{ display: "flex", marginBottom: 12, opacity: row3Opacity }}>
          <div style={{ width: 120, textAlign: "center", fontSize: 32, color: "#22c55e" }}>1</div>
          <div style={{ width: 120, textAlign: "center", fontSize: 32, color: colors.gray[400] }}>0</div>
          <div style={{ width: 150, textAlign: "center", fontSize: 32, color: "#ef4444", fontWeight: "bold" }}>0</div>
        </div>

        {/* Row 4: 1, 1 -> 1 (하이라이트) */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#22c55e20",
            borderRadius: 10,
            padding: "8px 0",
            opacity: row4Opacity,
          }}
        >
          <div style={{ width: 120, textAlign: "center", fontSize: 32, color: "#22c55e", fontWeight: "bold" }}>1</div>
          <div style={{ width: 120, textAlign: "center", fontSize: 32, color: "#22c55e", fontWeight: "bold" }}>1</div>
          <div style={{ width: 150, textAlign: "center", fontSize: 32, color: "#22c55e", fontWeight: "bold" }}>1</div>
        </div>
      </div>

      {/* 일상 예시 */}
      <div
        style={{
          backgroundColor: "#3b82f620",
          border: "2px solid #3b82f6",
          borderRadius: 15,
          padding: "25px 50px",
          opacity: exampleOpacity,
        }}
      >
        <span style={{ fontSize: 28, color: colors.white }}>
          예: 비가 오고 <span style={{ color: "#3b82f6", fontWeight: "bold" }}>AND</span> 우산이 없으면 = 젖는다
        </span>
      </div>
    </AbsoluteFill>
  );
};
