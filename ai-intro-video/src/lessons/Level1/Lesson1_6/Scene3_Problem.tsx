/**
 * Lesson 1-6: XOR 문제와 한계
 * Scene 3: 문제 발생
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 퍼셉트론 시도 애니메이션
  const tryScale = spring({ frame: frame - 60, fps, config: { damping: 12 } });

  // X 표시 애니메이션
  const xOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const xScale = spring({ frame: frame - 150, fps, config: { damping: 8, stiffness: 200 } });

  // 질문 애니메이션
  const questionOpacity = interpolate(frame, [220, 260], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #7f1d1d 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-6/scene3_problem.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          position: "absolute",
          top: 60,
          fontSize: 52,
          color: colors.white,
          fontWeight: "bold",
          opacity: titleOpacity,
        }}
      >
        문제 발생!
      </h2>

      {/* 퍼셉트론 시도 시각화 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          marginTop: 40,
          transform: `scale(${tryScale})`,
        }}
      >
        {/* 퍼셉트론 */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(99, 102, 241, 0.4)",
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>퍼셉트론</span>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 48, color: colors.gray[400] }}>→</div>

        {/* XOR */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            backgroundColor: "#f59e0b30",
            border: "4px solid #f59e0b",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <span style={{ fontSize: 48, color: "#f59e0b", fontWeight: "bold" }}>XOR</span>

          {/* X 표시 */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: xOpacity,
              transform: `scale(${xScale})`,
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: 8,
                  backgroundColor: "#ef4444",
                  top: "50%",
                  left: 0,
                  transform: "rotate(45deg)",
                  transformOrigin: "center",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: 8,
                  backgroundColor: "#ef4444",
                  top: "50%",
                  left: 0,
                  transform: "rotate(-45deg)",
                  transformOrigin: "center",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 불가능 메시지 */}
      <div
        style={{
          marginTop: 50,
          backgroundColor: "#ef4444",
          borderRadius: 15,
          padding: "20px 50px",
          opacity: xOpacity,
          transform: `scale(${xScale * 0.9 + 0.1})`,
        }}
      >
        <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
          구현 불가능!
        </span>
      </div>

      {/* 질문 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          backgroundColor: colors.gray[800] + "dd",
          borderRadius: 15,
          padding: "20px 40px",
          opacity: questionOpacity,
        }}
      >
        <span style={{ fontSize: 28, color: colors.primary[300] }}>
          AND, OR, NOT은 가능했는데... 왜 XOR만 안 될까?
        </span>
      </div>
    </AbsoluteFill>
  );
};
