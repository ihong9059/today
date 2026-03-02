/**
 * Scene 3: 다층 퍼셉트론 아이디어
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Idea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-7/scene3_idea.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 60,
          opacity: titleOpacity,
        }}
      >
        핵심 아이디어
      </h2>

      {/* 비교 */}
      <div
        style={{
          display: "flex",
          gap: 80,
          alignItems: "center",
        }}
      >
        {/* 단일 퍼셉트론 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ color: "#ef4444", fontSize: 28, fontWeight: "bold" }}>단일 퍼셉트론</div>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.white,
              fontSize: 48,
              fontWeight: "bold",
              boxShadow: "0 8px 30px rgba(239,68,68,0.4)",
            }}
          >
            1
          </div>
          <div style={{ color: colors.gray[400], fontSize: 24 }}>한계 있음</div>
        </div>

        {/* 화살표 */}
        <div
          style={{
            fontSize: 72,
            color: "#f59e0b",
            opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          →
        </div>

        {/* 다층 퍼셉트론 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold" }}>다층 퍼셉트론</div>
          <div style={{ display: "flex", gap: 15 }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.white,
                  fontSize: 32,
                  fontWeight: "bold",
                  boxShadow: "0 8px 30px rgba(34,197,94,0.4)",
                  transform: `translateY(${Math.sin((frame + i * 30) * 0.1) * 5}px)`,
                }}
              >
                {i}
              </div>
            ))}
          </div>
          <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold" }}>연결!</div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          marginTop: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          opacity: interpolate(frame, [180, 220], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            backgroundColor: "#3b82f6",
            padding: "20px 50px",
            borderRadius: 15,
            color: colors.white,
            fontSize: 36,
            fontWeight: "bold",
          }}
        >
          하나로 안 되면, 여러 개를 연결!
        </div>

        <div
          style={{
            color: "#a855f7",
            fontSize: 32,
            fontWeight: "bold",
            opacity: interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          퍼셉트론을 "층"으로 쌓기
        </div>
      </div>
    </AbsoluteFill>
  );
};
