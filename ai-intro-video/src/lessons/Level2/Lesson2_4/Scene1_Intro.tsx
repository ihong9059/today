/**
 * Scene 1: 인트로 - 연쇄법칙 소개
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12 } });
  const subtitleOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" });
  const topicsAppear = spring({ frame: frame - 90, fps, config: { damping: 12 } });

  const topics = [
    { icon: "🔗", text: "합성함수 이해하기" },
    { icon: "⛓️", text: "연쇄법칙 공식" },
    { icon: "🔄", text: "역전파와의 연결" },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-4/scene1.mp3")} />

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

      {/* Lesson 번호 */}
      <div style={{
        position: "absolute",
        top: 30,
        right: 30,
        backgroundColor: "rgba(255,255,255,0.2)",
        color: colors.white,
        padding: "10px 25px",
        borderRadius: 25,
        fontSize: 24,
        fontWeight: "bold",
      }}>
        Lesson 2-4
      </div>

      {/* 메인 타이틀 */}
      <div style={{
        position: "absolute",
        top: "25%",
        left: "50%",
        transform: `translateX(-50%) scale(${titleScale})`,
        textAlign: "center",
        opacity: titleOpacity,
      }}>
        <h1 style={{
          fontSize: 90,
          color: colors.white,
          fontWeight: "bold",
          margin: 0,
          textShadow: "0 4px 30px rgba(168, 85, 247, 0.8)",
        }}>
          ⛓️ 연쇄법칙
        </h1>
        <div style={{
          fontSize: 40,
          color: "#fbbf24",
          marginTop: 15,
          opacity: subtitleOpacity,
        }}>
          Chain Rule
        </div>
      </div>

      {/* 핵심 키워드 */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: subtitleOpacity,
        display: "flex",
        gap: 30,
      }}>
        {["역전파", "오차 전파", "딥러닝 학습"].map((keyword, i) => (
          <div key={i} style={{
            backgroundColor: "rgba(251, 191, 36, 0.2)",
            border: "2px solid #fbbf24",
            borderRadius: 30,
            padding: "10px 25px",
            color: colors.white,
            fontSize: 22,
            fontWeight: "bold",
          }}>
            {keyword}
          </div>
        ))}
      </div>

      {/* 학습 목표 */}
      <div style={{
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: topicsAppear,
        display: "flex",
        gap: 30,
      }}>
        {topics.map((topic, i) => (
          <div key={i} style={{
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            border: "2px solid #3b82f6",
            borderRadius: 15,
            padding: "20px 30px",
            color: colors.white,
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            gap: 15,
            transform: `translateY(${(1 - topicsAppear) * 30}px)`,
          }}>
            <span style={{ fontSize: 35 }}>{topic.icon}</span>
            {topic.text}
          </div>
        ))}
      </div>

      {/* 배경 수식 */}
      <div style={{
        position: "absolute",
        bottom: 30,
        right: 50,
        fontSize: 28,
        color: "rgba(168, 85, 247, 0.25)",
        fontFamily: "monospace",
      }}>
        df/dx = df/du × du/dx
      </div>
    </AbsoluteFill>
  );
};
