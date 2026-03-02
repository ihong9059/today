/**
 * Lesson 1-1 Scene 2: 일상 속 AI
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_DailyAI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const aiExamples = [
    { icon: "📱", title: "얼굴 인식", desc: "스마트폰 잠금 해제", delay: 0 },
    { icon: "▶️", title: "추천 알고리즘", desc: "유튜브 영상 추천", delay: 60 },
    { icon: "🗺️", title: "경로 안내", desc: "네비게이션 AI", delay: 120 },
    { icon: "📧", title: "스팸 필터", desc: "이메일 자동 분류", delay: 180 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-1/scene2_daily_ai.mp3")} />

      {/* 타이틀 */}
      <div
        style={{
          fontSize: 56,
          fontWeight: "bold",
          color: colors.white,
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 50 }}>📦</span>
        <span>1. 일상 속 AI 찾기</span>
      </div>

      <p
        style={{
          fontSize: 32,
          color: colors.gray[300],
          marginBottom: 50,
        }}
      >
        오늘 하루를 돌아봅시다 - AI는 이미 우리 일상 곳곳에!
      </p>

      {/* AI 예시 그리드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 40,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {aiExamples.map((item, i) => {
          const itemProgress = interpolate(
            frame,
            [item.delay, item.delay + 30],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                backgroundColor: `${colors.primary[500]}20`,
                border: `3px solid ${colors.primary[400]}`,
                borderRadius: 24,
                padding: 40,
                display: "flex",
                alignItems: "center",
                gap: 30,
                transform: `translateX(${interpolate(itemProgress, [0, 1], [-100, 0])}px)`,
                opacity: itemProgress,
              }}
            >
              <div
                style={{
                  fontSize: 80,
                  width: 120,
                  height: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `${colors.primary[500]}40`,
                  borderRadius: 20,
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: 38, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 28, color: colors.primary[300] }}>{item.desc}</p>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  backgroundColor: "#22c55e",
                  color: colors.white,
                  padding: "10px 25px",
                  borderRadius: 20,
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                AI
              </div>
            </div>
          );
        })}
      </div>

      {/* 결론 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p
          style={{
            fontSize: 40,
            color: "#fbbf24",
            fontWeight: "bold",
          }}
        >
          AI는 이미 우리 일상 곳곳에 스며들어 있습니다!
        </p>
      </div>
    </AbsoluteFill>
  );
};
