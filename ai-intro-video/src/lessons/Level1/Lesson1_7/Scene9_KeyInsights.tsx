/**
 * Scene 9: 핵심 포인트 정리
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene9_KeyInsights: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const insights = [
    { num: "1", text: "다층 퍼셉트론 = 퍼셉트론을 층으로 쌓기", color: "#3b82f6" },
    { num: "2", text: "은닉층이 복잡한 패턴을 학습", color: "#a855f7" },
    { num: "3", text: "XOR 문제는 2층 네트워크로 해결", color: "#22c55e" },
    { num: "4", text: "층이 깊어질수록 복잡한 문제 해결", color: "#f59e0b" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e40af 30%, #1e3a8a 70%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-7/scene9_key_insights.mp3")} />

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
        핵심 포인트 정리
      </h2>

      {/* 포인트들 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 30, maxWidth: 900 }}>
        {insights.map((insight, i) => {
          const delay = 60 + i * 60;
          const opacity = interpolate(frame, [delay, delay + 40], [0, 1], { extrapolateRight: "clamp" });
          const translateX = interpolate(frame, [delay, delay + 40], [-50, 0], { extrapolateRight: "clamp" });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 25,
                backgroundColor: colors.gray[800] + "90",
                padding: "25px 40px",
                borderRadius: 20,
                borderLeft: `6px solid ${insight.color}`,
                opacity,
                transform: `translateX(${translateX}px)`,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: insight.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.white,
                  fontSize: 32,
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                {insight.num}
              </div>
              <div style={{ color: colors.white, fontSize: 28, fontWeight: "bold" }}>{insight.text}</div>
            </div>
          );
        })}
      </div>

      {/* 딥러닝 메시지 */}
      <div
        style={{
          marginTop: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
          opacity: interpolate(frame, [320, 360], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            backgroundColor: "#fcd34d",
            padding: "20px 60px",
            borderRadius: 20,
            color: colors.gray[900],
            fontSize: 36,
            fontWeight: "bold",
          }}
        >
          Deep Learning = 깊은 학습
        </div>
        <div style={{ color: colors.gray[300], fontSize: 24 }}>층을 깊게 쌓아 학습한다는 의미!</div>
      </div>
    </AbsoluteFill>
  );
};
