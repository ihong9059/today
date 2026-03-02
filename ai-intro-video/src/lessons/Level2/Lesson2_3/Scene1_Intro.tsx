/**
 * Scene 1: 인트로 - 편미분 소개
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });

  const topics = [
    { icon: "📐", title: "편미분이란?", delay: 180 },
    { icon: "🧮", title: "편미분 계산", delay: 240 },
    { icon: "🧭", title: "그래디언트", delay: 300 },
    { icon: "🤖", title: "신경망 적용", delay: 360 },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-3/scene1.mp3")} />

      {/* Level 배지 */}
      <div style={{
        position: "absolute",
        top: 30,
        left: 30,
        backgroundColor: "#a855f7",
        color: colors.white,
        padding: "10px 25px",
        borderRadius: 25,
        fontSize: 24,
        fontWeight: "bold",
      }}>
        Level 2 · 수학 기초
      </div>

      {/* 레슨 번호 */}
      <div style={{
        position: "absolute",
        top: 30,
        right: 30,
        backgroundColor: "rgba(255,255,255,0.2)",
        color: colors.white,
        padding: "10px 25px",
        borderRadius: 25,
        fontSize: 24,
      }}>
        Lesson 2-3
      </div>

      {/* 메인 타이틀 */}
      <div style={{
        position: "absolute",
        top: 150,
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        opacity: titleOpacity,
      }}>
        <h1 style={{
          fontSize: 85,
          color: colors.white,
          fontWeight: "bold",
          margin: 0,
          textShadow: "0 4px 30px rgba(168, 85, 247, 0.8)",
        }}>
          편미분
        </h1>
        <div style={{
          fontSize: 36,
          color: "#c4b5fd",
          marginTop: 20,
          opacity: subtitleOpacity,
        }}>
          Partial Derivatives
        </div>
      </div>

      {/* 서브타이틀 */}
      <div style={{
        position: "absolute",
        top: 330,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: subtitleOpacity,
      }}>
        <div style={{
          fontSize: 32,
          color: "#fbbf24",
          textAlign: "center",
        }}>
          여러 변수가 있을 때, 하나씩 미분하기
        </div>
      </div>

      {/* 오늘 배울 내용 */}
      <div style={{
        position: "absolute",
        bottom: 120,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 30,
      }}>
        {topics.map((topic, i) => {
          const appear = spring({ frame: frame - topic.delay, fps, config: { damping: 12 } });
          return (
            <div
              key={i}
              style={{
                opacity: appear,
                transform: `translateY(${(1 - appear) * 30}px)`,
                backgroundColor: "rgba(168, 85, 247, 0.3)",
                border: "2px solid #a855f7",
                borderRadius: 15,
                padding: "20px 30px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>{topic.icon}</div>
              <div style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>
                {topic.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* 배경 수식 */}
      <div style={{
        position: "absolute",
        bottom: 30,
        right: 50,
        fontSize: 28,
        color: "rgba(168, 85, 247, 0.3)",
        fontFamily: "monospace",
      }}>
        ∂f/∂x, ∂f/∂y
      </div>
    </AbsoluteFill>
  );
};
