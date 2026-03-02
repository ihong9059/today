/**
 * Scene 2: 함수란 무엇인가
 * 입력과 출력의 관계
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_WhatIsFunction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 머신 애니메이션
  const machineScale = spring({ frame: frame - 30, fps, from: 0, to: 1, durationInFrames: 30 });

  // 입력/출력 애니메이션
  const inputX = interpolate(frame, [90, 150], [-200, 100], { extrapolateRight: "clamp" });
  const outputX = interpolate(frame, [180, 240], [0, 200], { extrapolateRight: "clamp" });
  const outputOpacity = interpolate(frame, [180, 200], [0, 1], { extrapolateRight: "clamp" });

  // 예시 애니메이션
  const exampleOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 80,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-1/scene2.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 60,
          opacity: titleOpacity,
        }}
      >
        함수란 무엇인가?
      </h1>

      {/* 함수 머신 시각화 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          transform: `scale(${Math.max(0, machineScale)})`,
        }}
      >
        {/* 입력 */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.white,
            fontSize: 48,
            fontWeight: "bold",
            boxShadow: "0 0 30px rgba(59,130,246,0.5)",
            transform: `translateX(${inputX}px)`,
          }}
        >
          x
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 48, color: "#9ca3af", margin: "0 20px" }}>→</div>

        {/* 함수 박스 */}
        <div
          style={{
            width: 200,
            height: 150,
            backgroundColor: "#a855f7",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(168,85,247,0.5)",
          }}
        >
          <div style={{ color: colors.white, fontSize: 32, fontWeight: "bold" }}>f(x)</div>
          <div style={{ color: "#e9d5ff", fontSize: 20, marginTop: 10 }}>함수</div>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 48, color: "#9ca3af", margin: "0 20px" }}>→</div>

        {/* 출력 */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.white,
            fontSize: 48,
            fontWeight: "bold",
            boxShadow: "0 0 30px rgba(34,197,94,0.5)",
            opacity: outputOpacity,
            transform: `translateX(${outputX}px)`,
          }}
        >
          y
        </div>
      </div>

      {/* 핵심 설명 */}
      <div
        style={{
          marginTop: 80,
          padding: "30px 60px",
          backgroundColor: "rgba(168,85,247,0.2)",
          borderRadius: 20,
          border: "2px solid #a855f7",
          opacity: interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p style={{ color: colors.white, fontSize: 36, textAlign: "center", margin: 0 }}>
          <span style={{ color: "#60a5fa" }}>입력</span>을 넣으면
          <span style={{ color: "#a855f7" }}> 규칙</span>에 따라
          <span style={{ color: "#22c55e" }}> 출력</span>이 나온다
        </p>
      </div>

      {/* 예시 */}
      <div
        style={{
          marginTop: 60,
          display: "flex",
          gap: 60,
          opacity: exampleOpacity,
        }}
      >
        <div
          style={{
            padding: "20px 40px",
            backgroundColor: "rgba(59,130,246,0.2)",
            borderRadius: 15,
            border: "2px solid #3b82f6",
          }}
        >
          <div style={{ color: "#60a5fa", fontSize: 24, marginBottom: 10 }}>예: f(x) = 2x</div>
          <div style={{ color: colors.white, fontSize: 32 }}>
            f(3) = <span style={{ color: "#22c55e" }}>6</span>
          </div>
        </div>

        <div
          style={{
            padding: "20px 40px",
            backgroundColor: "rgba(168,85,247,0.2)",
            borderRadius: 15,
            border: "2px solid #a855f7",
          }}
        >
          <div style={{ color: "#c084fc", fontSize: 24, marginBottom: 10 }}>AI에서의 함수</div>
          <div style={{ color: colors.white, fontSize: 32 }}>
            입력 이미지 → 고양이/강아지
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
