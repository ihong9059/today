/**
 * Lesson 1-1 Scene 10: 아웃트로 (구독, 좋아요, 다음 강의 안내)
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene10_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a365d 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-1/scene10_outro.mp3")} />

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: `${colors.primary[500]}20`,
          border: `3px solid ${colors.primary[400]}`,
          borderRadius: 24,
          padding: "40px 60px",
          marginBottom: 50,
          textAlign: "center",
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [0, 30], [30, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        <p style={{ fontSize: 28, color: colors.primary[400], marginBottom: 15 }}>
          다음 강의 예고
        </p>
        <h2 style={{ fontSize: 48, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>
          🧬 뉴런에서 퍼셉트론으로
        </h2>
        <p style={{ fontSize: 26, color: colors.gray[400] }}>
          인간의 뇌 구조가 어떻게 AI의 영감이 되었는지 알아봅니다
        </p>
      </div>

      {/* 구독 & 좋아요 */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginBottom: 50,
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            backgroundColor: "#ef4444",
            padding: "20px 40px",
            borderRadius: 50,
            transform: `scale(${spring({ frame: frame - 60, fps, config: { damping: 10 } })})`,
          }}
        >
          <span style={{ fontSize: 36 }}>🔔</span>
          <span style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>구독</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            backgroundColor: "#3b82f6",
            padding: "20px 40px",
            borderRadius: 50,
            transform: `scale(${spring({ frame: frame - 75, fps, config: { damping: 10 } })})`,
          }}
        >
          <span style={{ fontSize: 36 }}>👍</span>
          <span style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>좋아요</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            backgroundColor: "#22c55e",
            padding: "20px 40px",
            borderRadius: 50,
            transform: `scale(${spring({ frame: frame - 90, fps, config: { damping: 10 } })})`,
          }}
        >
          <span style={{ fontSize: 36 }}>🔗</span>
          <span style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>공유</span>
        </div>
      </div>

      {/* 웹사이트 안내 */}
      <div
        style={{
          backgroundColor: `${colors.gray[800]}80`,
          border: `2px solid ${colors.gray[600]}`,
          borderRadius: 20,
          padding: "30px 60px",
          textAlign: "center",
          opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p style={{ fontSize: 26, color: colors.gray[400], marginBottom: 10 }}>
          📖 더 자세한 학습 자료는 아래 웹사이트에서 확인하세요!
        </p>
        <p style={{ fontSize: 32, color: colors.primary[300], fontWeight: "bold" }}>
          영상 설명란의 링크를 확인해주세요
        </p>
      </div>

      {/* 감사 인사 */}
      <div
        style={{
          marginTop: 50,
          opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p style={{ fontSize: 40, color: colors.white, fontWeight: "bold" }}>
          시청해 주셔서 감사합니다! 🙏
        </p>
        <p style={{ fontSize: 28, color: colors.gray[400], marginTop: 15 }}>
          다음 강의에서 만나요! 👋
        </p>
      </div>

      {/* 시리즈 정보 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          color: colors.gray[500],
          fontSize: 22,
        }}
      >
        AI 기초 교육 시리즈 - Level 1: AI 기초 이론 | Lesson 1-1
      </div>
    </AbsoluteFill>
  );
};
