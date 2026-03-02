/**
 * Lesson 1-2 Scene 10: 아웃트로
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene10_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });

  const nextLessonTopics = [
    "가중치는 어떻게 작동하는가?",
    "편향은 왜 필요한가?",
    "활성화 함수의 종류와 역할",
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a365d 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* 핵심 메시지 */}
      <div
        style={{
          backgroundColor: `${colors.primary[500]}20`,
          border: `3px solid ${colors.primary[400]}`,
          borderRadius: 20,
          padding: "30px 60px",
          marginBottom: 50,
          transform: `scale(${titleSpring})`,
        }}
      >
        <span style={{ fontSize: 36, color: colors.primary[300], fontWeight: "bold" }}>
          "뇌를 모방한 퍼셉트론, 이것이 AI의 기본 단위입니다!"
        </span>
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: `${colors.gray[800]}80`,
          borderRadius: 20,
          padding: "35px 50px",
          marginBottom: 50,
          opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <h3 style={{ fontSize: 28, color: "#22c55e", marginBottom: 25, textAlign: "center" }}>
          📖 다음 강의 예고: 퍼셉트론 구조
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {nextLessonTopics.map((topic, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                opacity: interpolate(frame, [50 + i * 15, 65 + i * 15], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <span style={{ fontSize: 24, color: "#22c55e" }}>→</span>
              <span style={{ fontSize: 22, color: colors.gray[200] }}>{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          display: "flex",
          gap: 40,
          opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            backgroundColor: "#ef4444",
            borderRadius: 15,
            padding: "20px 40px",
            display: "flex",
            alignItems: "center",
            gap: 15,
          }}
        >
          <span style={{ fontSize: 36 }}>👍</span>
          <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>좋아요</span>
        </div>
        <div
          style={{
            backgroundColor: "#ef4444",
            borderRadius: 15,
            padding: "20px 40px",
            display: "flex",
            alignItems: "center",
            gap: 15,
          }}
        >
          <span style={{ fontSize: 36 }}>🔔</span>
          <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>구독</span>
        </div>
      </div>

      {/* 웹사이트 안내 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 22, color: colors.gray[400] }}>
          📚 더 자세한 학습 자료는 영상 설명의 웹사이트에서!
        </span>
        <span style={{ fontSize: 28, color: colors.primary[300], fontWeight: "bold" }}>
          다음 강의에서 만나요! 👋
        </span>
      </div>

      {/* 시리즈 표시 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          backgroundColor: `${colors.gray[700]}80`,
          borderRadius: 10,
          padding: "10px 20px",
        }}
      >
        <span style={{ fontSize: 18, color: colors.gray[400] }}>AI 기초 교육 시리즈 | Level 1</span>
      </div>
    </AbsoluteFill>
  );
};
