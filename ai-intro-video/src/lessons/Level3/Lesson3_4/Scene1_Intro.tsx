/**
 * Scene 1: 인트로
 * 순전파 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 30], [30, 0], { extrapolateRight: "clamp" });

  // 화살표 애니메이션
  const arrowProgress = interpolate(frame, [60, 180], [0, 1], { extrapolateRight: "clamp" });

  // 노드들
  const node1Scale = spring({ frame: frame - 90, fps, config: { damping: 12 } });
  const node2Scale = spring({ frame: frame - 120, fps, config: { damping: 12 } });
  const node3Scale = spring({ frame: frame - 150, fps, config: { damping: 12 } });

  // 마지막 메시지
  const messageOpacity = interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-4/scene1.mp3")} />

      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: colors.level[3],
          color: colors.white,
          padding: "8px 20px",
          borderRadius: 20,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Level 3 - Lesson 4
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 40,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        순전파
      </h1>

      {/* 영문 부제 */}
      <h2
        style={{
          fontSize: 36,
          color: "#60a5fa",
          textAlign: "center",
          marginTop: 10,
          opacity: titleOpacity,
        }}
      >
        Forward Propagation
      </h2>

      {/* 순전파 시각화 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          marginTop: 60,
        }}
      >
        {/* 입력 */}
        <div
          style={{
            backgroundColor: "#22c55e",
            width: 80,
            height: 80,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${node1Scale})`,
          }}
        >
          <span style={{ color: colors.white, fontSize: 28, fontWeight: "bold" }}>x</span>
        </div>

        {/* 화살표 1 */}
        <svg width="120" height="40">
          <line
            x1="0" y1="20" x2={120 * arrowProgress} y2="20"
            stroke="#60a5fa"
            strokeWidth={4}
            strokeDasharray="8 4"
          />
          <polygon
            points={`${110 * arrowProgress},10 ${120 * arrowProgress},20 ${110 * arrowProgress},30`}
            fill="#60a5fa"
            opacity={arrowProgress}
          />
        </svg>

        {/* 은닉층 */}
        <div
          style={{
            backgroundColor: "#fbbf24",
            width: 100,
            height: 100,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${node2Scale})`,
          }}
        >
          <span style={{ color: colors.gray[900], fontSize: 26, fontWeight: "bold" }}>h</span>
        </div>

        {/* 화살표 2 */}
        <svg width="120" height="40">
          <line
            x1="0" y1="20" x2={120 * arrowProgress} y2="20"
            stroke="#60a5fa"
            strokeWidth={4}
            strokeDasharray="8 4"
          />
          <polygon
            points={`${110 * arrowProgress},10 ${120 * arrowProgress},20 ${110 * arrowProgress},30`}
            fill="#60a5fa"
            opacity={arrowProgress}
          />
        </svg>

        {/* 출력 */}
        <div
          style={{
            backgroundColor: "#a855f7",
            width: 80,
            height: 80,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${node3Scale})`,
          }}
        >
          <span style={{ color: colors.white, fontSize: 28, fontWeight: "bold" }}>ŷ</span>
        </div>
      </div>

      {/* 설명 */}
      <div
        style={{
          textAlign: "center",
          marginTop: 50,
          opacity: messageOpacity,
        }}
      >
        <div style={{ fontSize: 32, color: colors.white, marginBottom: 15 }}>
          입력 → 연산 → 출력
        </div>
        <div style={{ fontSize: 28, color: "#fbbf24", fontWeight: "bold" }}>
          "앞으로 전달한다" 🚀
        </div>
      </div>
    </AbsoluteFill>
  );
};
