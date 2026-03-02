/**
 * Lesson 1-6: XOR 문제와 한계
 * Scene 7: 해결책 힌트
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_SolutionHint: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 단일 직선 시도
  const singleLineOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" });
  const failOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });

  // 여러 직선 아이디어
  const multiLineOpacity = interpolate(frame, [180, 220], [0, 1], { extrapolateRight: "clamp" });
  const line1Progress = interpolate(frame, [220, 280], [0, 1], { extrapolateRight: "clamp" });
  const line2Progress = interpolate(frame, [280, 340], [0, 1], { extrapolateRight: "clamp" });

  // 다층 퍼셉트론 힌트
  const mlpOpacity = interpolate(frame, [400, 450], [0, 1], { extrapolateRight: "clamp" });
  const mlpScale = spring({ frame: frame - 400, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #065f46 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-6/scene7_solution_hint.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 48,
          color: colors.white,
          fontWeight: "bold",
          opacity: titleOpacity,
          marginBottom: 30,
        }}
      >
        해결책의 힌트
      </h2>

      <div style={{ display: "flex", gap: 80, alignItems: "flex-start" }}>
        {/* 단일 직선 (실패) */}
        <div style={{ textAlign: "center", opacity: singleLineOpacity }}>
          <h3 style={{ fontSize: 26, color: "#ef4444", marginBottom: 15 }}>직선 하나?</h3>
          <div
            style={{
              width: 220,
              height: 220,
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              position: "relative",
              border: `2px solid ${colors.gray[600]}`,
            }}
          >
            {/* 점들 */}
            <div
              style={{
                position: "absolute",
                bottom: 30,
                left: 30,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 160,
                left: 30,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 30,
                left: 160,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 160,
                left: 160,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
              }}
            />

            {/* 실패 직선 */}
            <div
              style={{
                position: "absolute",
                bottom: 95,
                left: 10,
                width: 180,
                height: 3,
                backgroundColor: "#f59e0b",
                opacity: 0.6,
              }}
            />
          </div>
          {/* X 표시 */}
          <div
            style={{
              fontSize: 36,
              color: "#ef4444",
              marginTop: 10,
              opacity: failOpacity,
            }}
          >
            ✗ 불가능
          </div>
        </div>

        {/* 여러 직선 (성공) */}
        <div style={{ textAlign: "center", opacity: multiLineOpacity }}>
          <h3 style={{ fontSize: 26, color: "#22c55e", marginBottom: 15 }}>직선 두 개!</h3>
          <div
            style={{
              width: 220,
              height: 220,
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              position: "relative",
              border: `2px solid ${colors.gray[600]}`,
            }}
          >
            {/* 점들 */}
            <div
              style={{
                position: "absolute",
                bottom: 30,
                left: 30,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 160,
                left: 30,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 30,
                left: 160,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 160,
                left: 160,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
              }}
            />

            {/* 성공 직선들 */}
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <line
                x1="10"
                y1="70"
                x2={10 + 190 * line1Progress}
                y2={70 + 100 * line1Progress}
                stroke="#22c55e"
                strokeWidth="3"
              />
              <line
                x1="10"
                y1="170"
                x2={10 + 190 * line2Progress}
                y2={170 - 100 * line2Progress}
                stroke="#22c55e"
                strokeWidth="3"
              />
            </svg>
          </div>
          {/* 체크 표시 */}
          <div
            style={{
              fontSize: 36,
              color: "#22c55e",
              marginTop: 10,
              opacity: line2Progress,
            }}
          >
            ✓ 가능!
          </div>
        </div>
      </div>

      {/* 다층 퍼셉트론 힌트 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          opacity: mlpOpacity,
          transform: `scale(${mlpScale})`,
        }}
      >
        <div
          style={{
            backgroundColor: "#22c55e30",
            border: "3px solid #22c55e",
            borderRadius: 20,
            padding: "25px 50px",
          }}
        >
          <span style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>
            퍼셉트론을 <span style={{ color: "#22c55e" }}>여러 개</span> 연결하면?
          </span>
        </div>
        <div style={{ fontSize: 28, color: "#86efac" }}>
          → 이것이 바로 "다층 퍼셉트론"의 아이디어!
        </div>
      </div>
    </AbsoluteFill>
  );
};
